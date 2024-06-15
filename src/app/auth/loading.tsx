"use client";

import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
    return (
        <section className="h-full w-full flex items-center justify-center mx-auto">  
            <LoadingSpinner />
        </section>
    )
}