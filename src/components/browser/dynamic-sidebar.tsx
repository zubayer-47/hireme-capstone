"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

import { Plus } from "lucide-react";

import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";

import { NavLinks } from "./nav-links";
import { dataLinks } from "../../app/feeds/[userId]/feed-utils/links";


export const DynamicSidebar = ({ userId }: { userId?: string }) => {
    const { user } =  useUser();

    return (
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b border-white/[0.2] px-4 lg:h-[60px] lg:px-6">
                <AppLogo href={`/feed/${userId!}`} width={25} height={25} />
                <Button variant="outline" size="icon" className="ml-auto h-6 w-6 dark:bg-neutral-950 hover:dark:bg-neutral-900 bg-neutral-200 dark:border-white/[0.2] border-black/[0.2] translate-hover">
                    <Plus className="h-4 w-4 dark:text-neutral-300  text-neutral-950" />
                    <span className="sr-only">Share Post</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-4">
                    <Link href={`/feeds/${userId!}`} className="flex items-center gap-3 dark:bg-neutral-950 bg-neutral-200 rounded-md py-1 px-1">
                        <Image 
                            width={20} 
                            height={20}
                            alt="User Profile Picture"  
                            className="object-cover rounded-md"

                            src={user?.imageUrl || `/svg/user-profile-placeholder.svg`}  />
                        <h2 className="capitalize dark:text-neutral-200 text-neutral-950 text-sm">{user?.firstName} Feed</h2>
                    </Link>
                    
                    {dataLinks.map(({ titleSection, links }, index) => (
                        <NavLinks key={index} titleSection={titleSection} links={links} />
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Card className="dark:bg-neutral-900 bg-neutral-50 border-white/[0.2] shadow-md shadow-neutral-800">
                    <CardHeader>
                        <CardDescription className="dark:text-neutral-400 text-neutral-600">
                            We value your feedback. It helps us make things better!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="sm" className="w-full bg-app-color hover:bg-app-color/80 text-neutral-100">
                            Share Your Feedback
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}