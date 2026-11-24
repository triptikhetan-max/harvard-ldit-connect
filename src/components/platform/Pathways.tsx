import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pathways } from "@/data/mockData";
import { directoryAlumni } from "@/lib/networking";
import { useDemo } from "./DemoContext";
import { PageTitle, Tag } from "./Shared";
export function Pathways() {
  const d = useDemo();
  return (
    <div className="page-width pb-16">
      <PageTitle
        eyebrow="ONE PROGRAM. MANY POSSIBILITIES."
        title="LDIT pathways"
        description="There’s no single path after LDIT. Explore the roles, skills, and career stories that might shape your next chapter."
      />
      <div className="pathway-intro">
        <Compass className="size-8 text-primary" />
        <p className="font-display text-2xl">
          Learning science + design + technology
          <br />
          <span className="text-muted-foreground text-lg">
            A foundation you can take in many directions.
          </span>
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {pathways.map((p, i) => (
          <article className="pathway-card" key={p.id}>
            <span className="eyebrow">0{i + 1} / PATHWAY</span>
            <h2 className="text-3xl mt-3">{p.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">{p.description}</p>
            <h3 className="font-sans text-sm font-semibold mt-5">Typical roles</h3>
            <p className="text-sm text-muted-foreground mt-2">{p.roles.join(" · ")}</p>
            <h3 className="font-sans text-sm font-semibold mt-5">Example employers</h3>
            <p className="text-sm text-muted-foreground mt-2">{p.employers.join(" · ")}</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {p.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <h3 className="font-sans text-sm font-semibold mt-6 mb-3">Sample career trajectory</h3>
            <ol className="trajectory">
              {p.trajectory.map((t, n) => (
                <li key={t}>
                  <span>{n + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <h3 className="font-sans text-sm font-semibold mt-6">Meet alumni on this path</h3>
            <div className="flex flex-wrap gap-3 mt-3">
              {directoryAlumni(d.alums)
                .filter((a) => a.pathways.includes(p.id))
                .map((a) => (
                  <Link
                    key={a.id}
                    to="/alumni/$id"
                    params={{ id: a.id }}
                    className="text-sm text-primary underline"
                  >
                    {a.name}
                  </Link>
                ))}
            </div>
            <Button variant="link" asChild className="p-0 mt-5">
              <Link to="/alumni" search={{ pathway: p.id }}>
                Explore this pathway <ArrowRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
