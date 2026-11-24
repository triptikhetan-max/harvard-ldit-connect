import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, RefreshCw, MapPin, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pathways } from "@/data/mockData";
import { commonalities, makeMessages, visibleAlum } from "@/lib/networking";
import { useDemo } from "./DemoContext";
import { Tag, CopyButton, Empty } from "./Shared";
export function AlumProfile({ id }: { id: string }) {
  const d = useDemo();
  const raw = d.alums.find((a) => a.id === id && a.optedIn);
  const a = raw ? visibleAlum(raw) : undefined;
  const [tone, setTone] = useState("Warm");
  const [variant, setVariant] = useState(0);
  const [note, setNote] = useState("");
  const [followup, setFollowup] = useState("");
  useEffect(() => {
    if (a) {
      const m = makeMessages(d.student, a, tone, variant);
      setNote(m.note);
      setFollowup(m.followup);
    }
  }, [id, tone, variant, d.student, raw]);
  if (!a)
    return (
      <div className="page-width py-16">
        <Empty text="This profile is not currently included in the alumni directory." />
        <Button asChild variant="link">
          <Link to="/alumni">Back to alumni</Link>
        </Button>
      </div>
    );
  const overlaps = commonalities(d.student, a);
  const relatedJobs = d.jobList.filter((j) => j.alumId === id || j.company === a.company);
  const relatedEvents = d.eventList.filter((e) => e.alumIds.includes(id));
  return (
    <div className="page-width py-9 pb-16">
      <Link to="/alumni" className="text-sm text-muted-foreground flex items-center gap-2 mb-8">
        <ArrowLeft className="size-4" />
        Alumni directory
      </Link>
      <div className="profile-top">
        <span className="avatar large">
          {a.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div>
          <p className="eyebrow">LDIT CLASS OF {a.cohort}</p>
          <h1 className="text-4xl md:text-5xl mt-2">{a.name}</h1>
          <p className="mt-3 text-lg">
            {a.role} at {a.company}
          </p>
          {a.headline && <p className="text-sm text-muted-foreground mt-2">{a.headline}</p>}
          <div className="flex flex-wrap gap-2 mt-4">
            {a.location && (
              <Tag>
                <MapPin className="size-3 inline mr-1" />
                {a.location}
              </Tag>
            )}
            {a.pathways.map((id) => (
              <Tag key={id}>{pathways.find((p) => p.id === id)?.short}</Tag>
            ))}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-[1fr_340px] gap-12 mt-10">
        <div>
          {a.bio && (
            <section className="profile-section">
              <h2>About</h2>
              <p>{a.bio}</p>
            </section>
          )}
          {a.askAbout.length > 0 && (
            <section className="profile-section">
              <h2>Ask me about</h2>
              <div className="flex flex-wrap gap-2">
                {a.askAbout.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </section>
          )}
          {a.wish && (
            <section className="profile-section">
              <h2>What I wish I’d known</h2>
              <blockquote className="quote">“{a.wish}”</blockquote>
            </section>
          )}
          {a.pastRoles.length > 0 && (
            <section className="profile-section">
              <h2>Before this role</h2>
              {a.pastRoles.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </section>
          )}
          {(a.undergrad || a.major || a.education.length > 0) && (
            <section className="profile-section">
              <h2>Education</h2>
              {a.education.map((t) => (
                <p key={t}>{t}</p>
              ))}
              <p>
                {a.undergrad}
                {a.major && ` · ${a.major}`}
              </p>
            </section>
          )}
          {a.skills.length > 0 && (
            <section className="profile-section">
              <h2>Skills & tools</h2>
              <div className="flex flex-wrap gap-2">
                {a.skills.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </section>
          )}
          {a.hobbies.length > 0 && (
            <section className="profile-section">
              <h2>Outside of work</h2>
              <p>{a.hobbies.join(" · ")}</p>
            </section>
          )}
          {d.role === "Student" && (
            <>
              <section className="profile-section">
                <p className="eyebrow">A NATURAL PLACE TO START</p>
                <h2>What you have in common</h2>
                <div className="overlap-list">
                  {overlaps.map((o, i) => (
                    <div key={o.label + i}>
                      <Tag>{o.label}</Tag>
                      <p className="text-sm mt-2">{o.explanation}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section className="profile-section">
                <h2>Draft your LinkedIn message</h2>
                <div className="flex flex-wrap gap-2 items-center mb-4">
                  <div className="segmented">
                    {["Warm", "Concise", "Formal"].map((t) => (
                      <Button
                        key={t}
                        size="sm"
                        variant={tone === t ? "default" : "ghost"}
                        onClick={() => setTone(t)}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setVariant((v) => v + 1)}>
                    <RefreshCw />
                    Regenerate
                  </Button>
                </div>
                <label className="field">
                  <span>Connection request</span>
                  <textarea
                    aria-label="Connection request"
                    maxLength={199}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                  />
                </label>
                <div className="flex flex-wrap justify-between items-center gap-3 mt-3">
                  <span className="text-xs text-muted-foreground">
                    {note.length}/200 characters
                  </span>
                  <div className="flex gap-2">
                    <CopyButton text={note} />
                    <Button asChild size="sm">
                      <a
                        href={a.linkedin || "https://www.linkedin.com/"}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open LinkedIn <ExternalLink />
                      </a>
                    </Button>
                  </div>
                </div>
                <label className="field mt-7">
                  <span>After they accept · Coffee chat request</span>
                  <textarea
                    aria-label="Follow-up message"
                    rows={6}
                    value={followup}
                    onChange={(e) => setFollowup(e.target.value)}
                  />
                </label>
                <div className="mt-3">
                  <CopyButton text={followup} />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Sample LinkedIn address · Message drafts are based on your shared profile details.
                </p>
              </section>
              <section className="profile-section">
                <h2>Next steps</h2>
                {[
                  "Send your connection request with the note above",
                  "If they accept, wait a few days, then send the coffee chat request",
                  "Prep 3–5 questions",
                  "Have the conversation",
                  "Send a thank-you note within 24 hours",
                  "Follow up in 4–6 weeks with a short update",
                ].map((step, i) => (
                  <label className="check-row" key={step}>
                    <input
                      type="checkbox"
                      checked={!!d.steps[`${id}-${i}`]}
                      onChange={() => d.toggleStep(`${id}-${i}`)}
                    />
                    <span>
                      {step}
                      {i === 2 && (
                        <Link
                          to="/guide"
                          search={{ pathway: a.pathways[0] }}
                          className="text-primary ml-2 underline"
                        >
                          Coffee Chat Guide
                        </Link>
                      )}
                    </span>
                  </label>
                ))}
              </section>
            </>
          )}
        </div>
        <aside>
          <section className="side-panel">
            <Coffee className="text-success size-6" />
            <h2 className="text-2xl mt-4">Open to connecting</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {a.openTo.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            {a.availability && (
              <p className="text-sm text-muted-foreground mt-5">{a.availability}</p>
            )}
          </section>
          <section className="mt-8">
            <h2 className="text-2xl mb-5">Related for you</h2>
            {relatedJobs.map((j) => (
              <Link key={j.id} to="/jobs" className="related-item">
                <p className="eyebrow">OPPORTUNITY</p>
                <h3 className="text-lg mt-2">{j.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{j.company}</p>
              </Link>
            ))}
            {relatedEvents.map((e) => (
              <Link key={e.id} to="/events" className="related-item">
                <p className="eyebrow">COMMUNITY EVENT</p>
                <h3 className="text-lg mt-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </Link>
            ))}
            {!relatedJobs.length && !relatedEvents.length && (
              <p className="text-sm text-muted-foreground">No related opportunities yet.</p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
