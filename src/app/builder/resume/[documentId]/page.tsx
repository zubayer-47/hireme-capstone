import { Resume } from "../_components/display";
import { ResumeForm } from "../_components/form";

export default function Home() {
  return (
    <>
      <article className="col-span-3">
        <ResumeForm />
      </article>
      <article className="col-span-3">
        <Resume />
      </article>
    </>
  );
}
