import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

type Post = { id: string; name: string | null; message: string; created_at: string };

const schema = z.object({
  name: z.string().trim().max(80, "Name must be under 80 characters"),
  message: z.string().trim().min(1, "Please write something").max(1000, "Keep it under 1000 characters"),
});

export function QuestionBox() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("community_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (data) setPosts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, message });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setError(null);
    setSending(true);
    const { error: err } = await supabase.from("community_posts").insert({
      name: parsed.data.name || null,
      message: parsed.data.message,
    });
    setSending(false);
    if (err) {
      setError("Couldn't post right now. Please try again.");
      return;
    }
    setMessage("");
    load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="space-y-3 rounded-lg border border-border bg-card p-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          maxLength={80}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question, share a tip, or tell us how a coffee chat went…"
          maxLength={1000}
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={sending}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-60"
        >
          {sending ? "Posting…" : "Post"}
        </button>
      </form>

      <ul className="space-y-3">
        {posts.length === 0 && (
          <li className="text-sm text-muted-foreground">No posts yet — be the first to share.</li>
        )}
        {posts.map((p) => (
          <li key={p.id} className="rounded-lg border border-border bg-card p-4">
            <p className="whitespace-pre-wrap">{p.message}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {p.name || "Anonymous"} · {new Date(p.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
