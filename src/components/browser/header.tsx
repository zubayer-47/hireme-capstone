import { Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { MobileSidebar } from "./mobile-sidebar";
import { DynamicSidebar } from "./dynamic-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export const Header = ({ userId }: { userId?: string }) => {
    return (
        <header className="flex h-14 items-center gap-4 border-b dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 px-4 lg:h-[60px] lg:px-6">
            <MobileSidebar>
                <DynamicSidebar userId={userId!} />
            </MobileSidebar>
            <div className="flex items-center justify-end  w-full gap-4">
                <ThemeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>
    )
}