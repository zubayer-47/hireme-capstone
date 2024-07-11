export const AboutPage = () => {
    return (

        <section>
            <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                    <div>
                        <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-5xl text-balance">
                            Building one pagers together,
                            <span className="text-gray-600">wherever and anywhere</span>
                        </h1>
                        <p className="mt-4 text-base font-medium text-gray-500 text-balance">
                            Control and added security. With decentralization, users have more
                            control over their data and transactions, and the platform is less
                            susceptible to malicious attacks.
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-12 text-balance">
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div>
                                <span className="flex items-center justify-center bg-gray-100 rounded-full size-8"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="text-gray-600 size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path></svg></span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Persistence</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    spotless will remember all your changes to every element so you
                                    can copy all changes at once!
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div>
                                <span className="flex items-center justify-center bg-gray-100 rounded-full size-8"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="text-gray-600 size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path></svg></span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Screenshot tool</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Make screenshots of a particular part of the screen to share quick
                                    and easy!
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div>
                                <span className="flex items-center justify-center bg-gray-100 rounded-full size-8"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="text-gray-600 size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path></svg></span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Breakpoint info</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Instantly know what Tailwind breakpoint you're currently on.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}