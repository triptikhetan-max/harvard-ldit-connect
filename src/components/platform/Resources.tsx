import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, ExternalLink, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "./DemoContext";
import { PageTitle, Field } from "./Shared";
export function Resources() {
  const d = useDemo();
  const [status, setStatus] = useState("");
  return (
    <div className="page-width pb-16">
      <PageTitle
        eyebrow="KEEP LEARNING, KEEP GROWING"
        title="Career resources"
        description="A starting point for stronger portfolios, thoughtful career decisions, and communities that support your work."
      />
      <Link to="/find-your-alum" className="quick-link mb-6 block">
        <Sparkles className="size-6 text-primary mb-4" />
        <h3 className="text-xl">Find Your Alum</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
          Pick a role, search the Harvard directory and LinkedIn, choose one person, and draft a
          thoughtful first message. Your progress stays in your browser.
        </p>
      </Link>
      <Link to="/practice" className="quick-link mb-10 block">
        <Sparkles className="size-6 text-primary mb-4" />
        <h3 className="text-xl">Practice before you reach out: First Hello</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
          A short, low-stakes drill for your first networking conversation. Two or three students,
          five or six minutes, fictional alumni profiles, and a shared countdown.
        </p>
      </Link>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
        {[...new Set(d.resourceList.map((r) => r.category))].map((c) => (
          <section key={c} className="resource-section">
            <h2 className="text-2xl border-b border-border pb-4">{c}</h2>
            {d.resourceList
              .filter((r) => r.category === c)
              .map((r, i) => (
                <article key={r.title + i} className="py-5">
                  <BookOpen className="size-5 text-primary mb-3" />
                  <h3 className="text-xl">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {r.description}
                  </p>
                  <Button asChild size="sm" variant="link" className="p-0 mt-3">
                    <a
                      href="https://example.com/ldit-sample-resource"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open sample link <ExternalLink />
                    </a>
                  </Button>
                </article>
              ))}
          </section>
        ))}
      </div>
      <section className="border-t border-border mt-10 pt-9 max-w-2xl">
        <h2 className="text-3xl">Something worth sharing?</h2>
        <form
          className="space-y-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            d.addResource({
              title: String(f.get("title")),
              category: String(f.get("category")),
              description: String(f.get("description")),
            });
            e.currentTarget.reset();
            setStatus("Resource suggestion added for this demo session.");
          }}
        >
          <Field label="Resource title">
            <input name="title" required maxLength={150} />
          </Field>
          <Field label="Category">
            <select name="category">
              {[...new Set(d.resourceList.map((r) => r.category))].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Why is it useful?">
            <textarea name="description" rows={3} required maxLength={1000} />
          </Field>
          <Button type="submit">
            <Plus />
            Suggest a resource
          </Button>
          <p className="text-xs text-muted-foreground">Sample links and demo suggestions only.</p>
          {status && (
            <p role="status" className="text-success text-sm">
              {status}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
