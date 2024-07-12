import Image from "next/image"
import { features } from "../_lib/data"
import { cn } from "@/lib/utils"

export const BentoGridFeatures = () => {
    return (
        <section className="scroll-mt-24" id="features">
            <article className="flex flex-col h-full gap-2 px-8 py-12 mx-auto md:px-12 lg:px-32 max-w-7xl">
                {features.map(({ title, imagePath, alt }, index) => (
                    <aside key={index} className="grid gap-2 lg:grid-flow-col-dense lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-3">

                        <div className={cn(index === 1 && "lg:col-start-3", "max-w-lg min-w-full mx-auto")}>
                            <div className="flex h-full">
                                <div className="flex flex-col justify-center p-8 border border-white/[0.2] hover:border-white/[0.5] bg-neutral-950 rounded-3xl w-full">
                                    <h2 className="font-semibold text-xl sm:text-2xl text-neutral-200">
                                        {title}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className={cn(index === 1 && "lg:col-start-1", "lg:col-span-2")}>
                            <div>
                                <div className="relative h-full p-2 overflow-hidden border border-white/[0.2] hover:border-white/[0.5] rounded-3xl">
                                    <Image
                                        priority
                                        width={500}
                                        height={500}
                                        quality={100}
                                        src={imagePath}
                                        alt={alt}
                                        className="object-contain h-full w-full border border-white/[0.2] shadow-2xl rounded-2xl" />
                                </div>
                            </div>
                        </div>
                    </aside>
                ))}
            </article>
        </section>
    )
}