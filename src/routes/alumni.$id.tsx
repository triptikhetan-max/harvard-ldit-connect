import { createFileRoute } from "@tanstack/react-router";
import { AlumProfile } from "@/components/platform/AlumProfile";
import { alumni } from "@/data/mockData";
import { pageHead } from "@/components/platform/Shared";
export const Route = createFileRoute("/alumni/$id")({
  head: ({ params }) =>
    pageHead(
      `${alumni.find((a) => a.id === params.id)?.name || "Alumni"} · Profile`,
      "Discover an LDIT alumni career story, shared connections, and personalized coffee chat drafts.",
    ),
  component: Page,
});
function Page() {
  const { id } = Route.useParams();
  return <AlumProfile id={id} />;
}
