import { createFileRoute } from "@tanstack/react-router";
import { Events } from "@/components/platform/Events";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/events")({
  head: () =>
    pageHead(
      "Community events",
      "Discover LDIT workshops, panels and networking events and RSVP in the demo.",
    ),
  component: Events,
});
