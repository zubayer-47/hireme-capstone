"use client";

import { useQuery } from "convex/react";
import { CTA } from "./_components/cta";
import { Hero } from "./_components/hero";
import { useRouter } from "next/navigation";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Features } from "./_components/features";
import { api } from "../../../convex/_generated/api";
import { Highlights } from "./_components/highlights";
import { useStoreUserEffect } from "@/hooks/use-store-user-effect";
import { BentoGridFeatures } from "./_components/bento-grid-features";

export default function Home() {
    const { isLoading, isAuthenticated } = useStoreUserEffect(); 
    const user = useQuery(api.users.getSelf);
    const route = useRouter();

    if (isAuthenticated) {
        route.push(`/feed/${user?._id}`)
    }

    return (
        <main className="w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <section className="max-w-6xl mx-auto">
                <Header isLoading={isLoading} isAuthenticated={isAuthenticated} />
                <Hero />
                <Features />
                <BentoGridFeatures />
                <Highlights />
                <CTA />
                <Footer />
            </section>
        </main>
    )
}