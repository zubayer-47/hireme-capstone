"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { 
    motion, 
    useScroll, 
    useTransform } from "framer-motion";
import { Id } from "@/convex/_generated/dataModel";
import { AnimatedTextUnderline } from "@/components/animation/animated-text-underline";

export const Hero = ({ isAuthenticated, userId }: { isAuthenticated: boolean; userId: Id<"users"> }) => {
    const path = isAuthenticated ? `/feeds/${userId}` : "/auth/sign-in";

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"]
    })

    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

    return (
        <section className="lg:pt-24 md:pt-16 pt-8">
            <article className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <aside className="text-center">
                    <h1 className="flex flex-col gap-2 text-xl sm:text-2xl md:text-4xl font-semibold tracking-tighter text-neutral-200 lg:text-5xl text-balance">
                        <AnimatedTextUnderline /> designed to simplify and enhance
                        job application process for job seekers.
                    </h1>
                    <p className="w-3/4 mx-auto mt-4 text-sm sm:text-base font-medium text-gray-500 text-balance">
                        Your tool to improve your resume and cover letter, gives helpful feedback, and helps you track your job applications.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-2 mx-auto mt-4 sm:mt-8 md:flex-row">
                        <Link href={path} className="p-0.5 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-app-color rounded-lg" />
                            <div className="px-8 py-2 text-sm bg-neutral-900 rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent">
                                Start Building
                            </div>
                        </Link>
                    </div>
                    <motion.div 
                        ref={ref}
                        style={{ scale, opacity }}
                        className="relative h-full p-2 mt-16 sm:mt-24 overflow-hidden bg-neutral-800 shadow- border border-white/[0.2] rounded-3xl">
                        <Image
                            src=""
                            priority
                            width="1000"
                            height="500"
                            alt="placeholder"
                            className="object-cover h-full border border-white/[0.2] bg-neutral-900 shadow-xl shadow-neutral-500 rounded-2xl"
                        />
                    </motion.div>
                </aside>
            </article>
        </section>

    )
}