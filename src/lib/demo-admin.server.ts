import { DEMO_IMPORT_PATH } from "./demo-alumni";

export const DEMO_ADMIN_HTML = `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>LDIT demo data management</title>
<main style="max-width:40rem;margin:3rem auto;font:18px system-ui;padding:1rem">
<h1>Load shared demo records</h1>
<p>Owner access only. This stores the validated snapshot in private server storage.
The demo viewing code cannot replace data.</p>
<form method="post" action="${DEMO_IMPORT_PATH}" enctype="multipart/form-data">
<p><label>Admin import code <input type="password" name="adminToken" required autocomplete="off"></label></p>
<p><label>Alumni snapshot <input type="file" name="snapshot" accept=".json,application/json" required></label></p>
<button>Load shared dataset</button></form></main></html>`;
