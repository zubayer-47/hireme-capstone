import Link from 'next/link';
import Image from "next/image";

export default async function NotFound() { 

    return (
        <main className="h-full w-full flex justify-center items-center mx-auto">
            <section className="flex flex-col items-center space-y-4 md:space-y-6">
                <Image src="/svg/page-not-found.svg" alt="Page Not Found Icon" width="100" height="100" />
                <h2 className="text-xl md:text-2xl dark:text-neutral-300 text-neutral-700 font-bold">PAGE NOT FOUND</h2>
                <p className="text-sm text-neutral-500">Could not find requested resource</p>
                <Link href="/" className="bg-app-color h-9 px-3 flex flex-col justify-center rounded-lg text-sm translate-hover hover:bg-app-color/80">RETURN HOME</Link>
            </section>
        </main>
    )
}