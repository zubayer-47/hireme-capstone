import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-full dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900">
                {children}
            </SheetContent>
        </Sheet>
    )
}