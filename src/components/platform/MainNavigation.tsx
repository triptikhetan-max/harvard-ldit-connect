import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const primaryLinks = [
  ["/", "Home"],
  ["/alumni", "Alumni"],
  ["/find-your-alum", "Find Your Alum"],
] as const;

const groups = [
  {
    label: "Explore",
    links: [
      ["/jobs", "Jobs"],
      ["/events", "Events"],
      ["/pathways", "LDIT Pathways"],
    ],
  },
  {
    label: "Prepare",
    links: [
      ["/guide", "Coffee Chat Guide"],
      ["/playbook", "Networking Playbook"],
      ["/practice", "First Hello"],
      ["/resources", "Resources"],
    ],
  },
] as const;

export function MainNavigation() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Main navigation"
      className="page-width flex flex-wrap items-center gap-x-5 sm:gap-x-8"
    >
      {primaryLinks.map(([to, label]) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: to === "/" }}
          activeProps={{ className: "nav-link active" }}
          className="nav-link"
        >
          {label}
        </Link>
      ))}
      {groups.map(({ label, links }) => (
        <DropdownMenu key={label}>
          <DropdownMenuTrigger
            className={`nav-link flex items-center gap-1 ${links.some(([to]) => pathname === to || pathname.startsWith(`${to}/`)) ? "active" : ""}`}
          >
            {label}
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-52">
            {links.map(([to, name]) => (
              <DropdownMenuItem key={to} asChild className="py-3 text-sm cursor-pointer">
                <Link to={to} activeProps={{ "aria-current": "page", className: "bg-accent" }}>
                  {name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  );
}
