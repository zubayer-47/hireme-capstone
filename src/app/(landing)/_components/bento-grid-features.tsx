import Image from "next/image"

export const BentoGridFeatures = () => {
    return (
        <section className="scroll-mt-24" id="features">
            <div className="flex flex-col h-full gap-2 px-8 py-12 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <div className="grid gap-2 lg:grid-flow-col-dense lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-3">
                    <div className="max-w-lg min-w-full mx-auto">
                        <div className="flex h-full">
                            <div className="flex flex-col justify-center p-8 border border-white/[0.2] bg-neutral-950 rounded-3xl w-full">
                                <h2 className="font-semibold text-2xl text-neutral-200">
                                    Get Your Resume Reviewed
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div>
                            <div className="relative h-full p-2 overflow-hidden border border-white/[0.2] rounded-3xl">
                                <Image src="" alt="" className="object-cover h-full border border-white/[0.2] shadow-2xl rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-2 lg:grid-flow-col-dense lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-3">
                    <div className="max-w-lg min-w-full mx-auto lg:col-start-3">
                        <div className="flex h-full">
                            <div className="flex flex-col justify-center p-8 border border-white/[0.2] bg-neutral-950 rounded-3xl w-full">
                                <h2 className="font-semibold text-2xl text-neutral-200">Create Stand-Out Resumes & Cover Letters</h2>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-start-1 lg:col-span-2">
                        <div>
                            <div className="relative h-full p-2 overflow-hidden border border-white/[0.2] rounded-3xl">
                                <Image src="" alt="" className="object-cover h-full border border-white/[0.2] shadow-2xl rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-2 lg:grid-flow-col-dense lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-3">
                    <div className="max-w-lg min-w-full mx-auto">
                        <div className="flex h-full">
                            <div className="flex flex-col justify-center p-8 border border-white/[0.2] bg-neutral-950 rounded-3xl w-full">
                                <h2 className="font-semibold text-2xl text-neutral-200">Never Miss An Interview Again & Keep Yourself Organized</h2>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div>
                            <div className="relative h-full p-2 overflow-hidden border border-white/[0.2] rounded-3xl">
                                <Image src="" alt="" className="object-cover h-full border border-white/[0.2] shadow-2xl rounded-2xl"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}