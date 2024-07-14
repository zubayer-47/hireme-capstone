"use client";

import { Id } from "@/convex/_generated/dataModel";
import { CoverLetter } from "../_components/display";
import { CoverLetterForm } from "../_components/forms";
import { DocumentHeader } from "../../_components/browser/document-header";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CoverLetterBuilderPage({ params } : { params: { coverLetterId: Id<"coverLetter"> }}) {
  const coverLetter = useQuery(api.coverLetter.getCoverLetter, { coverLetterId: params.coverLetterId });

  if (!coverLetter) return <></>;
  return (
    <>
      <DocumentHeader coverLetter={coverLetter} isResume={false} />
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

