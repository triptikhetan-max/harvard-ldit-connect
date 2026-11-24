import { describe, it, expect } from "vitest";
import { alumni, blankAlum, sampleStudent, questions, jobs, events } from "@/data/mockData";
import { commonalities, directoryAlumni, makeMessages, canPost } from "@/lib/networking";
const firstAlum = alumni[0];
if (!firstAlum) throw new Error("Expected sample alum");
describe("Networking demo rules", () => {
  it("never lists an alum until they explicitly opt in", () => {
    expect(directoryAlumni([blankAlum])).toHaveLength(0);
    expect(directoryAlumni([{ ...blankAlum, optedIn: true }])).toHaveLength(1);
  });
  it("hiding fields removes them from matching and public display", () => {
    const a = { ...firstAlum, hidden: ["skills", "undergrad", "hobbies", "location"] };
    const publicProfile = directoryAlumni([a])[0];
    expect(publicProfile?.skills).toEqual([]);
    expect(publicProfile?.location).toBe("");
    expect(
      commonalities(sampleStudent, a).some((o) =>
        ["Figma", "Lakebridge University", "Hiking", "Boston, MA"].includes(o.label),
      ),
    ).toBe(false);
  });
  it("keeps every connection note under 200 characters in all tones", () => {
    for (const a of alumni)
      for (const tone of ["Warm", "Concise", "Formal"])
        for (let i = 0; i < 2; i++) {
          const m = makeMessages(sampleStudent, a, tone, i);
          expect(m.note.length).toBeLessThan(200);
          expect(m.note).toContain(a.name.split(" ")[0]);
        }
  });
  it("mentions real shared connections and requests a 20-minute follow-up", () => {
    const m = makeMessages(sampleStudent, firstAlum, "Warm");
    expect(m.note).toContain("learning design");
    expect(m.followup).toContain("20-minute coffee chat");
    expect(commonalities(sampleStudent, firstAlum).length).toBeGreaterThanOrEqual(3);
  });
  it("falls back to LDIT and ask-me-about topics when there is no overlap", () => {
    const a = { ...blankAlum, cohort: 2015, pathways: [], askAbout: ["Museum learning"] };
    const s = {
      ...sampleStudent,
      undergrad: "Different school",
      major: "Other",
      skills: [],
      hobbies: [],
      industries: [],
      roles: [],
      locations: [],
      pathways: [],
      pastWork: "",
    };
    expect(commonalities(s, a).map((o) => o.label)).toEqual(["LDIT community", "Museum learning"]);
  });
  it("only alums can post jobs or events", () => {
    expect(canPost("Student")).toBe(false);
    expect(canPost("Alum")).toBe(true);
  });
  it("seeds 12 fictional opted-in alumni from cohorts 2015–2025", () => {
    expect(alumni).toHaveLength(12);
    expect(alumni.every((a) => a.cohort >= 2015 && a.cohort <= 2025 && a.optedIn)).toBe(true);
  });
  it("provides 8–10 jobs, 6–8 events, and at least 30 general questions", () => {
    expect(jobs.length).toBeGreaterThanOrEqual(8);
    expect(jobs.length).toBeLessThanOrEqual(10);
    expect(events.length).toBeGreaterThanOrEqual(6);
    expect(events.length).toBeLessThanOrEqual(8);
    expect(questions.length).toBeGreaterThanOrEqual(30);
  });
});
