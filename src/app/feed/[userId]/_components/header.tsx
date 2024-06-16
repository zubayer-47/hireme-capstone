import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Menu,
    Plus,
    Search,
    Hammer,
    ArrowUp,
    SheetIcon,
    MessageSquareMore,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/app-logo";


export const Header = () => {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <AppLogo href={`/feed/`} width={20} height={20} />
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
                                    <SheetIcon className="h-4 w-4" />
                                    Tracker
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="mt-auto">
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
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
            <UserButton afterSignOutUrl="/" />
        </header>
    )
}