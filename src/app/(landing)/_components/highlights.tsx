import { highlights } from "../_lib/data";

export const Highlights = () => {
    return (
        <section>
            <article className="h-full px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <aside className="text-center">
                    <h2 className="text-2xl sm:text-4xl font-semibold tracking-tighter text-neutral-200">
                        Experience the true power of {" "}
                        <span className="text-app-color ">Hireme</span>
                    </h2>
                    <p className="max-w-lg mx-auto mt-4 text-sm sm:text-base text-gray-400">
                        All these features are right at your fingertips within the browser. And
                        this is just the start, these features will continue to keep improving!
                    </p>
                </aside>

                <aside className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 text-center mt-12 gap-y-12 lg:mt-16 gap-x-6">
                    {highlights.map((highlight, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 rounded-2xl p-2 hover:bg-neutral-900 hover:border hover:border-white/[0.2] transtion-all">
                            <highlight.icon className="text-app-color h-8 w-8" />
                            <hgroup className="mt-3 sm:mt-6">
                                <h3 className="font-medium text-neutral-300 text-sm sm:text-base">{highlight.title}</h3>
                                <p className="mt-2 text-xs sm:text-sm text-neutral-300">
                                    {highlight.description}
                                </p>
                            </hgroup>
                        </div>
                    ))}
                </aside>
            </article>
        </section>
    )
}