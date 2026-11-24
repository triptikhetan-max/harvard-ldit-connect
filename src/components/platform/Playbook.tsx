import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDemo } from "./DemoContext";
import { CopyButton, Field, PageTitle } from "./Shared";
const sections = [
  { id: "mindset", label: "Mindset" },
  { id: "linkedin", label: "LinkedIn Search" },
  { id: "outreach", label: "Outreach" },
  { id: "setup", label: "Your Space" },
  { id: "questions", label: "Questions" },
  { id: "followup", label: "Follow-up" },
];

function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-16">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">{num}</p>
      <h2 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">{title}</h2>
      <div className="mt-8 space-y-6 text-lg leading-relaxed">{children}</div>
    </section>
  );
}

function Checklist({ storageKey, items }: { storageKey: string; items: string[] }) {
  const d = useDemo();
  return (
    <ul>
      {items.map((item, i) => (
        <li key={item}>
          <label className="check-row">
            <input
              type="checkbox"
              checked={!!d.steps[`playbook-${storageKey}-${i}`]}
              onChange={() => d.toggleStep(`playbook-${storageKey}-${i}`)}
            />
            {item}
          </label>
        </li>
      ))}
    </ul>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border py-6">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="mt-3 text-base leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function Template({ children }: { children: string }) {
  return (
    <div className="bg-ink p-6 text-ink-foreground">
      <p className="whitespace-pre-wrap mb-4">{children}</p>
      <CopyButton text={children} />
    </div>
  );
}

const questions: { group: string; qs: string[] }[] = [
  {
    group: "Their path",
    qs: [
      "How did you get from LDIT (or your program) to your current role?",
      "What surprised you most about the transition from grad school to this work?",
      "Which HGSE courses or projects turned out to matter most in your career?",
    ],
  },
  {
    group: "The work itself",
    qs: [
      "What does a typical week look like for you?",
      "What problems is your team trying to solve right now?",
      "Which skills (design, research, data, facilitation, tech) do you use most?",
      "How does your organization measure learning impact?",
    ],
  },
  {
    group: "Breaking in",
    qs: [
      "What do strong candidates for roles like yours usually have in their portfolio?",
      "How do people typically get hired on your team: postings, referrals, contract work?",
      "If you were in my position today, what would you do this semester?",
      "Are there research labs, projects or RA positions you'd recommend I look into?",
    ],
  },
  {
    group: "Closing",
    qs: [
      "Is there anyone else you think I should talk to?",
      "Would it be okay to keep you posted on how things go?",
      "Is there anything I can help you with?",
    ],
  },
];

export function Playbook() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-6 overflow-x-auto px-6 py-3 text-sm">
          <span className="font-display font-semibold text-primary whitespace-nowrap">
            LDIT Playbook
          </span>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap text-muted-foreground hover:text-primary"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="page-width">
        <PageTitle
          eyebrow="HARVARD GRADUATE SCHOOL OF EDUCATION · LDIT"
          title="The Networking Playbook"
          description="A step-by-step guide to connect with alums and professionals, and turn conversations into jobs and research opportunities."
        />
        <Section id="mindset" num="01" title="Start with the right mindset">
          <p>
            Networking is not asking for a job. It's learning from people whose work you admire,
            building relationships, and letting opportunities come from trust. Aim for curiosity,
            not transactions.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="Know your story">
              A 30-second intro: who you are, what you studied before, what LDIT problems excite
              you, and what you're exploring.
            </Card>
            <Card title="Pick 3 directions">
              e.g. EdTech product, learning experience design, research labs. Focus makes your asks
              clear.
            </Card>
            <Card title="Track everything">
              Keep a simple spreadsheet: name, role, how you found them, date contacted, notes, next
              step.
            </Card>
          </div>

          <h3 className="pt-8 text-2xl font-semibold">Example: know your story</h3>
          <p className="text-base text-muted-foreground">
            Here's a fictional one for "Sofia", an LDIT student who studied industrial engineering
            in Lima before coming to HGSE. Keep yours to about 30 seconds, then hand the floor over
            with a question.
          </p>
          <Template>{`Hi, I'm Sofia — I'm in the LDIT master's program at HGSE. Before Harvard I studied industrial engineering in Lima and spent two years running training programs at a bank, mostly for staff who had never used the systems we were rolling out. Watching people learn under real constraints is what pulled me into this field. Right now I'm exploring learning experience design and how AI tools can support teachers instead of replacing them. I'm trying to figure out what my first role after graduation could look like, and I'd love to hear how you found your way into this work.`}</Template>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="What makes it work">
              <ul className="list-disc space-y-2 pl-5">
                <li>One line on where you came from, no résumé recital.</li>
                <li>A real problem you care about, with a short story behind it.</li>
                <li>What you're exploring now, said honestly.</li>
                <li>It ends by handing the floor to them.</li>
              </ul>
            </Card>
            <Card title="Tweak it for the room">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Research labs:</strong> "I'm exploring how we measure learning that isn't
                  a test score, and I'd love to see how your team designs studies."
                </li>
                <li>
                  <strong>EdTech product:</strong> "I want to be close to the decisions about what
                  gets built for teachers, and I'd love to hear how you got there."
                </li>
                <li>
                  <strong>L&D in a company:</strong> "I'm curious how adult learning works outside
                  school, and what you'd have wanted to know before you started."
                </li>
              </ul>
            </Card>
          </div>

          <h3 className="pt-8 text-2xl font-semibold">Example: pick 3 directions</h3>
          <p className="text-base text-muted-foreground">
            Sofia's shortlist. Each direction names the kinds of roles to aim at, the people to talk
            to, and one small thing to make this semester, so the ask is always concrete.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="1 · Learning experience design">
              <p>
                <strong>Roles:</strong> LX designer, instructional designer, curriculum designer at
                an edtech company or bootcamp.
              </p>
              <p className="mt-2">
                <strong>Talk to:</strong> HGSE alums with "designer" in their headline at companies
                like Duolingo, Coursera or a design studio.
              </p>
              <p className="mt-2">
                <strong>Make this semester:</strong> redesign one lesson you actually taught, and
                write up the before, after and why.
              </p>
            </Card>
            <Card title="2 · Learning science research">
              <p>
                <strong>Roles:</strong> research assistant or coordinator in a university or company
                research lab.
              </p>
              <p className="mt-2">
                <strong>Talk to:</strong> HGSE and MIT lab managers, plus LDIT students who were RAs
                last year.
              </p>
              <p className="mt-2">
                <strong>Make this semester:</strong> one two-page memo on a study you'd run, with
                the sample and the measure spelled out.
              </p>
            </Card>
            <Card title="3 · EdTech product">
              <p>
                <strong>Roles:</strong> product manager or associate PM at an education company, or
                product operations.
              </p>
              <p className="mt-2">
                <strong>Talk to:</strong> product managers who came from teaching, grad school or
                analytics rather than a PM title.
              </p>
              <p className="mt-2">
                <strong>Make this semester:</strong> a short teardown of one learning app: the
                problem, the flow, and what you'd change.
              </p>
            </Card>
          </div>
          <p className="text-base text-muted-foreground">
            Keep a fourth direction as a backup, and drop one the moment a conversation tells you it
            isn't for you.
          </p>
        </Section>

        <Section id="linkedin" num="02" title="Find the right people on LinkedIn">
          <p>
            Use LinkedIn search filters (click "All filters" after any search) to find alums and
            practitioners.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Filter by school">
              Search "People", then in filters set{" "}
              <strong>School: Harvard Graduate School of Education</strong>. Add keywords like
              "learning design" or "LDIT".
            </Card>
            <Card title="Use the Alumni tool">
              Go to the HGSE school page → <strong>Alumni</strong> tab. Filter by where they live,
              where they work, and what they do.
            </Card>
            <Card title="Filter by company">
              Add <strong>Current company</strong> (e.g. Coursera, Duolingo, Khan Academy, Google)
              to see HGSE alums there.
            </Card>
            <Card title="Prioritize 2nd connections">
              Set <strong>Connections: 2nd</strong> to find people a classmate or professor can
              introduce you to.
            </Card>
          </div>
          <h3 className="pt-4 text-2xl font-semibold">Boolean search strings</h3>
          <p className="text-base text-muted-foreground">
            Paste these into the LinkedIn search bar, then filter by school.
          </p>
          <div className="space-y-3">
            {[
              '"learning designer" OR "instructional designer" OR "learning experience designer"',
              '("learning scientist" OR "UX researcher") AND (edtech OR education)',
              '"research assistant" OR "research coordinator" AND "learning sciences"',
              '"product manager" AND (edtech OR "education technology") NOT intern',
            ].map((s) => (
              <code key={s} className="block rounded-md bg-muted p-4 text-sm">
                {s}
              </code>
            ))}
          </div>
          <p className="text-base text-muted-foreground">
            Tip: quotes = exact phrase, OR = either term, AND = both, NOT = exclude. Also check the
            HGSE alumni directory and Harvard Career Services for contacts not active on LinkedIn.
          </p>
        </Section>

        <Section id="outreach" num="03" title="Reach out">
          <p>
            Keep messages short, specific, and easy to say yes to. Ask for 20 minutes, not a job.
          </p>
          <Template>{`Hi [Name], I'm a current LDIT student at HGSE and came across your work as a [role] at [Company]. I'm exploring careers in [area] and would love to hear about your path. Would you be open to a 20-minute chat in the next couple of weeks? Thank you! — [Your name]`}</Template>
          <p className="text-base text-muted-foreground">
            No response after a week? Send one polite follow-up. Then move on, no hard feelings.
          </p>
        </Section>

        <Section id="setup" num="04" title="Set up your space">
          <p>
            First impressions happen before you say a word. Check this list before every meeting.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-t border-border py-6">
              <h3 className="text-2xl font-semibold">On Zoom</h3>
              <div className="mt-4 text-base">
                <Checklist
                  storageKey="zoom"
                  items={[
                    "Quiet room: close windows, silence phone, let roommates know",
                    "Check for background noise (fans, AC, pets, notifications)",
                    "Light facing you, not behind you",
                    "Camera at eye level, clean and neutral background",
                    "Test audio, video, and internet 10 minutes before",
                    "Close extra tabs and turn off notifications",
                    "Display name set to your full name",
                    "Notes, questions, and water within reach",
                    "Join 2–3 minutes early",
                  ]}
                />
              </div>
            </div>
            <div className="border-t border-border py-6">
              <h3 className="text-2xl font-semibold">In person</h3>
              <div className="mt-4 text-base">
                <Checklist
                  storageKey="person"
                  items={[
                    "Choose a quiet café or spot near them, without loud music",
                    "Visit or check the place ahead of time if possible",
                    "Arrive 10 minutes early and grab a table",
                    "Phone on silent and out of sight",
                    "Dress business casual",
                    "Bring a notebook and your questions",
                    "Offer to pay for their coffee",
                    "Respect the time: wrap up when you said you would",
                  ]}
                />
              </div>
            </div>
          </div>
        </Section>

        <Section id="questions" num="05" title="Coffee chat questions">
          <p>Pick 4–6. Listen more than you talk, and follow their energy.</p>
          <div className="grid gap-4 md:grid-cols-2">
            {questions.map((g) => (
              <Card key={g.group} title={g.group}>
                <ul className="list-disc space-y-2 pl-5">
                  {g.qs.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="followup" num="06" title="Follow up and stay in touch">
          <ol className="list-decimal space-y-3 pl-6">
            <li>Send a thank-you within 24 hours, mentioning one specific thing you learned.</li>
            <li>Act on their advice, then tell them you did. People love seeing impact.</li>
            <li>Reach out to anyone they introduced you to, and mention who referred you.</li>
            <li>Check in every 2–3 months with an update, article, or congratulations.</li>
            <li>
              When a role or research position opens, ask if they'd be comfortable referring you.
            </li>
          </ol>
          <Template>{`Hi [Name], thank you so much for your time today. Your advice about [specific point] was really helpful, and I'm going to [action]. I'll keep you posted! — [Your name]`}</Template>
        </Section>

        <Section id="community" num="07" title="Questions & thoughts">
          <Thoughts />
        </Section>
      </div>
    </div>
  );
}
function Thoughts() {
  const d = useDemo();
  const [text, setText] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          d.addThought(text.trim());
          setText("");
        }}
      >
        <Field label="Share a question, tip, or win">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            maxLength={2000}
            rows={3}
          />
        </Field>
        <Button type="submit" className="mt-3">
          Add thought
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Demo only · Thoughts stay in this visit and are not published.
        </p>
      </form>
      {d.thoughts.map((t, i) => (
        <p key={i} className="border-b border-border py-4 text-sm">
          {t}
        </p>
      ))}
    </>
  );
}
