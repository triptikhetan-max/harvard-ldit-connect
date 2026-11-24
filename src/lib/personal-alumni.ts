import { z } from "zod";

export const PERSONAL_ALUMNI_STORAGE_KEY = "ldit-connect-personal-alumni-v1";
export const MAX_ALUMNI_IMPORT_BYTES = 1024 * 1024;
const profileSchema = z.object({
  name: z.string().trim().min(1).max(160),
  profileUrl: z.string().regex(/^https:\/\/community\.alumni\.harvard\.edu\/person\/\d+$/),
  education: z.string().max(200),
  headline: z.string().max(400),
});
const snapshotSchema = z.object({
  capturedAt: z.string().datetime(),
  source: z.literal("Harvard Alumni Directory"),
  query: z.string().max(500),
  profiles: z.array(profileSchema).min(1).max(1000),
});

export type PersonalAlumniSnapshot = z.infer<typeof snapshotSchema>;

export function parsePersonalAlumni(text: string): PersonalAlumniSnapshot {
  return snapshotSchema.parse(JSON.parse(text));
}
