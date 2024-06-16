import { Header } from "./_components/header";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./_components/sidebar";
import { Feeds } from "./_components/feeds";

export default function FeedPage({ params }: { params: { userId: string }}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] dark:bg-neutral-950">
      <div className="hidden border-r dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 md:block">
        <Sidebar userId={params.userId} />
      </div>
      <div className="flex flex-col">
        <Header />
        <Feeds />
      </div>
    </div>
  )
}
