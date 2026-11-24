import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Directory } from "@/components/platform/Directory";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/alumni/")({
  validateSearch: z.object({ pathway: z.string().optional() }),
  head: () =>
    pageHead(
      "Alumni directory",
      "Search the shared HGSE alumni demo with a demo access code, or open Harvard’s official directory.",
    ),
  component: Page,
});
function Page() {
  const { pathway } = Route.useSearch();
  return <Directory pathway={pathway} />;
}
