import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import hgseLogo from "@/assets/hgse-logo.svg.asset.json";
import { Button } from "@/components/ui/button";
import { useDemo } from "./DemoContext";
import { MainNavigation } from "./MainNavigation";
import { publicAsset } from "@/lib/public-asset";
export function Shell({ children }: { children: React.ReactNode }) {
  const { role, setRole } = useDemo();
  return (
    <>
      <div className="institution-bar">
        <div className="page-width flex items-center justify-between gap-3">
          <span>HARVARD GRADUATE SCHOOL OF EDUCATION</span>
          <span className="hidden sm:inline">Learning Design, Innovation & Technology</span>
        </div>
      </div>
      <header className="site-header">
        <div className="page-width flex flex-wrap justify-between gap-4 items-center py-5">
          <Link
            to="/"
            className="flex flex-wrap items-center gap-4"
            aria-label="HGSE LDIT Connect home"
          >
            <img
              src={publicAsset(hgseLogo.url)}
              alt="Harvard Graduate School of Education"
              className="hgse-logo"
              width={442}
              height={36}
            />
            <span className="font-display text-2xl">
              LDIT <span className="text-primary">Connect</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              className="text-sm text-primary px-2 py-2 rounded focus-visible:outline-2"
            >
              My Profile
            </Link>
            <span className="text-xs text-muted-foreground hidden sm:inline">Viewing as</span>
            <div className="segmented">
              {(["Student", "Alum"] as const).map((r) => (
                <Button
                  key={r}
                  size="sm"
                  variant={role === r ? "default" : "ghost"}
                  onClick={() => setRole(r)}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <MainNavigation />
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="page-width flex flex-wrap justify-between gap-5">
          <div>
            <p className="font-display text-xl">LDIT Connect</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A community of learners. A world of possibilities.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Class project prototype</p>
            <p className="mt-2">
              Demo profiles and opportunities are labeled · Unofficial HGSE concept
            </p>
          </div>
          <Link to="/guide" className="text-sm flex items-center gap-2 text-primary">
            Start a conversation <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </footer>
    </>
  );
}
