
import { Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { MobileSidebar } from "./mobile-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { DynamicSidebar } from "./dynamic-sidebar";

export const Header = ({ userId }: { userId: string }) => {
    return (
        <header className="flex h-14 items-center gap-4 border-b dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 px-4 lg:h-[60px] lg:px-6">
            <MobileSidebar>
                <DynamicSidebar userId={userId} />
            </MobileSidebar>
            <div className="w-full flex-1">
                <form>
                    <div className="relative flex items-center">
                        <Search className="absolute left-2.5 top-2.75 h-4 w-4 text-neutral-400" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full appearance-none dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 pl-8 shadow-none md:w-2/3 lg:w-1/3 border-black/[0.2]"
                        />
                    </div>
                </form>
            </div>
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
        </header>
    )
}