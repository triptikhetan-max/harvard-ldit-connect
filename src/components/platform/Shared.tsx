import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Copy, MapPin, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pathways, type Alum } from "@/data/mockData";
export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | LDIT Connect` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | LDIT Connect` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
export function PageTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="text-muted-foreground max-w-2xl mt-4 leading-relaxed">{description}</p>
      </div>
      {action}
    </header>
  );
}
export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setError(false);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          setError(true);
        }
      }}
    >
      {copied ? <Check /> : <Copy />}
      {error ? "Select and copy manually" : copied ? "Copied" : label}
    </Button>
  );
}
export function AlumCard({ alum, match }: { alum: Alum; match?: string | undefined }) {
  return (
    <Link to="/alumni/$id" params={{ id: alum.id }} className="alum-card group">
      <div className="flex justify-between items-start">
        <span className="avatar">
          {alum.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary" />
      </div>
      <h3 className="mt-5 text-2xl">{alum.name}</h3>
      <p className="text-sm mt-2 font-medium">{alum.role}</p>
      <p className="text-sm text-muted-foreground mt-1">{alum.company}</p>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-4">
        {alum.location && (
          <span className="flex gap-1 items-center">
            <MapPin className="size-3" />
            {alum.location}
          </span>
        )}
        <span>LDIT ’{String(alum.cohort).slice(2)}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {alum.pathways.map((id) => (
          <Tag key={id}>{pathways.find((p) => p.id === id)?.short}</Tag>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-border text-xs text-success flex gap-2 items-center">
        {alum.openTo.includes("Coffee chats") ? (
          <>
            <Coffee className="size-4" />
            Open to coffee chats
          </>
        ) : (
          <span>Meet your LDIT community</span>
        )}
      </div>
      {match && <p className="text-xs text-primary mt-2">{match}</p>}
    </Link>
  );
}
export function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="filter-label">
      {label}
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All {label.toLowerCase()}</option>
        {options.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
    </label>
  );
}
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
export function Empty({ text }: { text: string }) {
  return (
    <div className="py-16 text-center border-y border-border text-muted-foreground">{text}</div>
  );
}
