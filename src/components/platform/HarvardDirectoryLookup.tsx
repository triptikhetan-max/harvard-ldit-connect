import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./Shared";

const HARVARD_DIRECTORY_URL =
  "https://alumni.harvard.edu/hk-login?destination_url=https%3A%2F%2Fcommunity.alumni.harvard.edu%2FadvancedQuery";
const HGSE_SCHOOL = "Harvard Graduate School of Education";

export function HarvardDirectoryLookup() {
  const searchId = useId();
  const [search, setSearch] = useState("");
  const checklist = [
    `School: ${HGSE_SCHOOL}`,
    ...(search.trim() ? [`Search: ${search.trim()}`] : []),
    "Look for Career Network profiles when seeking career conversations.",
  ].join("\n");

  return (
    <section aria-labelledby={`${searchId}-title`} className="quick-link mb-10">
      <p className="eyebrow">HARVARDKEY LOOKUP</p>
      <h2 id={`${searchId}-title`} className="text-3xl mt-3">
        Search real Harvard alumni
      </h2>
      <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
        Open Harvard’s official directory in a new tab and sign in there with your own HarvardKey.
        Use the school filter and your search terms to find people to talk to. Directory access
        depends on your Harvard eligibility.
      </p>
      <label htmlFor={searchId} className="block mt-5 text-sm font-medium">
        Role, company, or interest
      </label>
      <input
        id={searchId}
        className="mt-2 max-w-xl"
        placeholder="For example, learning designer"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <p className="text-sm mt-3">School: {HGSE_SCHOOL}</p>
      <div className="flex flex-wrap gap-3 mt-5">
        <CopyButton text={checklist} label="Copy search checklist" />
        <Button asChild>
          <a href={HARVARD_DIRECTORY_URL} target="_blank" rel="noopener noreferrer">
            Open Harvard directory
          </a>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-4 max-w-2xl">
        Enter these filters on Harvard’s site after signing in. This app does not receive your
        HarvardKey credentials or import directory profiles. Search terms stay in this page unless
        you copy them.
      </p>
    </section>
  );
}
