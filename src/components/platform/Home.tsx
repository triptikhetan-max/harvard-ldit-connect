import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Users,
  Briefcase,
  Calendar,
  Coffee,
  Compass,
  BookOpen,
  UserRound,
} from "lucide-react";
import campus from "@/assets/harvard-widener-library.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { useDemo } from "./DemoContext";
import { AlumCard } from "./Shared";
import { commonalities, directoryAlumni } from "@/lib/networking";
import { publicAsset } from "@/lib/public-asset";
const quickLinks = [
  { to: "/alumni", title: "Find your people", text: "Explore the alumni directory", icon: Users },
  {
    to: "/jobs",
    title: "Your next chapter",
    text: "Discover jobs & research roles",
    icon: Briefcase,
  },
  { to: "/events", title: "Meet in the moment", text: "Join community events", icon: Calendar },
  {
    to: "/guide",
    title: "Make it a good conversation",
    text: "Prepare for a coffee chat",
    icon: Coffee,
  },
  {
    to: "/pathways",
    title: "Explore where LDIT leads",
    text: "See pathways & career stories",
    icon: Compass,
  },
  {
    to: "/resources",
    title: "Put your best work forward",
    text: "Browse career resources",
    icon: BookOpen,
  },
  { to: "/profile", title: "Bring your whole story", text: "Update your profile", icon: UserRound },
] as const;
export function Home() {
  const d = useDemo();
  const picks = directoryAlumni(d.alums)
    .sort(
      (a, b) =>
        commonalities(d.student, b).reduce((v, o) => v + o.score, 0) -
        commonalities(d.student, a).reduce((v, o) => v + o.score, 0),
    )
    .slice(0, 3);
  return (
    <>
      <section className="home-hero">
        <img
          src={publicAsset(campus.url)}
          width={1600}
          height={912}
          alt="Widener Library at Harvard University in Cambridge, Massachusetts"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="page-width relative py-16 md:py-20">
          <p className="eyebrow text-ink-foreground">THE LDIT COMMUNITY, CONNECTED</p>
          <h1 className="hero-title">LDIT Connect</h1>
          <p className="text-2xl font-display mt-4 max-w-md">
            Your next chapter starts
            <br />
            with a conversation.
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-foreground/90">
            Find alumni who share your interests, explore where LDIT can take you, and build
            connections that last beyond Harvard.
          </p>
          <Button asChild className="mt-7" size="lg">
            <Link to="/alumni">
              Meet the alumni <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
      <p className="page-width text-xs text-muted-foreground pt-2">
        Photo:{" "}
        <a
          href="https://commons.wikimedia.org/wiki/File:Widener_Library,_Harvard_University,_Cambridge_MA.jpg"
          className="underline"
        >
          John Phelan / Wikimedia Commons
        </a>{" "}
        ·{" "}
        <a href="https://creativecommons.org/licenses/by/3.0/" className="underline">
          CC BY 3.0
        </a>{" "}
        · Cropped for display
      </p>
      <section className="page-width py-12">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-7">
          <div>
            <p className="eyebrow">START WITH A SHARED CONNECTION</p>
            <h2 className="text-3xl mt-2">A few people you might click with</h2>
          </div>
          <Link to="/alumni" className="text-sm text-primary flex items-center gap-2">
            Explore all alumni <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {picks.map((a) => (
            <AlumCard
              key={a.id}
              alum={a}
              match={`Shared interest: ${commonalities(d.student, a)[0]?.label}`}
            />
          ))}
        </div>
      </section>
      <section className="bg-muted border-y border-border">
        <div className="page-width py-12">
          <p className="eyebrow">MAKE YOUR NEXT MOVE</p>
          <h2 className="text-3xl mt-2 mb-7">More ways to connect and grow</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-8">
            {quickLinks.map((q) => (
              <Link key={q.to} to={q.to} className="quick-link">
                <q.icon className="size-6 text-primary mb-4" />
                <h3 className="text-xl">{q.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 flex gap-2 items-center">
                  {q.text}
                  <ArrowRight className="size-4 shrink-0" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
