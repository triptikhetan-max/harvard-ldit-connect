import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Plus,
  CalendarDays,
  List,
  ChevronLeft,
  ChevronRight,
  Check,
  Download,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type NetworkEvent } from "@/data/mockData";
import { canPost } from "@/lib/networking";
import { useDemo } from "./DemoContext";
import { PageTitle, Filter, Tag, Field, Empty } from "./Shared";
function addCalendar(e: NetworkEvent) {
  const start = e.date.replace(/[-:]/g, "");
  const content = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nUID:${e.id}@ldit-demo\r\nDTSTAMP:${new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(
      /\.\d{3}/,
      "",
    )}\r\nDTSTART:${start}\r\nSUMMARY:${e.title.replace(/[,;]/g, " ")}\r\nLOCATION:${e.location.replace(/[,;]/g, " ")}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  const url = URL.createObjectURL(new Blob([content], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "ldit-event.ics";
  a.click();
  URL.revokeObjectURL(url);
}
export function Events() {
  const d = useDemo();
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [view, setView] = useState("List");
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [posting, setPosting] = useState(false);
  const [status, setStatus] = useState("");
  const now = new Date();
  const filtered = d.eventList
    .filter(
      (e) =>
        (!type || e.type === type) &&
        (!from || e.date.slice(0, 10) >= from) &&
        (!to || e.date.slice(0, 10) <= to),
    )
    .sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = filtered.filter((e) => new Date(e.date) >= now),
    past = filtered.filter((e) => new Date(e.date) < now);
  function post(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canPost(d.role)) return;
    const f = new FormData(e.currentTarget);
    const date = String(f.get("date"));
    if (!Number.isFinite(new Date(date).getTime())) return;
    d.addEvent({
      id: crypto.randomUUID(),
      title: String(f.get("title")),
      date,
      location: String(f.get("location")),
      type: String(f.get("type")),
      host: String(f.get("host")),
      description: String(f.get("description")),
      alumIds: d.myAlum.optedIn ? [d.myAlum.id] : [],
    });
    setPosting(false);
    setType("");
    setFrom("");
    setTo("");
    setStatus("Your event has been added for this demo session.");
  }
  const card = (e: NetworkEvent) => {
    const old = new Date(e.date) < now;
    return (
      <article key={e.id} className="event-card">
        <div className="event-date">
          <span>{new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</span>
          <strong>{new Date(e.date).getDate()}</strong>
        </div>
        <div className="flex-1 min-w-0">
          <Tag>{e.type}</Tag>
          <h2 className="text-2xl mt-3">{e.title}</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {new Date(e.date).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}{" "}
            · local time
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
            <MapPin className="size-3" />
            {e.location} · Hosted by {e.host}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">{e.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {!old && (
              <Button
                size="sm"
                variant={d.going.includes(e.id) ? "secondary" : "default"}
                onClick={() => d.toggleGoing(e.id)}
              >
                {d.going.includes(e.id) ? <Check /> : <CalendarDays />}
                {d.going.includes(e.id) ? "You're going" : "RSVP"}
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => addCalendar(e)}>
              <Download />
              Add to calendar
            </Button>
            {e.alumIds.slice(0, 2).map((id) => {
              const a = d.alums.find((a) => a.id === id && a.optedIn);
              return a ? (
                <Button key={id} asChild variant="link" size="sm">
                  <Link to="/alumni/$id" params={{ id }}>
                    {a.name}
                  </Link>
                </Button>
              ) : null;
            })}
          </div>
        </div>
      </article>
    );
  };
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(),
    offset = month.getDay();
  return (
    <div className="page-width pb-16">
      <PageTitle
        eyebrow="COME TOGETHER"
        title="Community events"
        description="New perspectives, familiar faces, and conversations worth making time for."
        action={
          canPost(d.role) && (
            <Button onClick={() => setPosting((v) => !v)}>
              <Plus />
              {posting ? "Close form" : "Post an event"}
            </Button>
          )
        }
      />
      {posting && canPost(d.role) && (
        <form className="posting-form" onSubmit={post}>
          <h2 className="text-2xl mb-5">Bring the community together</h2>
          <div className="form-grid">
            {[
              ["title", "Event title"],
              ["host", "Host"],
              ["location", "Location or Virtual"],
            ].map(([name, label]) => (
              <Field key={name} label={label || "Details"}>
                <input name={name || "field"} required />
              </Field>
            ))}
            <Field label="Date and time">
              <input name="date" type="datetime-local" required />
            </Field>
            <Field label="Event type">
              <select name="type">
                {["Info session", "Panel", "Networking", "Workshop", "Speaker", "Social"].map(
                  (v) => (
                    <option key={v}>{v}</option>
                  ),
                )}
              </select>
            </Field>
          </div>
          <Field label="Description">
            <textarea name="description" required rows={3} />
          </Field>
          <Button type="submit" className="mt-4">
            Add event
          </Button>
        </form>
      )}
      {status && (
        <p role="status" className="text-success mb-4">
          {status}
        </p>
      )}
      <div className="flex flex-wrap justify-between items-end gap-4 border-b border-border pb-6">
        <div className="flex flex-wrap gap-4">
          <Filter
            label="Event type"
            value={type}
            onChange={setType}
            options={["Info session", "Panel", "Networking", "Workshop", "Speaker", "Social"]}
          />
          <Field label="From date">
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </Field>
          <Field label="To date">
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} min={from} />
          </Field>
        </div>
        <div className="segmented">
          <Button
            variant={view === "List" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("List")}
          >
            <List />
            List
          </Button>
          <Button
            variant={view === "Calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("Calendar")}
          >
            <CalendarDays />
            Calendar
          </Button>
        </div>
      </div>
      {view === "List" ? (
        <>
          <h2 className="text-2xl py-7">Upcoming events</h2>
          <div className="space-y-5">{upcoming.map(card)}</div>
          {!upcoming.length && <Empty text="No upcoming events in this date range." />}
          {past.length > 0 && (
            <>
              <h2 className="text-2xl mt-12 mb-6">Past events</h2>
              <div className="space-y-5">{past.reverse().map(card)}</div>
            </>
          )}
        </>
      ) : (
        <section className="mt-7">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl">
              {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                aria-label="Previous month"
                title="Previous month"
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label="Next month"
                title="Next month"
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((v) => (
              <div className="calendar-heading" key={v}>
                {v}
              </div>
            ))}
            {Array.from({ length: offset }, (_, i) => (
              <div key={`empty-${i}`} className="calendar-cell empty" />
            ))}
            {Array.from({ length: days }, (_, i) => {
              const date = i + 1;
              const es = filtered.filter((e) => {
                const v = new Date(e.date);
                return (
                  v.getFullYear() === month.getFullYear() &&
                  v.getMonth() === month.getMonth() &&
                  v.getDate() === date
                );
              });
              return (
                <div key={date} className="calendar-cell">
                  <span className="text-xs">{date}</span>
                  {es.map((e) => (
                    <a href={`#${e.id}`} className="calendar-event" key={e.id}>
                      {e.title}
                    </a>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="mt-7 space-y-5">
            {filtered
              .filter(
                (e) =>
                  new Date(e.date).getMonth() === month.getMonth() &&
                  new Date(e.date).getFullYear() === month.getFullYear(),
              )
              .map((e) => (
                <div id={e.id} key={e.id} className="scroll-mt-5">
                  {card(e)}
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
