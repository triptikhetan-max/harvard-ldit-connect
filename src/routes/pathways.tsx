import { createFileRoute } from "@tanstack/react-router";
import { Pathways } from "@/components/platform/Pathways";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/pathways")({
  head: () =>
    pageHead(
      "LDIT pathways",
      "Explore eight career pathways, skills, sample trajectories and alumni after LDIT.",
    ),
  component: Pathways,
});
