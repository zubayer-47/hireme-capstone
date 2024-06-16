import { Header } from "./header";
import { DynamicSidebar } from "./dynamic-sidebar";


type BrowserProps = {
    userId?: string;
    children: React.ReactNode;
}

export const Browser = ({ userId, children }: BrowserProps) => {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] dark:bg-neutral-950">
            <div className="hidden border-r dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 md:block">
                <DynamicSidebar userId={userId!} />
            </div>
            <div className="flex flex-col">
                <Header userId={userId!} />
                {children}
            </div>
        </div>
    )
}