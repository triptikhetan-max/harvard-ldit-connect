import { PageTitle } from "./Shared";
import { publicAsset } from "@/lib/public-asset";

export function FindYourAlum() {
  return (
    <>
      <div className="page-width">
        <PageTitle
          eyebrow="LDIT · YOUR NEXT CONVERSATION"
          title="Find Your Alum"
          description="Choose a role, find one real alum, and draft a thoughtful first message. Your progress stays in this browser; nothing is sent automatically."
        />
      </div>
      <section aria-label="Find Your Alum guided activity">
        <iframe
          title="Find Your Alum guided networking activity"
          src={publicAsset("activities/find-your-alum.html")}
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          allow="clipboard-write"
          className="practice-frame"
        />
      </section>
    </>
  );
}
