import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Directory } from "@/components/platform/Directory";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/alumni/")({
  validateSearch: z.object({ pathway: z.string().optional() }),
  head: () =>
    pageHead(
      "Alumni directory",
      "Find opt-in LDIT alumni by pathway, industry, cohort, location and shared interests.",
    ),
  component: Page,
});
function Page() {
  const { pathway } = Route.useSearch();
  return <Directory pathway={pathway} />;
}
