import { cpSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

// Adapt the existing Nitro Cloudflare output to the Sites Worker layout.
const output = new URL("../dist/", import.meta.url);
const source = new URL("../.output/", import.meta.url);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(new URL("server/", source), new URL("server/", output), { recursive: true });
renameSync(new URL("server/index.mjs", output), new URL("server/nitro-entry.mjs", output));
execFileSync(
  "bun",
  [
    "build",
    "src/lib/demo-alumni.server.ts",
    "--target=browser",
    "--external=node:*",
    "--outfile=dist/server/demo-alumni.js",
  ],
  { stdio: "inherit" },
);
writeFileSync(
  new URL("server/index.js", output),
  `
import nitro from "./nitro-entry.mjs";
import { handleDemoAlumni } from "./demo-alumni.js";
export default {
  ...nitro,
  async fetch(request, env, context) {
    const response = await handleDemoAlumni(request, env);
    return response ?? nitro.fetch(request, env, context);
  },
};
`,
);
cpSync(new URL("public/", source), new URL("client/", output), { recursive: true });
mkdirSync(new URL(".openai/", output), { recursive: true });
cpSync(
  new URL("../.openai/hosting.json", import.meta.url),
  new URL(".openai/hosting.json", output),
);
