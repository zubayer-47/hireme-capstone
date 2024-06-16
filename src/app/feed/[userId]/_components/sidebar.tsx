import {
    Plus,
    Sheet,
    Hammer,
    ArrowUp,
    MessageSquareMore,
} from "lucide-react";
import Link from "next/link";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
  } from "@/components/ui/card"
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";


export const Sidebar = ({ userId }: { userId: string }) => {
    return (
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <AppLogo href={`/feed/${userId}`} width={25} height={25} />
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Share Post</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <ul>
                        <p>Discover</p>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <MessageSquareMore className="h-4 w-4" />
                                Discussions
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <ArrowUp className="h-4 w-4" />
                                Most Upvoted
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <p>Resources</p>
                        <li>
                            <Link
                                href="/builder"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Hammer className="h-4 w-4" />
                                Builder
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tracker"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Sheet className="h-4 w-4" />
                                Tracker
                            </Link>
                        </li>
                    </ul>


                </nav>
            </div>
            <div className="mt-auto p-4">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            We value your feedback. It helps us make things better!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="sm" className="w-full">
                            Share Your Feedback
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}