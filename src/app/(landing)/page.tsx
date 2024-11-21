"use client";


import { useStoreUserEffect } from "@/hooks/use-store-user-effect";
import { BentoGridFeatures } from "./_components/bento-grid-features";
import { CTA } from "./_components/cta";
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Highlights } from "./_components/highlights";

export default function Home() {
    const { isAuthenticated } = useStoreUserEffect();
    
    // const { isAuthenticated }=useConvexAuth()

    return (
        <main className="w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <section className="max-w-6xl mx-auto">
                <Header isAuthenticated={isAuthenticated} />
                <Hero isAuthenticated={isAuthenticated}/>
                <Features />
                <BentoGridFeatures />
                <Highlights />
                <CTA isAuthenticated={isAuthenticated} />
                <Footer />
            </section>
        </main>
    )
}