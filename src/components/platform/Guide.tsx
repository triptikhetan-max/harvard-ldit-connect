import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Star, Shuffle, Printer, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { questions, pathwayQuestions, pathways, storyExample } from "@/data/mockData";
import { useDemo } from "./DemoContext";
import { PageTitle, CopyButton, Field, Empty } from "./Shared";
export function Guide({ pathway }: { pathway?: string | undefined }) {
  const d = useDemo();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [thought, setThought] = useState("");
  const [thoughts, setThoughts] = useState<string[]>([]);
  const all = [...questions, ...pathwayQuestions];
  const filtered = all.filter(
    (q) =>
      (!pathway || q.pathways.includes(pathway)) &&
      (!category || q.category === category) &&
      (!favoritesOnly || d.favorites.includes(q.id)),
  );
  const selected = all.filter((q) => d.selected.includes(q.id));
  const checklist = (id: string, items: string[]) =>
    items.map((t, i) => (
      <label className="check-row" key={t}>
        <input
          type="checkbox"
          checked={!!d.steps[`${id}-${i}`]}
          onChange={() => d.toggleStep(`${id}-${i}`)}
        />
        {t}
      </label>
    ));
  return (
    <div className="page-width pb-16">
      <PageTitle
        eyebrow="CURIOSITY OVER TRANSACTIONS"
        title="Coffee Chat Guide"
        description="Ask for a conversation, not a job. Listen closely, follow their energy, and leave room for something unexpected."
      />
      <div className="tips-band">
        <div>
          <p className="eyebrow">BEFORE</p>
          <h2 className="text-xl mt-2">Make it easy to say yes</h2>
          <p>
            Ask for 20 minutes, offer a few times, and read their profile. Choose 3–5 questions.
          </p>
        </div>
        <div>
          <p className="eyebrow">DURING</p>
          <h2 className="text-xl mt-2">Let curiosity lead</h2>
          <p>Share your story briefly, listen more than you talk, and respect the agreed time.</p>
        </div>
        <div>
          <p className="eyebrow">AFTER</p>
          <h2 className="text-xl mt-2">Keep the connection alive</h2>
          <p>Send a specific thank-you within 24 hours. Follow up in 4–6 weeks with an update.</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-[1fr_320px] gap-9 mt-9">
        <section>
          <div className="flex flex-wrap gap-3 mb-5">
            <Field label="Question category">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All categories</option>
                {[...new Set(all.map((q) => q.category))].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Pathway focus">
              <select
                value={pathway || ""}
                onChange={(e) =>
                  navigate({ to: "/guide", search: { pathway: e.target.value || undefined } })
                }
              >
                <option value="">All pathways</option>
                {pathways.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.short}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="flex flex-wrap gap-3 justify-between items-center mb-7">
            <Button
              variant={favoritesOnly ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFavoritesOnly((v) => !v)}
            >
              <Star />
              {favoritesOnly ? "Show all questions" : `Favorites (${d.favorites.length})`}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const pool = [...filtered];
                for (let i = pool.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  const left = pool[i],
                    right = pool[j];
                  if (left && right) {
                    pool[i] = right;
                    pool[j] = left;
                  }
                }
                d.setSelected(pool.slice(0, 5).map((q) => q.id));
              }}
              disabled={!filtered.length}
            >
              <Shuffle />
              Surprise me with 5
            </Button>
          </div>
          {[...new Set(filtered.map((q) => q.category))].map((c) => (
            <section className="mb-8" key={c}>
              <h2 className="text-2xl mb-3">{c}</h2>
              {filtered
                .filter((q) => q.category === c)
                .map((q) => (
                  <div className="question-row" key={q.id}>
                    <label className="flex gap-3 items-start flex-1">
                      <input
                        type="checkbox"
                        aria-label={`Add question: ${q.text}`}
                        checked={d.selected.includes(q.id)}
                        onChange={() =>
                          d.setSelected(
                            d.selected.includes(q.id)
                              ? d.selected.filter((v) => v !== q.id)
                              : [...d.selected, q.id],
                          )
                        }
                      />
                      <span className="text-sm leading-relaxed">{q.text}</span>
                    </label>
                    <Button
                      title={d.favorites.includes(q.id) ? "Remove favorite" : "Save favorite"}
                      aria-label={`${d.favorites.includes(q.id) ? "Unsave" : "Save"} ${q.text}`}
                      variant="ghost"
                      size="icon"
                      onClick={() => d.toggleFavorite(q.id)}
                    >
                      <Star
                        className={
                          d.favorites.includes(q.id) ? "fill-accent text-accent-foreground" : ""
                        }
                      />
                    </Button>
                    <CopyButton text={q.text} />
                  </div>
                ))}
            </section>
          ))}
          {!filtered.length && <Empty text="No saved questions in this selection yet." />}
        </section>
        <aside className="list-builder">
          <div className="lg:sticky lg:top-6">
            <h2 className="text-2xl">Build my list</h2>
            <p className="text-sm text-muted-foreground mt-2">
              {selected.length} questions selected
            </p>
            <ol className="list-decimal pl-5 space-y-4 text-sm mt-6">
              {selected.map((q) => (
                <li key={q.id}>{q.text}</li>
              ))}
            </ol>
            {!selected.length && (
              <p className="text-sm text-muted-foreground mt-6">
                Your selected questions will appear here.
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-6">
              <CopyButton
                text={selected.map((q, i) => `${i + 1}. ${q.text}`).join("\n")}
                label="Copy list"
              />
              <Button
                disabled={!selected.length}
                variant="outline"
                size="sm"
                onClick={() => window.print()}
              >
                <Printer />
                Print
              </Button>
            </div>
            <Button
              disabled={!selected.length}
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => d.setSelected([])}
            >
              Clear list
            </Button>
          </div>
        </aside>
      </div>
      <section className="guide-prep">
        <h2 className="text-3xl">Prepare your story & your space</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-7">
          <div>
            <h3 className="text-2xl">Know your story</h3>
            <p className="text-sm text-muted-foreground my-3">
              An invented example from Sofia, an LDIT student from Lima.
            </p>
            <blockquote className="quote text-sm">{storyExample}</blockquote>
            <CopyButton text={storyExample} />
            <h3 className="text-2xl mt-8">Pick 3 directions</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <strong>Learning experience design:</strong> talk to designers, redesign a lesson,
                and explain your decisions.
              </li>
              <li>
                <strong>Learning science research:</strong> meet lab managers and write a two-page
                study proposal.
              </li>
              <li>
                <strong>EdTech product:</strong> talk to product managers and create a learning-app
                teardown.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl mb-4">On Zoom</h3>
            {checklist("zoom", [
              "Quiet room; check fans, pets, and notifications",
              "Light facing you and camera at eye level",
              "Test audio, video, and internet 10 minutes before",
              "Full name displayed; notes and water ready",
              "Join 2–3 minutes early",
            ])}
            <h3 className="text-2xl mt-7 mb-4">In person</h3>
            {checklist("person", [
              "Choose a quiet café without loud music",
              "Arrive 10 minutes early",
              "Phone silent and out of sight",
              "Bring questions and offer to pay for coffee",
              "Wrap up at the agreed time",
            ])}
          </div>
        </div>
      </section>
      <section className="mt-10 max-w-2xl">
        <h2 className="text-3xl">Any questions or thoughts?</h2>
        <form
          className="mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!thought.trim()) return;
            setThoughts((v) => [thought.trim(), ...v]);
            setThought("");
          }}
        >
          <Field label="Share a question, tip, or win">
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              required
              maxLength={2000}
              rows={3}
            />
          </Field>
          <Button type="submit" className="mt-3">
            <Plus />
            Add thought
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Demo only · Thoughts are not published or saved after leaving this page.
          </p>
        </form>
        {thoughts.map((t, i) => (
          <p key={i} className="py-4 border-b border-border text-sm">
            {t}
          </p>
        ))}
      </section>
    </div>
  );
}
