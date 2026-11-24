import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DEMO_ALUMNI_PATH, type DemoSearchResult } from "@/lib/demo-alumni";

const INPUT_STYLE =
  "mt-2 w-full max-w-xl rounded-md border border-input bg-background px-3 py-2 text-base";

export function SharedDemoAlumni() {
  const [code, setCode] = useState("");
  const [activeCode, setActiveCode] = useState("");
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [result, setResult] = useState<DemoSearchResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function search(accessCode: string, term: string, page: number) {
    setBusy(true);
    setError("");
    try {
      const params = new URLSearchParams({ q: term, page: String(page) });
      const response = await fetch(`${DEMO_ALUMNI_PATH}?${params}`, {
        headers: { Authorization: `Bearer ${accessCode}` },
        cache: "no-store",
      });
      if (!response.ok) {
        if (response.status === 401) {
          setResult(null);
          setActiveCode("");
        }
        setError(
          response.status === 401
            ? "That demo code was not accepted."
            : "The demo directory could not be loaded. Please try again.",
        );
        return;
      }
      setResult((await response.json()) as DemoSearchResult);
      setActiveCode(accessCode);
      setActiveQuery(term);
      setCode("");
    } catch {
      setError("The demo directory could not be reached. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-labelledby="shared-demo-heading" className="mb-10 border-b border-border pb-8">
      <p className="eyebrow">SHARED PROJECT DEMO</p>
      <h2 id="shared-demo-heading" className="text-3xl mt-3">
        Real HGSE alumni
      </h2>
      <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
        Search the shared 2025-cohort snapshot with your team’s demo access code. Records are served
        from private storage across browsers. Demo access does not verify a Harvard identity and is
        not a live HarvardKey connection.
      </p>
      {!result ? (
        <form
          className="mt-5"
          onSubmit={(event) => {
            event.preventDefault();
            void search(code, "", 1);
          }}
        >
          <label htmlFor="demo-code" className="block text-sm font-medium">
            Demo access code
          </label>
          <input
            id="demo-code"
            type="password"
            autoComplete="off"
            required
            value={code}
            className={INPUT_STYLE}
            disabled={busy}
            onChange={(event) => setCode(event.target.value)}
          />
          <Button className="block mt-3" type="submit" disabled={busy}>
            {busy ? "Loading…" : "Open shared demo"}
          </Button>
        </form>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
            <p className="text-sm">
              {result.total} matching alumni · Snapshot{" "}
              {new Date(result.capturedAt).toLocaleDateString()}
            </p>
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => {
                setActiveCode("");
                setResult(null);
                setQuery("");
                setActiveQuery("");
                setError("");
              }}
            >
              Close demo access
            </Button>
          </div>
          <form
            className="mt-5"
            onSubmit={(event) => {
              event.preventDefault();
              void search(activeCode, query, 1);
            }}
          >
            <label htmlFor="shared-demo-search" className="block text-sm font-medium">
              Search shared alumni
            </label>
            <input
              id="shared-demo-search"
              className={INPUT_STYLE}
              value={query}
              maxLength={200}
              disabled={busy}
              placeholder="Name, professional headline, or degree"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button type="submit" className="ml-3" disabled={busy}>
              {busy ? "Searching…" : "Search shared directory"}
            </Button>
          </form>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {result.profiles.map((profile) => (
              <article key={profile.profileUrl} className="alum-card">
                <h3 className="text-xl">{profile.name}</h3>
                {profile.education && (
                  <p className="text-sm text-muted-foreground mt-2">{profile.education}</p>
                )}
                {profile.headline && <p className="mt-3">{profile.headline}</p>}
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary underline mt-4"
                >
                  View Harvard profile
                </a>
              </article>
            ))}
          </div>
          {!result.profiles.length && <p className="mt-5">No records match this search.</p>}
          <div className="flex flex-wrap items-center gap-4 mt-5">
            <Button
              variant="outline"
              disabled={busy || result.page <= 1}
              onClick={() => void search(activeCode, activeQuery, result.page - 1)}
            >
              Previous
            </Button>
            <span>
              Page {result.page} of {Math.max(1, Math.ceil(result.total / result.pageSize))}
            </span>
            <Button
              variant="outline"
              disabled={busy || result.page * result.pageSize >= result.total}
              onClick={() => void search(activeCode, activeQuery, result.page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
      {error && (
        <p role="alert" className="mt-4 text-destructive">
          {error}
        </p>
      )}
    </section>
  );
}
