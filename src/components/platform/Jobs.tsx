import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Plus, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canPost } from "@/lib/networking";
import { useDemo } from "./DemoContext";
import { PageTitle, Filter, Tag, Field, Empty } from "./Shared";
export function Jobs() {
  const d = useDemo();
  const [search, setSearch] = useState("");
  const [func, setFunc] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [posting, setPosting] = useState(false);
  const [status, setStatus] = useState("");
  const results = d.jobList.filter(
    (j) =>
      (!func || j.function === func) &&
      (!location || j.location === location) &&
      (!type || j.type === type) &&
      (!level || j.level === level) &&
      `${j.title} ${j.company} ${j.description}`.toLowerCase().includes(search.toLowerCase()),
  );
  function post(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canPost(d.role)) return;
    const f = new FormData(e.currentTarget);
    d.addJob({
      id: crypto.randomUUID(),
      title: String(f.get("title")),
      company: String(f.get("company")),
      location: String(f.get("location")),
      type: String(f.get("type")),
      level: String(f.get("level")),
      function: String(f.get("function")),
      date: new Date().toISOString().slice(0, 10),
      description: String(f.get("description")),
      url: "https://example.com/demo-opportunity",
      alumId: d.myAlum.optedIn ? d.myAlum.id : undefined,
    });
    setPosting(false);
    setSearch("");
    setFunc("");
    setLocation("");
    setType("");
    setLevel("");
    setStatus("Your job has been added for this demo session.");
  }
  return (
    <div className="page-width pb-16">
      <PageTitle
        eyebrow="YOUR NEXT CHAPTER"
        title="Jobs & opportunities"
        description="Find work that puts your learning, creativity, and curiosity into practice."
        action={
          canPost(d.role) && (
            <Button onClick={() => setPosting((v) => !v)}>
              <Plus />
              {posting ? "Close form" : "Post a job"}
            </Button>
          )
        }
      />
      {posting && canPost(d.role) && (
        <form className="posting-form" onSubmit={post}>
          <h2 className="text-2xl mb-5">Share an opportunity</h2>
          <div className="form-grid">
            {[
              ["title", "Job title"],
              ["company", "Organization"],
              ["location", "Location / remote / hybrid"],
            ].map(([name, label]) => (
              <Field key={name} label={label || "Details"}>
                <input name={name || "field"} required />
              </Field>
            ))}
            <Field label="Function">
              <select name="function">
                {[
                  "Learning design",
                  "Product",
                  "UX research",
                  "Program management",
                  "Teaching / K–12",
                  "Higher ed",
                  "Nonprofit",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Job type">
              <select name="type">
                {["Full-time", "Internship", "Contract", "Fellowship"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Level">
              <select name="level">
                {["Entry-level", "Mid-level", "Senior"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Description">
            <textarea name="description" required rows={3} />
          </Field>
          <Button className="mt-4" type="submit">
            Add job
          </Button>
        </form>
      )}
      {status && (
        <p role="status" className="text-success mb-4">
          {status}
        </p>
      )}
      <div className="search-box">
        <Search className="size-5 text-muted-foreground" />
        <input
          aria-label="Search jobs"
          value={search}
          placeholder="Search roles, organizations, or keywords…"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-row">
        <Filter
          label="Function"
          value={func}
          onChange={setFunc}
          options={[...new Set(d.jobList.map((j) => j.function))]}
        />
        <Filter
          label="Location"
          value={location}
          onChange={setLocation}
          options={[...new Set(d.jobList.map((j) => j.location))]}
        />
        <Filter
          label="Type"
          value={type}
          onChange={setType}
          options={["Full-time", "Internship", "Contract", "Fellowship"]}
        />
        <Filter
          label="Level"
          value={level}
          onChange={setLevel}
          options={["Entry-level", "Mid-level", "Senior"]}
        />
      </div>
      <p className="text-sm text-muted-foreground py-6">
        {results.length} opportunities · Sample openings
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {results.map((j) => {
          const alum = d.alums.find((a) => a.id === j.alumId && a.optedIn);
          return (
            <article className="listing-card" key={j.id}>
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag>{j.type}</Tag>
                <Tag>{j.level}</Tag>
                {alum && (
                  <Link to="/alumni/$id" params={{ id: alum.id }} className="tag text-primary">
                    Posted by alum
                  </Link>
                )}
              </div>
              <h2 className="text-2xl">{j.title}</h2>
              <p className="font-medium text-sm mt-2">{j.company}</p>
              <p className="text-sm text-muted-foreground flex gap-1 items-center mt-2">
                <MapPin className="size-3" />
                {j.location}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground mt-4">{j.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Posted {j.date} · {j.function}
                </span>
                <Button size="sm" variant="outline" asChild>
                  <a href={j.url} target="_blank" rel="noreferrer">
                    Apply <ExternalLink />
                  </a>
                </Button>
              </div>
              {alum && (
                <Button variant="link" size="sm" asChild className="mt-3 p-0">
                  <Link to="/alumni/$id" params={{ id: alum.id }}>
                    Connect with {alum.name}
                  </Link>
                </Button>
              )}
            </article>
          );
        })}
      </div>
      {!results.length && <Empty text="No jobs match these filters." />}
    </div>
  );
}
