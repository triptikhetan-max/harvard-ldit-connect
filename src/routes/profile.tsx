import { createFileRoute } from "@tanstack/react-router";
import { ProfileEditor } from "@/components/platform/ProfileEditor";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/profile")({
  head: () =>
    pageHead(
      "My profile",
      "Edit your student interests or alumni profile and control directory visibility.",
    ),
  component: ProfileEditor,
});
