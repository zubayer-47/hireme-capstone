import { DocumentHeader } from "../../_components/document-header";
import { Resume } from "../_components/display";
import { ResumeForm } from "../_components/form";

export default function Home() {
  return (
    <main className="relative h-full w-full bg-background">
      <DocumentHeader documentName="Untitled" />
      <section className="grid grid-cols-3 md:grid-cols-6">
        <article className="col-span-3">
          <ResumeForm />
        </article>
        <article className="col-span-3">
          <Resume />
        </article>
      </section>
    </main>
  );
}
