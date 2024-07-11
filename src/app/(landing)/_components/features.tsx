
export const Features = () => {
    return (
        <section className="h-full px-8 py-8 sm:py-16 md:py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
            <article className="text-center">
                <h2 className="text-4xl font-semibold tracking-tighter text-neutral-200">
                    Boost Your Job Application Success
                </h2>
            </article>
            <article className="grid gap-2 mt-12 text-center md:grid-cols-3">
                <aside className="flex flex-col gap-1 sm:gap-3 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-white/[0.2] hover:border-white/[0.5] shadow-md shadow-neutral-800">
                    <p className="font-medium text-neutral-200 text-sm sm:text-base">Community Feedback Zone</p>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500">
                        Share your resume or job application journey on our social feed and <span className="text-app-color hover:text-app-color/80 font-semibold">get personalized tips and advice from a supportive community</span>.
                    </p>
                </aside>
                <aside className="flex flex-col gap-1 sm:gap-3 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-white/[0.2] hover:border-white/[0.5] shadow-md shadow-neutral-800">
                    <div className="font-medium text-neutral-200 text-sm sm:text-base">Build Winning Application</div>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500">
                        Our <span className="text-app-color hover:text-app-color/80 font-semibold">easy-to-use Builder Tool</span> helps you create a stand-out resume and cover letter to land your dream job.
                    </p>
                </aside>
                <aside className="flex flex-col gap-1 sm:gap-3 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-white/[0.2] hover:border-white/[0.5] shadow-md shadow-neutral-800">
                    <p className="font-medium text-neutral-200 text-sm sm:text-base">
                        Track & Organize Your Job Applications
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500">
                        Our <span className="text-app-color font-semibold hover:text-app-color/80">Job Tracker</span> keeps you organized by allowing you to easily track the progress of all your applications in one place.
                    </p>
                </aside>
            </article>
        </section>
    )
}