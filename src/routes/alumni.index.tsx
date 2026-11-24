import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Directory } from "@/components/platform/Directory";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/alumni/")({
  validateSearch: z.object({ pathway: z.string().optional() }),
  head: () =>
    pageHead(
      "Alumni directory",
      "Open the official Harvard alumni directory with HarvardKey, or explore fictional LDIT demo profiles.",
    ),
  component: Page,
});
function Page() {
  const { pathway } = Route.useSearch();
  return <Directory pathway={pathway} />;
}
