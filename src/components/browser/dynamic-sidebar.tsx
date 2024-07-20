"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { Bell } from "lucide-react";

import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { FeedbackModal } from "./feedback-modal";

import { NavLinks } from "./nav-links";
import { dataLinks } from "../../lib/links";


export const DynamicSidebar = () => {
    const { user } = useUser();
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col gap-2">
            <div className="flex items-center border-b border-white/[0.2] px-4 h-[60px] ">
                <AppLogo href={"/feeds"} width={25} height={25} />
                <Button variant="outline" size="icon" className="ml-auto h-6 w-6 dark:bg-neutral-950 hover:dark:bg-neutral-900 bg-neutral-200 dark:border-white/[0.2] border-black/[0.2] translate-hover">
                    <Bell className="h-4 w-4 dark:text-neutral-300  text-neutral-950" />
                    <span className="sr-only">Notification</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-4 pt-4">
                    <Link
                        href="/feeds"
                        className={cn(pathname.includes("feeds") && "dark:bg-neutral-950 bg-neutral-200 rounded-md py-1 px-1", "flex items-center gap-3")}>
                        <Image
                            width={20}
                            height={20}
                            alt="User Profile Picture"
                            className="object-cover rounded-md"

                            src={user?.imageUrl || `/svg/user-profile-placeholder.svg`} />
                        <h2 className="capitalize dark:text-white text-neutral-950 text-sm">{user?.firstName} Feed</h2>
                    </Link>

                    {dataLinks.map(({ titleSection, links }, index) => (
                        <NavLinks
                            key={index}
                            links={links}
                            pathname={pathname}
                            titleSection={titleSection}
                        />
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Card className="dark:bg-neutral-900 bg-neutral-50 dark:border-white/[0.2] hover:dark:border-white/[0.5] border-black/[0.2] hover:border-black/[0.5]">
                    <CardHeader>
                        <CardDescription className="dark:text-neutral-200 text-neutral-600 text-center">
                            We value your feedback. It helps us make things better!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FeedbackModal />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}