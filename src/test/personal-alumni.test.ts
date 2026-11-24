import { describe, expect, it } from "vitest";
import { parsePersonalAlumni } from "@/lib/personal-alumni";

const sample = {
  capturedAt: "2026-11-24T19:00:00.000Z",
  source: "Harvard Alumni Directory",
  query: "HGSE",
  profiles: [
    {
      name: "Test Person",
      profileUrl: "https://community.alumni.harvard.edu/person/123456",
      education: "EDM 2020",
      headline: "Designer at Example",
    },
  ],
};

describe("Personal alumni imports", () => {
  it("accepts a dated snapshot and strips fields outside the minimal profile", () => {
    const parsed = parsePersonalAlumni(
      JSON.stringify({
        ...sample,
        profiles: [{ ...sample.profiles[0], email: "unused@example.com", phone: "unused" }],
      }),
    );
    expect(parsed.profiles).toEqual(sample.profiles);
  });

  it.each(["javascript:alert(1)", "https://other.example/person/123456"])(
    "rejects unsafe or off-site profile links: %s",
    (profileUrl) => {
      expect(() =>
        parsePersonalAlumni(
          JSON.stringify({ ...sample, profiles: [{ ...sample.profiles[0], profileUrl }] }),
        ),
      ).toThrow();
    },
  );

  it("rejects malformed files and undated records", () => {
    expect(() => parsePersonalAlumni("not json")).toThrow();
    expect(() => parsePersonalAlumni(JSON.stringify({ ...sample, capturedAt: "" }))).toThrow();
  });
});
