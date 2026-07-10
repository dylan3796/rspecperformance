import { Pool } from "pg";

// Free-tier Postgres (Neon via Vercel Marketplace, or any standard Postgres).
// The schema bootstraps itself on first use — no migration tooling to run.
export const dbConfigured = !!process.env.DATABASE_URL;

let pool: Pool | null = null;
let ensured: Promise<void> | null = null;

function getPool(): Pool {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set.");
    const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
    pool = new Pool({
      connectionString: url,
      ssl: local ? undefined : true,
      max: 3, // serverless-friendly
    });
  }
  return pool;
}

const SCHEMA = `
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  phone text not null default '',
  created_at timestamptz not null default now()
);
create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  vehicle text not null,
  service text not null default '',
  service_history text not null default '',
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index if not exists requests_customer_idx on requests(customer_id);
create index if not exists requests_status_idx on requests(status);
create table if not exists updates (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references requests(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists updates_request_idx on updates(request_id);
`;

async function query<T>(text: string, params: unknown[] = []): Promise<T[]> {
  const p = getPool();
  if (!ensured) ensured = p.query(SCHEMA).then(() => undefined);
  await ensured;
  const res = await p.query(text, params);
  return res.rows as T[];
}

export const REQUEST_STATUSES = [
  "new",
  "scheduled",
  "in_progress",
  "done",
] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];
export const STATUS_LABELS: Record<RequestStatus, string> = {
  new: "New",
  scheduled: "Scheduled",
  in_progress: "In progress",
  done: "Done",
};

export type Customer = {
  id: string;
  email: string;
  name: string;
  phone: string;
  created_at: Date;
};

export type ServiceRequest = {
  id: string;
  customer_id: string;
  vehicle: string;
  service: string;
  service_history: string;
  message: string;
  status: RequestStatus;
  created_at: Date;
};

export type RequestUpdate = {
  id: string;
  request_id: string;
  body: string;
  created_at: Date;
};

export type RequestListRow = ServiceRequest & {
  name: string;
  email: string;
  phone: string;
  update_count: number;
};

export async function upsertCustomer(
  name: string,
  email: string,
  phone: string,
): Promise<Customer> {
  const rows = await query<Customer>(
    `insert into customers (email, name, phone)
     values (lower($1), $2, $3)
     on conflict (email) do update
       set name = excluded.name,
           phone = case when excluded.phone <> '' then excluded.phone else customers.phone end
     returning *`,
    [email, name, phone],
  );
  return rows[0];
}

export async function createRequest(
  customerId: string,
  data: { vehicle: string; service: string; serviceHistory: string; message: string },
): Promise<ServiceRequest> {
  const rows = await query<ServiceRequest>(
    `insert into requests (customer_id, vehicle, service, service_history, message)
     values ($1, $2, $3, $4, $5) returning *`,
    [customerId, data.vehicle, data.service, data.serviceHistory, data.message],
  );
  return rows[0];
}

export async function listRequests(): Promise<RequestListRow[]> {
  return query<RequestListRow>(
    `select r.*, c.name, c.email, c.phone,
            (select count(*)::int from updates u where u.request_id = r.id) as update_count
     from requests r
     join customers c on c.id = r.customer_id
     order by r.created_at desc`,
  );
}

export async function getRequestDetail(id: string): Promise<{
  request: ServiceRequest;
  customer: Customer;
  updates: RequestUpdate[];
  otherRequests: ServiceRequest[];
} | null> {
  const reqs = await query<ServiceRequest>(`select * from requests where id = $1`, [id]);
  const request = reqs[0];
  if (!request) return null;
  const [customer] = await query<Customer>(`select * from customers where id = $1`, [
    request.customer_id,
  ]);
  const updates = await query<RequestUpdate>(
    `select * from updates where request_id = $1 order by created_at asc`,
    [id],
  );
  const otherRequests = await query<ServiceRequest>(
    `select * from requests where customer_id = $1 and id <> $2 order by created_at desc`,
    [request.customer_id, id],
  );
  return { request, customer, updates, otherRequests };
}

export async function setRequestStatus(id: string, status: RequestStatus): Promise<void> {
  await query(`update requests set status = $2 where id = $1`, [id, status]);
}

export async function addUpdate(requestId: string, body: string): Promise<RequestUpdate> {
  const rows = await query<RequestUpdate>(
    `insert into updates (request_id, body) values ($1, $2) returning *`,
    [requestId, body],
  );
  return rows[0];
}

export async function findCustomerByEmail(email: string): Promise<Customer | null> {
  const rows = await query<Customer>(`select * from customers where email = lower($1)`, [
    email,
  ]);
  return rows[0] ?? null;
}

export async function getCustomerPortalData(customerId: string): Promise<{
  customer: Customer;
  requests: (ServiceRequest & { updates: RequestUpdate[] })[];
} | null> {
  const [customer] = await query<Customer>(`select * from customers where id = $1`, [
    customerId,
  ]);
  if (!customer) return null;
  const requests = await query<ServiceRequest>(
    `select * from requests where customer_id = $1 order by created_at desc`,
    [customerId],
  );
  const updates = requests.length
    ? await query<RequestUpdate>(
        `select * from updates where request_id = any($1::uuid[]) order by created_at asc`,
        [requests.map((r) => r.id)],
      )
    : [];
  return {
    customer,
    requests: requests.map((r) => ({
      ...r,
      updates: updates.filter((u) => u.request_id === r.id),
    })),
  };
}

export async function exportRows(): Promise<Record<string, unknown>[]> {
  return query(
    `select c.name, c.email, c.phone, c.created_at as customer_since,
            r.vehicle, r.service, r.status, r.service_history, r.message,
            r.created_at as requested_at
     from customers c
     left join requests r on r.customer_id = c.id
     order by c.created_at, r.created_at`,
  );
}
