
export const Features = () => {
    return (
        <>
            <section>
                <div className="h-full px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold tracking-tighter text-neutral-100">
                            Boost Your Job Application Success
                        </h2>
                    </div>
                    <div className="grid gap-2 mt-12 text-center md:grid-cols-3">
                        <div className="flex flex-col gap-4 p-8 rounded-3xl bg-neutral-950 border border-white/[0.2] shadow-md shadow-neutral-800">
                            <div>
                                <p className="font-medium text-neutral-200">Community Feedback Zone</p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Share your resume or job application journey on our social feed and <span className="text-app-color font-semibold">get personalized tips and advice from a supportive community</span>.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-8 rounded-3xl bg-neutral-950 border border-white/[0.2] shadow-md shadow-neutral-800">
                            <div>
                                <div className="font-medium text-neutral-200">Build Winning Application</div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Our <span className="text-app-color font-semibold">easy-to-use Builder Tool</span> helps you create a stand-out resume and cover letter to land your dream job.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-8 rounded-3xl bg-neutral-950 border border-white/[0.2] shadow-md shadow-neutral-800">
                            <div>
                                <p className="font-medium text-neutral-200">
                                    Track & Organize Your Job Applications
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Our <span className="text-app-color font-semibold">Job Tracker</span> keeps you organized by allowing you to easily track the progress of all your applications in one place.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}