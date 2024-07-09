import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

export const CTA = ({ isAuthenticated, userId }: { isAuthenticated: boolean; userId: Id<"users">; }) => {
    const path = isAuthenticated ? `/feeds/${userId}` : "/auth/sign-in";

    return (
        <section>
            <article className="px-8 py-12 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <aside className="p-2 border border-white/[0.2] bg-neutral-800 rounded-3xl">
                    <hgroup className="p-10 text-center bg-neutral-950  border border-white/[0.2] shadow-lg shadow-neutral-500 md:p-20 rounded-3xl">
                        <p className="text-4xl font-semibold tracking-tighter text-neutral-100">
                            Land Your Dream Job Faster
                        </p>
                        <p className="mt-4 text-base text-gray-500">
                            Build winning applications, track progress effortlessly, and join a supportive community.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-2 mx-auto mt-8 md:flex-row">
                            <Link href={path} className="h-11 px-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground translate-hover bg-app-color hover:bg-app-color/80 translate-hover">
                                Start Building
                            </Link>
                        </div>
                    </hgroup>
                </aside>
            </article>
        </section>
    )
}