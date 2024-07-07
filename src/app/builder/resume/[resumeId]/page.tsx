"use client";

import { Id } from "@/convex/_generated/dataModel";

import { Resume } from "../_components/display";
import { ResumeForm } from "../_components/form";
import { DocumentHeader } from "../../_components/document-header";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Home({ params }: { params: { resumeId: Id<"resume"> } }) {
  console.log(params.resumeId)
  const resume = useQuery(api.resume.getResume, { resumeId: params.resumeId });
  

  if (!resume) return <LoadingSpinner />;

  return (
    <>
      <DocumentHeader documentName={resume.documentName} resumeId={params.resumeId} />
      <section className="grid grid-cols-3 md:grid-cols-6">
        <article className="col-span-3">
          <ResumeForm resume={resume} />
        </article>
        <article className="col-span-3">
          <Resume />
        </article>
      </section>
    </>
  );
}

