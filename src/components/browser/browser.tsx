"use client";

import { Header } from "./header";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DynamicSidebar } from "./dynamic-sidebar";

type BrowserProps = {
    children: React.ReactNode;
}

export const Browser = ({ children }: BrowserProps) => {
    const user = useQuery(api.users.getSelf);
    // Add a skeleton loading here
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] dark:bg-neutral-950">
            <div className="hidden border-r h-screen dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 md:block">
                <DynamicSidebar userId={user?._id!} />
            </div>
            <div className="flex flex-col">
                <Header userId={user?._id!} />
                {children}
            </div>
        </div>
    )
}