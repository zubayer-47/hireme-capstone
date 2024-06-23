'use client'

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="h-full w-full flex justify-center items-center mx-auto">
      <section className="flex flex-col space-y-4 md:space-y-8">
        <Image src="/svg/page-not-found.svg" alt="Page Not Found Icon" width="100" height="100" />
        <h2 className="text-xl md:text-2xl dark:text-neutral-300 text-neutral-700 font-bold">SOMETHING WENT WRONG</h2>
        <Button
          className="bg-app-color translate-hover hover:bg-app-color/80 text-neutral-200 text-sm"
          size="sm"
          onClick={
            () => router.back()
          }
        >
          GO BACK
        </Button>
      </section>
    </main>
  )
}