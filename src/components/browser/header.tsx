import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { DynamicSidebar } from "./dynamic-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignOut } from "../sign-out-button";

export const Header = () => {
    return (
        <header className="flex items-center gap-4 border-b dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 px-4 h-[60px] lg:px-6">
            <MobileSidebar>
                <DynamicSidebar  />
            </MobileSidebar>
            <div className="flex items-center justify-end  w-full gap-4">
                <ThemeToggle />
                <SignOut />
            </div>
        </header>
    )
}