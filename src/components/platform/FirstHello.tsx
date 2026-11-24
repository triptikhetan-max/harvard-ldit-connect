import template from "@/data/first-hello.html?raw";
import { firstHelloData } from "@/data/mockData";
import { PageTitle } from "./Shared";

// Keep the uploaded activity isolated: its authored scripts use their own DOM.
const document = template.replace(
  "__FIRST_HELLO_DATA__",
  JSON.stringify(firstHelloData).replace(/</g, "\\u003c"),
);

export function FirstHello() {
  return (
    <>
      <div className="page-width">
        <PageTitle
          eyebrow="LDIT · STUDENT PRACTICE"
          title="First Hello"
          description="A little curiosity goes a long way."
        />
      </div>
      <section aria-label="First Hello networking practice">
        <iframe
          title="First Hello student networking practice"
          srcDoc={document}
          sandbox="allow-scripts allow-same-origin"
          className="practice-frame"
        />
      </section>
    </>
  );
}
