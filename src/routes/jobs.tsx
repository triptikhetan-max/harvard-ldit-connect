import { createFileRoute } from "@tanstack/react-router";
import { Jobs } from "@/components/platform/Jobs";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/jobs")({
  head: () =>
    pageHead(
      "Jobs & opportunities",
      "Explore fictional learning design, research and product opportunities shared by LDIT alumni.",
    ),
  component: Jobs,
});
