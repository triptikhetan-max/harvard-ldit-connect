import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { pathways, openTypes } from "@/data/mockData";
import { directoryAlumni, commonalities } from "@/lib/networking";
import { useDemo } from "./DemoContext";
import { PageTitle, Filter, AlumCard, Empty } from "./Shared";
import { HarvardDirectoryLookup } from "./HarvardDirectoryLookup";
export function Directory({ pathway }: { pathway?: string | undefined }) {
  const d = useDemo();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [cohort, setCohort] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState("");
  const [sort, setSort] = useState("Best match for me");
  const all = directoryAlumni(d.alums);
  let results = all.filter(
    (a) =>
      (!pathway || a.pathways.includes(pathway)) &&
      (!industry || a.industry === industry) &&
      (!cohort || String(a.cohort) === cohort) &&
      (!location || a.location === location) &&
      (!open || a.openTo.includes(open)) &&
      `${a.name} ${a.role} ${a.company} ${a.skills.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  results = results.sort((a, b) =>
    sort === "Name A–Z"
      ? a.name.localeCompare(b.name)
      : sort === "Newest cohort"
        ? b.cohort - a.cohort
        : commonalities(d.student, b).reduce((v, o) => v + o.score, 0) -
          commonalities(d.student, a).reduce((v, o) => v + o.score, 0),
  );
  return (
    <div className="page-width pb-16">
      <PageTitle
        eyebrow="YOUR COMMUNITY, YOUR CONNECTIONS"
        title="Alumni directory"
        description="Search real alumni through HarvardKey, or explore the fictional networking demo below."
      />
      <HarvardDirectoryLookup />
      <h2 className="text-2xl mb-3">Explore demo profiles</h2>
      <p className="text-sm text-muted-foreground mb-5">
        These people and organizations are fictional. The filters below search only this demo; use
        the Harvard directory above for real alumni.
      </p>
      <div className="search-box">
        <Search className="size-5 text-muted-foreground" />
        <input
          aria-label="Search demo profiles"
          placeholder="Search by name, role, company, or skill…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-row">
        <SlidersHorizontal className="size-4 text-muted-foreground self-end mb-3 hidden lg:block" />
        <Filter
          label="Industry"
          value={industry}
          onChange={setIndustry}
          options={[...new Set(all.map((a) => a.industry))]}
        />
        <label className="filter-label">
          Pathway
          <select
            aria-label="Pathway"
            value={pathway || ""}
            onChange={(e) =>
              navigate({ to: "/alumni", search: { pathway: e.target.value || undefined } })
            }
          >
            <option value="">All pathways</option>
            {pathways.map((p) => (
              <option key={p.id} value={p.id}>
                {p.short}
              </option>
            ))}
          </select>
        </label>
        <Filter
          label="Cohort"
          value={cohort}
          onChange={setCohort}
          options={[...new Set(all.map((a) => String(a.cohort)))].sort().reverse()}
        />
        <Filter
          label="Location"
          value={location}
          onChange={setLocation}
          options={[...new Set(all.map((a) => a.location).filter(Boolean))]}
        />
        <Filter label="Open to" value={open} onChange={setOpen} options={openTypes} />
      </div>
      <div className="flex justify-between flex-wrap items-center gap-4 py-6">
        <p className="text-sm text-muted-foreground">{results.length} fictional demo profiles</p>
        <label className="text-sm flex gap-2 items-center">
          Sort by
          <select
            aria-label="Sort alumni"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="compact-select"
          >
            {["Best match for me", "Name A–Z", "Newest cohort"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      {results.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((a) => (
            <AlumCard
              key={a.id}
              alum={a}
              match={
                sort === "Best match for me"
                  ? `${commonalities(d.student, a).length} shared connections`
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <Empty text="No alumni match these filters. Try a different search." />
      )}
    </div>
  );
}
