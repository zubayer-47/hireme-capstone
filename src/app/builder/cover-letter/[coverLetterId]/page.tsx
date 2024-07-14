import { CoverLetter } from "../_components/display";
import { CoverLetterForm } from "../_components/forms";

export default function CoverLetterBuilderPage() {

  return (
    <>
     
      <section className="relative grid grid-cols-3 md:grid-cols-6">
        <article className="col-span-3">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <CoverLetterForm />
          </div>
        </article>
        <article className="col-span-3 ">
            <CoverLetter />
        </article>
      </section>
    </>
  );
}

