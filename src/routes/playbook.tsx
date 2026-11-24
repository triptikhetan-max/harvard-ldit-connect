import { createFileRoute } from "@tanstack/react-router";
import { Playbook } from "@/components/platform/Playbook";
import { pageHead } from "@/components/platform/Shared";

export const Route = createFileRoute("/playbook")({
  head: () =>
    pageHead(
      "Networking Playbook",
      "The original LDIT networking guide: your story, career directions, LinkedIn searches, outreach, meeting preparation, coffee chat questions, and follow-up.",
    ),
  component: Playbook,
});
