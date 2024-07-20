"use client";

import Link from 'next/link';
import Image from "next/image";
export default async function NotFound() {
    
    return (
        <main className="h-full w-full flex justify-center items-center mx-auto">
            <section className="flex flex-col items-center space-y-4 md:space-y-6">
                <Image src="/svg/page-not-found.svg" alt="Page Not Found Icon" width="100" height="100" />
                <h2 className="text-xl md:text-2xl dark:text-white text-neutral-800 font-bold">PAGE NOT FOUND</h2>
                <p className="text-sm dark:text-neutral-200 text-neutral-600">Could not find requested resource</p>
                <div className="w-full flex items-center gap-2 text-center">
                    <Link href="/" className="bg-app-color w-full h-9 px-3 flex flex-col justify-center rounded-lg text-sm translate-hover hover:bg-app-color/80">RETURN HOME</Link>
                </div>
            </section>
        </main>
    )
}