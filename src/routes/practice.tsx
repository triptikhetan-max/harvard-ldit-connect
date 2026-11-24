import { createFileRoute } from "@tanstack/react-router";
import { FirstHello } from "@/components/platform/FirstHello";
import { pageHead } from "@/components/platform/Shared";

export const Route = createFileRoute("/practice")({
  head: () =>
    pageHead(
      "First Hello",
      "Practice a first networking conversation with fictional alumni, scripted replies, rotating roles, a shared countdown, and reflection slips.",
    ),
  component: FirstHello,
});
