# How to get this content into a Google Doc

Google Docs now supports importing Markdown directly. Here are your two best options — pick whichever is easier.

## Option A — Paste as Markdown (fastest, ~1 min)

1. Open https://docs.google.com → **Blank document**.
2. Click **Tools → Preferences** → tick **Automatically detect Markdown** → OK.
3. Open `HANDOFF_FOR_RAV.md` in GitHub or your editor.
4. Copy the entire file contents.
5. Paste into the empty Google Doc. Headings, tables, lists, and links convert automatically.
6. **File → Rename** → "RSpec Performance — Owner's Guide."
7. **Share** (top-right) → add Rav's Gmail and Edrick's Gmail as **Commenter**.

## Option B — Import the .md file (best formatting)

1. https://docs.google.com → **Blank document** (you need a doc open first).
2. **File → Open → Upload → Select a file from your device.**
3. Upload `HANDOFF_FOR_RAV.md`.
4. Google converts it to a Doc, preserving headings, tables, and links.
5. Rename and share as in Option A.

---

# Suggested structure for the Google Doc

When you create the Doc, consider organizing it as a **single shared hub** for the team:

### Title
**RSpec Performance — Team Hub & Owner's Guide**

### Section 1: Quick Links
Copy the "Quick links" table from the top of `HANDOFF_FOR_RAV.md`. This is the table Rav + Edrick will hit daily.

### Section 2: Owner's Guide
Paste the rest of `HANDOFF_FOR_RAV.md` below.

### Section 3: Deployment Playbook
Paste `DEPLOYMENT.md`. Only Dylan/Edrick need this, but it's useful to keep in the same doc.

### Section 4: Assets Checklist
Paste `ASSETS_NEEDED.md`. Rav can tick boxes here as he delivers photos and copy.

### Section 5: Open Questions / Decisions Log
Blank. Let Rav + Edrick comment and add things as they come up. Examples:
- "Do we want to add a blog?"
- "Which builds should be in the Featured Builds rotation this month?"
- "When do we add online booking?"

---

# Who to share with

| Person   | Role                            | Access level |
| -------- | ------------------------------- | ------------ |
| Rav      | Owner                           | **Editor**   |
| Edrick   | Co-developer, maintainer        | Editor       |
| Dylan    | Initial dev, architecture owner | Editor       |
| Future hires | Team members                | Commenter    |

Google Docs permission cheat sheet:
- **Editor** — can change text, add comments, share with others.
- **Commenter** — can comment + suggest but can't change the text.
- **Viewer** — read-only.

---

# Tip: keep the Doc in sync with the repo

The Markdown files in the repo (`HANDOFF_FOR_RAV.md`, `DEPLOYMENT.md`, `ASSETS_NEEDED.md`) are the **source of truth**. When something changes in code, a dev can update the `.md` and re-paste the section into the Doc. To make this easy:

- Mark each Google Doc section with the source filename at the top, e.g. *"[synced from HANDOFF_FOR_RAV.md — updated 2026-04-19]"*.
- When a dev ships a docs update, ask them to drop a Slack/text note: "Updated DEPLOYMENT.md — section 3 changed." Then paste that section in.

Alternative (more automated): use a Doc-sync tool like https://markdown-docs.com or paste from GitHub via https://github.com/<repo>/blob/main/HANDOFF_FOR_RAV.md. GitHub's rendered view is often clean enough to skip the Google Doc entirely.
