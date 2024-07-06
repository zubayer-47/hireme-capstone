import { AppLogo } from "@/components/app-logo";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="flex-1">
            <section className="h-full px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <aside className="pt-12 border-t border-gray-600 xl:grid xl:grid-cols-2 xl:gap-12">
                    <hgroup className="text-black">
                        <div className="inline-flex items-center gap-3">
                            <AppLogo href="/" width={25} height={25} />
                        </div>
                        <p className="mt-2 text-sm text-gray-500 ">
                            Our app simplifies and enhance your job application process to get your dream job.
                        </p>
                    </hgroup>
                    <hgroup className="grid grid-cols-2 gap-8 mt-12 lg:grid-cols-2 lg:mt-0">
                        <nav>
                            <h3 className="text-neutral-200 text-sm">Resources</h3>
                            <ul role="list" className="mt-4 space-y-2">
                                <li>
                                    <Link href="#_" className="text-sm text-gray-500 hover:text-gray-400">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#_" className="text-sm text-gray-500 hover:text-gray-400">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#_" className="text-sm text-gray-500 hover:text-gray-400">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#_" className="text-sm text-gray-500 hover:text-gray-400">
                                        Terms of service
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <nav>
                            <h3 className="text-neutral-200 text-sm">Services</h3>
                            <ul role="list" className="mt-4 space-y-2">
                                <li>
                                    <Link href="#_" className="text-sm text-gray-500 hover:text-gray-400">
                                        Social Feed
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#_" className="text-sm text-gray-500 hover:text-gray-400">
                                        Builder Tool
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#_" className="text-sm text-gray-500 hover:text-gray-400">
                                        Job Tracker
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </hgroup>
                </aside>
                <aside className="flex flex-col pt-12 md:flex-row md:items-center md:justify-between">
                    <nav className="text-left">
                        <span className="mx-auto mt-2 text-sm text-neutral-300 lg:mx-0">
                            © HireMe. By:
                            <Link className="text-app-color hover:text-app-color/80 font-bold" target="_blank" href="https://developer-portfolio-sepia-phi.vercel.app/"> Alonzo Christopher</Link>
                        </span>
                    </nav>
                    <nav className="text-right">
                        <ul className="flex items-center gap-2">
                            <li className="">
                                <Link href="https://github.com/achris-alonzo30" target="_blank" >
                                    <Image src="/svg/github.svg" alt="Github Icon" width={20} height={20} className="object-cover" />
                                </Link>
                            </li>
                            <li className="">
                                <Link href="https://linkedin.com/in/lonzochris" target="_blank">
                                    <Image src="/svg/linkedin.svg" alt="LinkedIn Icon" width={20} height={20} className="object-cover" />
                                </Link>
                            </li>
                        </ul>
                    </nav>

                </aside>
            </section>
        </footer>
    )
}