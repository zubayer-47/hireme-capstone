"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Resume } from "../_components/display";
import { ResumeForm } from "../_components/form";
import { DocumentHeader } from "../../_components/browser/document-header";

export default function Home({ params }: { params: { resumeId: Id<"resume"> } }) {
  const resume = useQuery(api.resume.getResume, { resumeId: params.resumeId });

  if (!resume) return <></>;

  return (
    <>
      <DocumentHeader documentName={resume.documentName} resumeId={params.resumeId} />
      <section className="relative grid grid-cols-3 md:grid-cols-6">
        <article className="col-span-3">
          <div className="sticky top-0 h-screen overflow-y-auto">
          <ResumeForm resume={resume} />
          </div>
        </article>
        <article className="col-span-3 ">
          <Resume resumeDetails={resume} />
        </article>
      </section>
    </>
  );
}

