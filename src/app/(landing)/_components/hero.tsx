import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Hero = () => {
    return (
        <section className="lg:pt-24 md:pt-16 pt-8">
            <article className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <aside className="text-center">
                    <h1 className="text-4xl font-semibold tracking-tighter text-neutral-100 lg:text-5xl text-balance">
                        <span className="text-app-color">HireMe</span> is designed to simplify and enhance
                        <span className="text-gray-600"> the job application process for the job seekers.</span>
                    </h1>
                    <p className="w-full mx-auto mt-4 text-base font-medium text-gray-500 text-balance">
                        It uses smart tools to improve your resume and cover letter, gives helpful feedback, and helps you track your job applications.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-2 mx-auto mt-8 md:flex-row">
                        <Button className="bg-app-color hover:bg-app-color/80 translate-hover" size="lg">
                            Start Building
                        </Button>
                    </div>
                    <div className="relative h-full p-2 mt-24 overflow-hidden border border-white/[0.2] rounded-3xl">
                        <Image src="" alt="placeholder" className="object-cover h-full border border-white/[0.2] shadow-2xl rounded-2xl" width="1000" height="500" />
                    </div>
                </aside>
            </article>
        </section>

    )
}