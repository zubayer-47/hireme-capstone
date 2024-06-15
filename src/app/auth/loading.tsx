"use client";

import { Loader } from "@/components/loader";

export default function Loading() {
    return (
        <section className="h-full w-full flex items-center justify-center">  
            <Loader />
        </section>
    )
}