import type { PersonalAlumniSnapshot } from "./personal-alumni";

export const DEMO_ALUMNI_PATH = "/api/demo-alumni";
export const DEMO_IMPORT_PATH = `${DEMO_ALUMNI_PATH}/import`;
export const DEMO_ADMIN_PATH = "/demo-data";
export const DEMO_PAGE_SIZE = 25;

export type DemoSearchResult = {
  total: number;
  page: number;
  pageSize: number;
  capturedAt: string;
  profiles: PersonalAlumniSnapshot["profiles"];
};
