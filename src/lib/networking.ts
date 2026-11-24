import type { Alum, Student } from "@/data/mockData";
import { pathways } from "@/data/mockData";
export type Overlap = { label: string; explanation: string; reference: string; score: number };
const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();
export function visibleAlum(a: Alum): Alum {
  const copy = { ...a };
  for (const key of a.hidden) {
    if (
      key === "skills" ||
      key === "hobbies" ||
      key === "pastRoles" ||
      key === "education" ||
      key === "askAbout" ||
      key === "openTo" ||
      key === "pathways"
    )
      copy[key] = [];
    if (
      key === "location" ||
      key === "undergrad" ||
      key === "major" ||
      key === "bio" ||
      key === "wish" ||
      key === "availability" ||
      key === "headline"
    )
      copy[key] = "";
  }
  return copy;
}
export function commonalities(student: Student, raw: Alum): Overlap[] {
  const a = visibleAlum(raw);
  const overlaps: Overlap[] = [];
  const add = (label: string, explanation: string, reference: string, score: number) =>
    overlaps.push({ label, explanation, reference, score });
  for (const id of student.pathways.filter((p) => a.pathways.includes(p))) {
    const p = pathways.find((p) => p.id === id);
    if (p)
      add(
        p.short,
        `You are both interested in ${p.short.toLowerCase()}.`,
        p.short.toLowerCase(),
        10,
      );
  }
  if (student.industries.some((i) => same(i, a.industry)))
    add(
      a.industry,
      `Your target industry matches ${a.name.split(" ")[0]}'s current field.`,
      a.industry,
      9,
    );
  if (student.roles.some((r) => a.role.toLowerCase().includes(r.toLowerCase())))
    add(
      "Role interest",
      `Their role aligns with your interest in ${a.role}.`,
      a.role.toLowerCase(),
      9,
    );
  if (student.undergrad && same(student.undergrad, a.undergrad))
    add(a.undergrad, "You attended the same undergraduate institution.", a.undergrad, 8);
  if (student.major && same(student.major, a.major))
    add(a.major, "You share an undergraduate area of study.", a.major.toLowerCase(), 7);
  for (const skill of student.skills.filter((s) => a.skills.some((v) => same(s, v))))
    add(skill, `You both bring ${skill} to your work.`, skill, 6);
  if (student.locations.some((l) => same(l, a.location)))
    add(a.location, "Their location is one of your preferred places to work.", a.location, 6);
  else if (
    student.locations.some((l) => l.split(",")[0]?.trim() === a.location.split(",")[0]?.trim()) &&
    a.location
  )
    add(a.location, "You share an interest in the same city.", a.location, 5);
  if (
    student.pastWork &&
    a.pastRoles.some(
      (r) =>
        r.toLowerCase().includes(student.pastWork.toLowerCase()) ||
        student.pastWork.toLowerCase().includes(r.toLowerCase()),
    )
  )
    add(
      "Previous work",
      "Your previous work includes a similar role or employer.",
      "similar work backgrounds",
      5,
    );
  else if (
    student.pastWork &&
    a.pastRoles.some(
      (r) =>
        r.split(" ")[0] &&
        student.pastWork.toLowerCase().includes((r.split(" ")[0] || "").toLowerCase()),
    )
  )
    add(
      "Previous sector",
      "You have experience in a similar sector.",
      "similar work backgrounds",
      4,
    );
  for (const hobby of student.hobbies.filter((h) => a.hobbies.some((v) => same(h, v))))
    add(hobby, `Away from work, you both enjoy ${hobby.toLowerCase()}.`, hobby.toLowerCase(), 3);
  if (Math.abs(student.cohort - a.cohort) <= 2)
    add(
      "Nearby cohorts",
      `Your LDIT cohorts are ${Math.abs(student.cohort - a.cohort)} years apart.`,
      "nearby LDIT cohorts",
      2,
    );
  if (overlaps.length < 3) {
    add("LDIT community", "You share a connection to the HGSE LDIT community.", "LDIT", 1);
    for (const topic of a.askAbout.slice(0, 2))
      add(
        topic,
        `${a.name.split(" ")[0]} welcomes questions about this topic.`,
        topic.toLowerCase(),
        1,
      );
  }
  return overlaps.sort((a, b) => b.score - a.score).slice(0, 5);
}
export function makeMessages(s: Student, a: Alum, tone: string, variant = 0) {
  const overlaps = commonalities(s, a);
  const ref = overlaps
    .slice(0, 2)
    .map((o) => o.reference)
    .join(" and ");
  const first = a.name.split(" ")[0];
  const patterns =
    tone === "Formal"
      ? [
          `Hello ${first}, I am an HGSE LDIT student interested in ${ref}. I would appreciate connecting and learning about your work.`,
          `Dear ${first}, our shared connection to ${ref} caught my attention. As an LDIT student, I would value connecting with you.`,
        ]
      : tone === "Concise"
        ? [
            `Hi ${first}, LDIT student here. We share an interest in ${ref}. I'd love to connect!`,
            `Hi ${first}! I'm studying LDIT and exploring ${ref}. May we connect?`,
          ]
        : [
            `Hi ${first}! I'm an LDIT student and noticed our connection through ${ref}. I'd love to connect and hear about your journey!`,
            `Hi ${first}, your work caught my eye! I'm in LDIT, and we have ${ref} in common. I'd enjoy connecting.`,
          ];
  let note =
    patterns[variant % patterns.length] ||
    patterns[0] ||
    "Hi! I am an LDIT student and would love to connect.";
  if (note.length > 199)
    note = `Hi ${first}! I'm an HGSE LDIT student interested in ${overlaps[0]?.reference.slice(0, 65) || "your work"}. I'd love to connect and learn about your path!`;
  return {
    note: note.slice(0, 199),
    followup: `Hi ${first}, thank you for connecting! I'm ${s.name}, a current ${s.program} student at HGSE exploring ${s.roles.join(" and ")}. ${overlaps[0]?.explanation || "We share the LDIT community."} Would you be open to a 20-minute coffee chat in the next couple of weeks? I'd love to learn about your path to ${a.company} and hear your advice. Happy to work around your schedule. Thank you!`,
  };
}
export const directoryAlumni = (all: Alum[]) => all.filter((a) => a.optedIn).map(visibleAlum);
export const canPost = (role: string) => role === "Alum";
