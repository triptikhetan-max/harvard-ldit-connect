import { createFileRoute } from "@tanstack/react-router";
import { FindYourAlum } from "@/components/platform/FindYourAlum";
import { pageHead } from "@/components/platform/Shared";

export const Route = createFileRoute("/find-your-alum")({
  head: () =>
    pageHead(
      "Find Your Alum",
      "Find a Harvard alum in a role you want to explore and draft a personal first message.",
    ),
  component: FindYourAlum,
});
