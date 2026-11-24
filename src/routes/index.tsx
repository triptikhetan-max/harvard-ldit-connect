import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/platform/Home";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Home",
      "Find alumni, shared interests, opportunities and conversations in the HGSE LDIT community.",
    ),
  component: Home,
});
