"use client";

import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function NotFound() {
    const router = useRouter();
    return (
        <main className="h-full w-full flex justify-center items-center mx-auto">
            <section className="flex flex-col items-center space-y-4 md:space-y-6">
                <Image src="/svg/page-not-found.svg" alt="Page Not Found Icon" width="100" height="100" />
                <h2 className="text-xl md:text-2xl dark:text-neutral-200 text-neutral-800 font-bold">PAGE NOT FOUND</h2>
                <p className="text-sm dark:text-neutral-400 text-neutral-600">Could not find requested resource</p>
                <div className="w-full flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => router.back()}>GO BACK</Button>
                    <Link href="/" className="bg-app-color h-9 px-3 flex flex-col justify-center rounded-lg text-sm translate-hover hover:bg-app-color/80">RETURN HOME</Link>
                </div>
            </section>
        </main>
    )
}