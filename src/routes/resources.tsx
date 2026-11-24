import { createFileRoute } from "@tanstack/react-router";
import { Resources } from "@/components/platform/Resources";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/resources")({
  head: () =>
    pageHead(
      "Career resources",
      "Browse LDIT advising, portfolio, interview and professional community resources.",
    ),
  component: Resources,
});
