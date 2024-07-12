import Link from "next/link";

export const CTA = ({ isAuthenticated }: { isAuthenticated: boolean; }) => {
    const path = isAuthenticated ? "/feeds" : "/auth/sign-in";

    return (
        <section>
            <article className="px-8 py-12 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <aside className="p-2 border border-white/[0.2] bg-neutral-800 rounded-3xl">
                    <hgroup className="p-10 text-center bg-neutral-950  border border-white/[0.2] shadow-lg shadow-neutral-500 md:p-20 rounded-3xl">
                        <p className="text-2xl sm:text-4xl font-semibold tracking-tighter text-neutral-200">
                            Land Your Dream Job Faster
                        </p>
                        <p className="mt-4 text-sm sm:text-base text-gray-400">
                            Build winning applications, track progress effortlessly, and join a supportive community.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-2 mx-auto mt-6 sm:mt-8 md:flex-row">
                            <Link href={path} className="p-0.5 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-app-color rounded-lg" />
                                <div className="px-8 py-2 text-sm bg-neutral-900 rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent">
                                    Start Building
                                </div>
                            </Link>
                        </div>
                    </hgroup>
                </aside>
            </article>
        </section>
    )
}