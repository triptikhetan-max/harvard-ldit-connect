import { useEffect, useId, useState, type ChangeEvent } from "react";
import {
  MAX_ALUMNI_IMPORT_BYTES,
  PERSONAL_ALUMNI_STORAGE_KEY,
  parsePersonalAlumni,
  type PersonalAlumniSnapshot,
} from "@/lib/personal-alumni";
import { Button } from "@/components/ui/button";

export function PersonalAlumni() {
  const id = useId();
  const [snapshot, setSnapshot] = useState<PersonalAlumniSnapshot | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PERSONAL_ALUMNI_STORAGE_KEY);
      if (saved) setSnapshot(parsePersonalAlumni(saved));
    } catch {
      setStatus("Your saved list could not be read. You can import the file again.");
    }
  }, []);

  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    if (file.size > MAX_ALUMNI_IMPORT_BYTES) {
      setStatus("Choose a saved alumni file smaller than 1 MB.");
      return;
    }
    try {
      const imported = parsePersonalAlumni(await file.text());
      localStorage.setItem(PERSONAL_ALUMNI_STORAGE_KEY, JSON.stringify(imported));
      setSnapshot(imported);
      setSearch("");
      setStatus(`Imported ${imported.profiles.length} profiles into this browser.`);
    } catch {
      setStatus("This file could not be imported or saved. Your previous list is unchanged.");
    }
  }

  const results = snapshot?.profiles.filter((profile) =>
    `${profile.name} ${profile.headline} ${profile.education}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  return (
    <section aria-labelledby={`${id}-heading`} className="mb-10 border-b border-border pb-8">
      <h2 id={`${id}-heading`} className="text-3xl">
        Your saved alumni
      </h2>
      <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
        Import your saved directory results to search them here. The file is read on this device and
        stored only in this browser. Other visitors cannot see your list. This is a dated snapshot,
        not a live Harvard connection.
      </p>
      <label htmlFor={`${id}-file`} className="block mt-4 text-sm font-medium">
        Import saved alumni file
      </label>
      <input
        id={`${id}-file`}
        type="file"
        accept=".json,application/json"
        className="mt-2 max-w-xl"
        onChange={importFile}
      />
      {status && (
        <p role="status" className="text-sm mt-3">
          {status}
        </p>
      )}
      {snapshot && (
        <>
          <p className="text-sm text-muted-foreground mt-5">
            {snapshot.profiles.length} imported profiles · Saved{" "}
            {new Date(snapshot.capturedAt).toLocaleDateString()}
          </p>
          <label htmlFor={`${id}-search`} className="block mt-4 text-sm font-medium">
            Search your saved alumni
          </label>
          <input
            id={`${id}-search`}
            className="mt-2 max-w-xl"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name, role, organization, or degree"
          />
          <p className="text-sm mt-3">{results?.length} matching profiles</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {results?.map((profile) => (
              <article key={profile.profileUrl} className="alum-card">
                <h3 className="text-xl">{profile.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{profile.education}</p>
                {profile.headline && <p className="mt-3">{profile.headline}</p>}
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary mt-4 underline"
                >
                  View Harvard profile
                </a>
              </article>
            ))}
          </div>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => {
              try {
                localStorage.removeItem(PERSONAL_ALUMNI_STORAGE_KEY);
                setSnapshot(null);
                setSearch("");
                setStatus("Removed this browser’s copy. Your saved file is unchanged.");
              } catch {
                setStatus("The saved list could not be removed from this browser.");
              }
            }}
          >
            Remove this browser’s copy
          </Button>
        </>
      )}
    </section>
  );
}
