import { useState } from "react";
import { Download, Check, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pathways, openTypes, importedProfile, type Alum, type Student } from "@/data/mockData";
import { visibleAlum } from "@/lib/networking";
import { useDemo } from "./DemoContext";
import { PageTitle, Field, AlumCard, Tag } from "./Shared";
const list = (v: string) =>
  v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
export function ProfileEditor() {
  const d = useDemo();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [urlError, setUrlError] = useState("");
  const a = d.myAlum;
  const s = d.student;
  const updateAlum = (key: keyof Alum, value: unknown) => {
    d.setMyAlum({ ...a, [key]: value });
    setStatus("");
  };
  const updateStudent = (key: keyof Student, value: unknown) => {
    d.setStudent({ ...s, [key]: value });
    setStatus("");
  };
  const hide = (key: string) =>
    updateAlum(
      "hidden",
      a.hidden.includes(key) ? a.hidden.filter((v) => v !== key) : [...a.hidden, key],
    );
  const alumText = (key: keyof Alum, label: string, multiline = false) => {
    const value = a[key];
    return (
      <div key={key} className="editor-field">
        <Field label={label}>
          {multiline ? (
            <textarea
              rows={3}
              value={String(value)}
              onChange={(e) => updateAlum(key, e.target.value)}
            />
          ) : (
            <input
              value={String(value)}
              onChange={(e) =>
                updateAlum(key, key === "cohort" ? Number(e.target.value) : e.target.value)
              }
              type={key === "cohort" ? "number" : "text"}
              min={2015}
              max={2035}
            />
          )}
        </Field>
        <div className="flex justify-between items-center mt-1">
          {a.imported.includes(key) ? <Tag>From LinkedIn</Tag> : <span />}
          {["location", "undergrad", "major", "bio", "wish", "availability", "headline"].includes(
            key,
          ) && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => hide(key)}
              aria-label={`${a.hidden.includes(key) ? "Show" : "Hide"} ${label}`}
            >
              {a.hidden.includes(key) ? <EyeOff /> : <Eye />}
              {a.hidden.includes(key) ? "Hidden" : "Visible"}
            </Button>
          )}
        </div>
      </div>
    );
  };
  const alumList = (
    key: "skills" | "hobbies" | "pastRoles" | "education" | "askAbout",
    label: string,
  ) => (
    <div key={key}>
      <Field label={`${label} (comma-separated)`}>
        <input value={a[key].join(", ")} onChange={(e) => updateAlum(key, list(e.target.value))} />
      </Field>
      <div className="flex justify-between mt-1">
        {a.imported.includes(key) ? <Tag>From LinkedIn</Tag> : <span />}
        <Button variant="ghost" size="sm" onClick={() => hide(key)}>
          {a.hidden.includes(key) ? <EyeOff /> : <Eye />}
          {a.hidden.includes(key) ? "Hidden" : "Visible"}
        </Button>
      </div>
    </div>
  );
  const studentField = (key: keyof Student, label: string, array = false) => (
    <Field key={key} label={`${label}${array ? " (comma-separated)" : ""}`}>
      <input
        value={Array.isArray(s[key]) ? (s[key] as string[]).join(", ") : String(s[key])}
        type={key === "cohort" ? "number" : "text"}
        onChange={(e) =>
          updateStudent(
            key,
            array
              ? list(e.target.value)
              : key === "cohort"
                ? Number(e.target.value)
                : e.target.value,
          )
        }
      />
    </Field>
  );
  // Real LinkedIn integration must use official sign-in/API or alum-provided exports, never scraping.
  async function importLinkedIn() {
    try {
      const url = new URL(a.linkedin);
      if (
        url.protocol !== "https:" ||
        !["linkedin.com", "www.linkedin.com"].includes(url.hostname) ||
        !url.pathname.startsWith("/in/")
      )
        throw new Error();
    } catch {
      setUrlError("Enter a LinkedIn profile URL beginning with https://www.linkedin.com/in/.");
      return;
    }
    setUrlError("");
    setLoading(true);
    setStatus("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    d.setMyAlum({ ...a, ...importedProfile, imported: Object.keys(importedProfile) });
    setLoading(false);
    setStatus("Sample LinkedIn details imported. Review and edit before opting in.");
  }
  return (
    <div className="page-width pb-16">
      <PageTitle
        eyebrow="BRING YOUR WHOLE STORY"
        title="My profile"
        description={
          d.role === "Student"
            ? "A little about you helps surface more meaningful connections."
            : "Share your experience on your terms. Choose what the community can see."
        }
      />
      {d.role === "Student" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("Student profile saved for this demo session.");
          }}
          className="max-w-3xl"
        >
          <div className="form-grid">
            {studentField("name", "Full name")}
            {studentField("program", "Program")}
            {studentField("cohort", "Cohort year")}
            {studentField("undergrad", "Undergraduate institution")}
            {studentField("major", "Undergraduate major")}
            {studentField("pastWork", "Past work experience")}
            {studentField("skills", "Skills", true)}
            {studentField("hobbies", "Interests & hobbies", true)}
            {studentField("industries", "Target industries", true)}
            {studentField("roles", "Target roles", true)}
            {studentField("locations", "Preferred locations", true)}
          </div>
          <h2 className="text-2xl mt-8 mb-4">Pathways I’m exploring</h2>
          <div className="checkbox-grid">
            {pathways.map((p) => (
              <label key={p.id} className="check-row">
                <input
                  type="checkbox"
                  checked={s.pathways.includes(p.id)}
                  onChange={() =>
                    updateStudent(
                      "pathways",
                      s.pathways.includes(p.id)
                        ? s.pathways.filter((v) => v !== p.id)
                        : [...s.pathways, p.id],
                    )
                  }
                />
                {p.short}
              </label>
            ))}
          </div>
          <Field label="What are you hoping to get out of networking?">
            <textarea
              className="mt-3"
              value={s.goal}
              rows={3}
              onChange={(e) => updateStudent("goal", e.target.value)}
            />
          </Field>
          <Button className="mt-6" type="submit">
            <Check />
            Save profile
          </Button>
        </form>
      ) : (
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("Alum profile saved for this demo session.");
            }}
          >
            <section className="consent-panel">
              <label className="check-row font-medium">
                <input
                  role="switch"
                  aria-label="Include me in the alumni directory"
                  type="checkbox"
                  checked={a.optedIn}
                  onChange={(e) => updateAlum("optedIn", e.target.checked)}
                />
                Include me in the alumni directory
              </label>
              <p className="text-sm mt-3 text-muted-foreground">
                Your name, role, organization, cohort, and any fields marked visible will be shown
                to students and alumni. Participation is optional. Opt out or hide individual
                details at any time.
              </p>
            </section>
            <section className="profile-section mt-8">
              <h2>Import from LinkedIn</h2>
              <Field label="LinkedIn profile URL">
                <input
                  type="url"
                  placeholder="https://www.linkedin.com/in/your-name"
                  value={a.linkedin}
                  onChange={(e) => updateAlum("linkedin", e.target.value)}
                />
              </Field>
              <Button
                type="button"
                variant="outline"
                className="mt-3"
                disabled={loading}
                onClick={importLinkedIn}
              >
                {loading ? <LoaderCircle className="animate-spin" /> : <Download />}
                {loading ? "Fetching your profile…" : "Import from LinkedIn"}
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Simulated import · No LinkedIn account is accessed.
              </p>
              {urlError && (
                <p role="alert" className="text-destructive text-sm mt-2">
                  {urlError}
                </p>
              )}
            </section>
            <h2 className="text-2xl mb-5">Your professional story</h2>
            <div className="form-grid">
              {alumText("name", "Full name")}
              {alumText("headline", "Headline")}
              {alumText("role", "Current role")}
              {alumText("company", "Organization")}
              {alumText("industry", "Industry")}
              {alumText("location", "Location")}
              {alumText("cohort", "LDIT cohort year")}
              {alumText("undergrad", "Undergraduate institution")}
              {alumText("major", "Undergraduate major")}
              {alumList("pastRoles", "Past roles")}
              {alumList("education", "Education")}
              {alumList("skills", "Skills & tools")}
            </div>
            <h2 className="text-2xl mt-8 mb-4">LDIT pathways</h2>
            <div className="checkbox-grid">
              {pathways.map((p) => (
                <label className="check-row" key={p.id}>
                  <input
                    type="checkbox"
                    checked={a.pathways.includes(p.id)}
                    onChange={() =>
                      updateAlum(
                        "pathways",
                        a.pathways.includes(p.id)
                          ? a.pathways.filter((v) => v !== p.id)
                          : [...a.pathways, p.id],
                      )
                    }
                  />
                  {p.short}
                </label>
              ))}
            </div>
            <Button variant="ghost" size="sm" type="button" onClick={() => hide("pathways")}>
              {a.hidden.includes("pathways") ? <EyeOff /> : <Eye />}
              {a.hidden.includes("pathways") ? "Pathways hidden" : "Pathways visible"}
            </Button>
            <div className="mt-6 space-y-4">
              {alumText("bio", "Short bio", true)}
              {alumList("askAbout", "Ask me about")}
              {alumList("hobbies", "Interests & hobbies")}
              {alumText("wish", "What I wish I’d known as a student", true)}
            </div>
            <h2 className="text-2xl mt-8 mb-4">Open to</h2>
            <div className="checkbox-grid">
              {openTypes.map((t) => (
                <label key={t} className="check-row">
                  <input
                    type="checkbox"
                    checked={a.openTo.includes(t)}
                    onChange={() =>
                      updateAlum(
                        "openTo",
                        a.openTo.includes(t) ? a.openTo.filter((v) => v !== t) : [...a.openTo, t],
                      )
                    }
                  />
                  {t}
                </label>
              ))}
            </div>
            <Button variant="ghost" size="sm" type="button" onClick={() => hide("openTo")}>
              {a.hidden.includes("openTo") ? <EyeOff /> : <Eye />}
              {a.hidden.includes("openTo") ? "Open-to hidden" : "Open-to visible"}
            </Button>
            <div className="mt-4">{alumText("availability", "Availability note", true)}</div>
            <Button className="mt-6" type="submit">
              <Check />
              Save profile
            </Button>
          </form>
          <aside>
            <div className="lg:sticky lg:top-6">
              <p className="eyebrow mb-4">LIVE DIRECTORY PREVIEW</p>
              <AlumCard alum={visibleAlum(a)} />
              <p className="text-sm text-muted-foreground mt-4">
                {a.optedIn
                  ? "Your profile is included in the demo directory."
                  : "Preview only. You are not listed until you opt in."}
              </p>
            </div>
          </aside>
        </div>
      )}
      {status && (
        <p role="status" className="mt-5 text-success text-sm">
          {status}
        </p>
      )}
    </div>
  );
}
