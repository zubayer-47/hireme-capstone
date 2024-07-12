"use client";

import { Header } from "../(landing)/_components/header";
import { Footer } from "../(landing)/_components/footer";
import { useStoreUserEffect } from "@/hooks/use-store-user-effect";
import { AnimatedTextUnderline } from "@/components/animation/animated-text-underline";

export default function AboutPage() {
    const { isAuthenticated } = useStoreUserEffect();

    return (
        <main className="flex flex-col h-screen w-full mx-auto">
            <Header isAuthenticated={isAuthenticated} />
            <section className="flex-1 flex-grow mt-24 h-full w-full flex items-center justify-center px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <article className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                    <hgroup>
                        <AnimatedTextUnderline />
                        <h1 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tighter text-gray-200 lg:text-5xl text-balance">
                            We Simplify Your Job Application Process.
                        </h1>
                        <p className="mt-4 text-base font-medium text-neutral-400 text-balance">
                            Hireme is designed to simplify and enhance the job application process for job seekers.
                            Our app offers powerful tools to increase your chances of landing a job.
                            From building and enhancing resumes and cover letters to sharing your journey with a supportive community and tracking your applications,
                            Hireme is your comprehensive solution for job hunting success.
                        </p>
                    </hgroup>
                    <aside className="flex flex-col gap-y-12 text-balance">

                            <hgroup>
                                <h3 className="text-sm sm:text-base text-neutral-200">Community Support Social Feed</h3>
                                <p className="mt-2 text-xs sm:text-sm text-neutral-400">
                                    Join a vibrant community of job seekers.
                                    Share your journey, post your resume, and get valuable feed from peers.
                                    Engage in discussion, ask questions, and support other.
                                    Together, we can navigate the challenges of job hunting and celebrate successes.
                                </p>
                            </hgroup>

                        <hgroup>
                                <h3 className="text-sm sm:text-base text-neutral-200">Resume and Cover Letter with AI Feature Enhancer</h3>
                                <p className="mt-2 text-xs sm:text-sm text-neutral-400">
                                    Let&apos;s elevate your job application with our AI-enhanced resume and cover letter builder.
                                    Create professional documents tailored to your target job description.
                                    Our AI feature provides actionable feedback to help you optimize your resume and cover letter,
                                    ensuring you make a strong impression on potential employers.
                                </p>
                            </hgroup>
 
                        <hgroup>
                                <h3 className="text-sm sm:text-base text-neutral-200">Job Tracker Board</h3>
                                <p className="mt-2 text-xs sm:text-sm text-neutral-400">
                                    Stay on top of your job search with Hireme&apos;s Job Tracker Board. 
                                    Log every application, update its status, and keep track of important dates and deadlines. 
                                    Our intuitive tracking system helps you stay organized and ensures you never miss an opportunity.
                                </p>
                            </hgroup>
                    </aside>
                </article>
            </section>
            <Footer />
        </main>
    )
}