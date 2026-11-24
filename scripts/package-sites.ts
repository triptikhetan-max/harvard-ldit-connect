import { cpSync, mkdirSync, renameSync, rmSync } from "node:fs";

// Adapt the existing Nitro Cloudflare output to the Sites Worker layout.
const output = new URL("../dist/", import.meta.url);
const source = new URL("../.output/", import.meta.url);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(new URL("server/", source), new URL("server/", output), { recursive: true });
renameSync(new URL("server/index.mjs", output), new URL("server/index.js", output));
cpSync(new URL("public/", source), new URL("client/", output), { recursive: true });
mkdirSync(new URL(".openai/", output), { recursive: true });
cpSync(new URL("../.openai/hosting.json", import.meta.url), new URL(".openai/hosting.json", output));
