import {
    Plus,
    Sheet,
    Hammer,
    ArrowUp,
    Bookmark,
    CalendarClock,
    MessageSquareMore,
} from "lucide-react";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";


export const Sidebar = async ({ userId }: { userId: string }) => {
    const user = await currentUser();
    return (
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b border-white/[0.2] px-4 lg:h-[60px] lg:px-6">
                <AppLogo href={`/feed/${userId}`} width={25} height={25} />
                <Button variant="outline" size="icon" className="ml-auto h-6 w-6 dark:bg-neutral-950 bg-neutral-200 dark:border-white/[0.2] border-black/[0.2] ">
                    <Plus className="h-4 w-4 dark:text-neutral-300  text-neutral-950" />
                    <span className="sr-only">Share Post</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-4">
                    <hgroup className="flex items-center gap-3 dark:bg-neutral-950 bg-neutral-200 rounded-md py-1 px-1">
                        <Image src={user?.imageUrl!} alt="User Profile Picture" width={20} height={20} className="object-cover rounded-md" />
                        <h2 className="capitalize dark:text-neutral-200 text-neutral-950 text-sm">{user?.firstName} Feed</h2>
                    </hgroup>
                    
                    <ul>
                        <p className="font-semibold dark:text-neutral-400 text-neutral-500">Discover</p>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 dark:text-neutral-300 text-neutral-600 transition-all hover:text-neutral-500 hover:dark:bg-neutral-950 hover:bg-neutral-200"
                            >
                                <CalendarClock className="h-4 w-4" />
                                Recent
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 dark:text-neutral-300 text-neutral-600 transition-all hover:text-neutral-500 hover:dark:bg-neutral-950 hover:bg-neutral-200"
                            >
                                <MessageSquareMore className="h-4 w-4" />
                                Most Discussed
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 dark:text-neutral-300 text-neutral-600 transition-all hover:text-neutral-500 hover:dark:bg-neutral-950 hover:bg-neutral-200"
                            >
                                <ArrowUp className="h-4 w-4" />
                                Most Upvotes
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 dark:text-neutral-300 text-neutral-600 transition-all hover:text-neutral-500 hover:dark:bg-neutral-950 hover:bg-neutral-200"
                            >
                                <Bookmark className="h-4 w-4" />
                                Bookmarked
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <p className="font-semibold dark:text-neutral-400 text-neutral-500">Resources</p>
                        <li>
                            <Link
                                href="/builder"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 dark:text-neutral-300 text-neutral-600 transition-all hover:text-neutral-500 hover:dark:bg-neutral-950 hover:bg-neutral-200"
                            >
                                <Hammer className="h-4 w-4" />
                                Builder
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tracker"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 dark:text-neutral-300 text-neutral-600 transition-all hover:text-neutral-500 hover:dark:bg-neutral-950 hover:bg-neutral-200"
                            >
                                <Sheet className="h-4 w-4" />
                                Tracker
                            </Link>
                        </li>
                    </ul>
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