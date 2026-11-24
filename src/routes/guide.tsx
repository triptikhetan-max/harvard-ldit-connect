import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Guide } from "@/components/platform/Guide";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/guide")({
  validateSearch: z.object({ pathway: z.string().optional() }),
  head: () =>
    pageHead(
      "Coffee Chat Guide",
      "Build your coffee chat question list, prepare your story and space, and follow up thoughtfully.",
    ),
  component: Page,
});
function Page() {
  const { pathway } = Route.useSearch();
  return <Guide pathway={pathway} />;
}
