import { describe, expect, it, vi } from "vitest";
import { handleDemoAlumni, type DemoAlumniEnvironment } from "@/lib/demo-alumni.server";

const READ_TOKEN = "read-test-token-with-at-least-24-characters";
const ADMIN_TOKEN = "admin-test-token-with-at-least-24-characters";
const ORIGIN = "https://demo.example";
const snapshot = {
  capturedAt: "2026-11-24T19:00:00.000Z",
  source: "Harvard Alumni Directory",
  query: "Test fixture",
  profiles: Array.from({ length: 30 }, (_, index) => ({
    name: `Example Person ${index}`,
    profileUrl: `https://community.alumni.harvard.edu/person/${index + 1}`,
    education: "EDM 2025",
    headline: index === 0 ? "Designer at Example" : "",
  })),
};

function environment() {
  const get = vi.fn(async () => ({ text: async () => JSON.stringify(snapshot) }));
  const put = vi.fn(async () => undefined);
  return {
    env: { DEMO_ACCESS_TOKEN: READ_TOKEN, DEMO_ADMIN_TOKEN: ADMIN_TOKEN, BUCKET: { get, put } },
    get,
    put,
  };
}

describe("Shared demo alumni server", () => {
  it("rejects anonymous and wrong-code reads before touching storage", async () => {
    const { env, get } = environment();
    for (const token of ["", "wrong"]) {
      const response = await handleDemoAlumni(
        new Request(`${ORIGIN}/api/demo-alumni`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        env,
      );
      expect(response?.status).toBe(401);
      expect(await response?.text()).not.toContain("Example Person");
    }
    expect(get).not.toHaveBeenCalled();
  });

  it("fails closed without access configuration", async () => {
    const response = await handleDemoAlumni(
      new Request(`${ORIGIN}/api/demo-alumni`),
      {} as DemoAlumniEnvironment,
    );
    expect(response?.status).toBe(503);
  });

  it("serves paginated server data only with the demo code and disables caching", async () => {
    const { env } = environment();
    const response = await handleDemoAlumni(
      new Request(`${ORIGIN}/api/demo-alumni?page=2`, {
        headers: { Authorization: `Bearer ${READ_TOKEN}` },
      }),
      env,
    );
    expect(response?.status).toBe(200);
    expect(response?.headers.get("cache-control")).toContain("no-store");
    expect(await response?.json()).toMatchObject({ total: 30, page: 2, pageSize: 25 });
  });

  it("searches across names, degrees and professional headlines", async () => {
    const { env } = environment();
    const response = await handleDemoAlumni(
      new Request(`${ORIGIN}/api/demo-alumni?q=DESIGNER`, {
        headers: { Authorization: `Bearer ${READ_TOKEN}` },
      }),
      env,
    );
    expect(await response?.json()).toMatchObject({ total: 1 });
  });

  it("does not let the read code import or replace shared data", async () => {
    const { env, put } = environment();
    const response = await handleDemoAlumni(
      new Request(`${ORIGIN}/api/demo-alumni/import`, {
        method: "POST",
        headers: { Authorization: `Bearer ${READ_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(snapshot),
      }),
      env,
    );
    expect(response?.status).toBe(401);
    expect(put).not.toHaveBeenCalled();
  });

  it("validates imports before writing, with a separate admin code", async () => {
    const { env, put } = environment();
    const request = (body: string) =>
      new Request(`${ORIGIN}/api/demo-alumni/import`, {
        method: "POST",
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}`, "Content-Type": "application/json" },
        body,
      });
    expect((await handleDemoAlumni(request("invalid"), env))?.status).toBe(400);
    expect(put).not.toHaveBeenCalled();
    expect((await handleDemoAlumni(request(JSON.stringify(snapshot)), env))?.status).toBe(200);
    expect(put).toHaveBeenCalledOnce();
  });

  it("bounds multipart bodies even when Content-Length is absent", async () => {
    const { env, put } = environment();
    const response = await handleDemoAlumni(
      new Request(`${ORIGIN}/api/demo-alumni/import`, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data; boundary=test" },
        body: "x".repeat(1024 * 1024 + 16 * 1024 + 1),
      }),
      env,
    );
    expect(response?.status).toBe(413);
    expect(put).not.toHaveBeenCalled();
  });
});
