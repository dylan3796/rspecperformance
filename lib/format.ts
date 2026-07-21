// Sacramento shop — display all timestamps in Pacific time.
const dateFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const dateTimeFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function fmtDate(d: Date | string): string {
  return dateFmt.format(new Date(d));
}

export function fmtDateTime(d: Date | string): string {
  return dateTimeFmt.format(new Date(d));
}
