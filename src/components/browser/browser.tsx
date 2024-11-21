import { DynamicSidebar } from "./dynamic-sidebar";
import { Header } from "./header";

type BrowserProps = {
    children: React.ReactNode;
}

export const Browser = ({ children }: BrowserProps) => {

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] dark:bg-neutral-950">
            <div className="hidden border-r h-full dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 md:block">
                <DynamicSidebar  />
            </div>
            <div className="flex flex-col">
                <Header />
                {children}
            </div>
        </div>
    )
}