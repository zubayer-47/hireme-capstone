import { ButtonLink } from "@/components/button-link"

export const CTA = () => {
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
                            <ButtonLink 
                                size="lg"
                                href="/auth/sign-in"
                                name="Start Building"
                                className="bg-app-color hover:bg-app-color/80 translate-hover"  
                            />
                        </div>
                    </hgroup>
                </aside>
            </article>
        </section>
    )
}