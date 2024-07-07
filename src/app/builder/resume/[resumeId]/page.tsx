"use client";

import { Id } from "@/convex/_generated/dataModel";

import { Resume } from "../_components/display";
import { ResumeForm } from "../_components/form";
import { DocumentHeader } from "../../_components/document-header";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home({ params }: { params: { resumeId: Id<"resume"> } }) {
  console.log(params.resumeId)
  const resume = useQuery(api.resume.getResume, { resumeId: params.resumeId });

  if (!resume) return <></>

  return (
    <>
      <DocumentHeader documentName={resume.documentName} />
      <section className="grid grid-cols-3 md:grid-cols-6">
        <article className="col-span-3">
          <ResumeForm />
        </article>
        <article className="col-span-3">
          <Resume />
        </article>
      </section>
    </>
  );
}
