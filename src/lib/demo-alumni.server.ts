import { timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";
import { parsePersonalAlumni, MAX_ALUMNI_IMPORT_BYTES } from "./personal-alumni";
import { DEMO_ADMIN_HTML } from "./demo-admin.server";
import {
  DEMO_ADMIN_PATH,
  DEMO_ALUMNI_PATH,
  DEMO_IMPORT_PATH,
  DEMO_PAGE_SIZE,
  type DemoSearchResult,
} from "./demo-alumni";

const DATA_KEY = "alumni/hgse-demo.json";
const MAX_QUERY_LENGTH = 200;
const MIN_TOKEN_LENGTH = 24;
const IMPORT_FORM_OVERHEAD_BYTES = 16 * 1024;
const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Content-Type-Options": "nosniff",
  Vary: "Authorization",
};

export interface DemoAlumniEnvironment {
  DEMO_ACCESS_TOKEN?: string;
  DEMO_ADMIN_TOKEN?: string;
  BUCKET?: {
    get(key: string): Promise<{ text(): Promise<string> } | null>;
    put(key: string, value: string): Promise<unknown>;
  };
}

function matchesToken(supplied: string, expected: string | undefined): boolean {
  if (!expected || expected.length < MIN_TOKEN_LENGTH) return false;
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: PRIVATE_HEADERS });
}

async function readBoundedBody(request: Request, limit: number): Promise<ArrayBuffer> {
  const reader = request.body?.getReader();
  if (!reader) return new ArrayBuffer(0);
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > limit) {
      await reader.cancel();
      throw new Error("Import size limit exceeded");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes.buffer;
}

export async function handleDemoAlumni(
  request: Request,
  env: DemoAlumniEnvironment,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname === DEMO_ADMIN_PATH && request.method === "GET") {
    return new Response(DEMO_ADMIN_HTML, {
      headers: { ...PRIVATE_HEADERS, "Content-Type": "text/html; charset=utf-8" },
    });
  }
  if (![DEMO_ALUMNI_PATH, DEMO_IMPORT_PATH].includes(url.pathname)) return null;
  if (!env.BUCKET || !env.DEMO_ACCESS_TOKEN || !env.DEMO_ADMIN_TOKEN) {
    return json({ error: "The shared demo is not configured yet." }, 503);
  }
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) return json({ error: "Origin not allowed." }, 403);
  const bearer = request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";

  if (url.pathname === DEMO_IMPORT_PATH) {
    if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
    if (
      Number(request.headers.get("content-length")) >
      MAX_ALUMNI_IMPORT_BYTES + IMPORT_FORM_OVERHEAD_BYTES
    ) {
      return json({ error: "Import file is too large." }, 413);
    }
    let text: string;
    if (request.headers.get("content-type")?.startsWith("multipart/form-data")) {
      let body: ArrayBuffer;
      try {
        body = await readBoundedBody(request, MAX_ALUMNI_IMPORT_BYTES + IMPORT_FORM_OVERHEAD_BYTES);
      } catch {
        return json({ error: "Import file is too large." }, 413);
      }
      let form: FormData;
      try {
        form = await new Response(body, {
          headers: { "Content-Type": request.headers.get("content-type") ?? "" },
        }).formData();
      } catch {
        return json({ error: "The import form is invalid." }, 400);
      }
      if (!matchesToken(String(form.get("adminToken") ?? ""), env.DEMO_ADMIN_TOKEN)) {
        return json({ error: "Admin import code required." }, 401);
      }
      const file = form.get("snapshot");
      if (!file || typeof file === "string" || file.size > MAX_ALUMNI_IMPORT_BYTES) {
        return json({ error: "Choose a valid snapshot file." }, 400);
      }
      text = await file.text();
    } else {
      if (!matchesToken(bearer, env.DEMO_ADMIN_TOKEN)) {
        return json({ error: "Admin import code required." }, 401);
      }
      try {
        text = new TextDecoder().decode(await readBoundedBody(request, MAX_ALUMNI_IMPORT_BYTES));
      } catch {
        return json({ error: "Import file is too large." }, 413);
      }
    }
    if (new TextEncoder().encode(text).length > MAX_ALUMNI_IMPORT_BYTES) {
      return json({ error: "Import file is too large." }, 413);
    }
    let snapshot;
    try {
      snapshot = parsePersonalAlumni(text);
    } catch {
      return json({ error: "The snapshot is invalid. Existing data was not replaced." }, 400);
    }
    await env.BUCKET.put(DATA_KEY, JSON.stringify(snapshot));
    return json({ imported: snapshot.profiles.length, capturedAt: snapshot.capturedAt });
  }

  if (request.method !== "GET") return json({ error: "Method not allowed." }, 405);
  if (!matchesToken(bearer, env.DEMO_ACCESS_TOKEN)) {
    return json({ error: "Demo access code required." }, 401);
  }
  const query = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  if (query.length > MAX_QUERY_LENGTH) return json({ error: "Search is too long." }, 400);
  const object = await env.BUCKET.get(DATA_KEY);
  if (!object) return json({ error: "Demo records have not been loaded yet." }, 404);
  const snapshot = parsePersonalAlumni(await object.text());
  const matches = snapshot.profiles.filter((profile) =>
    `${profile.name} ${profile.education} ${profile.headline}`.toLowerCase().includes(query),
  );
  const requestedPage = Number(url.searchParams.get("page") ?? "1");
  const page = Number.isSafeInteger(requestedPage)
    ? Math.max(1, Math.min(requestedPage, Math.max(1, Math.ceil(matches.length / DEMO_PAGE_SIZE))))
    : 1;
  const result: DemoSearchResult = {
    total: matches.length,
    page,
    pageSize: DEMO_PAGE_SIZE,
    capturedAt: snapshot.capturedAt,
    profiles: matches.slice((page - 1) * DEMO_PAGE_SIZE, page * DEMO_PAGE_SIZE),
  };
  return json(result);
}
