import Image from "next/image";

import { 
    Card,
    CardFooter,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, Bookmark, MessageCircle, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const CardFeed = () => {
    return (
        <Card className="w-[350px] rounded-2xl dark:bg-neutral-900 dark:border-white/[0.2] hover:dark:border-white/[0.5]">
            <CardHeader>
                <section className="flex items-center justify-between">
                    <article className="flex items-center gap-2">
                        <Image src="/svg/user-profile-placeholder.svg" alt="User Profile Placeholder" width="20" height="20" className="rounded-full object-cover" />
                        <hgroup>
                            <h2 className="text-xs dark:text-neutral-200 font-semibold">Username</h2>
                            <p className="text-xs dark:text-neutral-400">Date Posted</p>
                        </hgroup>
                    </article>
                    <Button className="outline-none" size="sm" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </section>
                {/* Limit only 4 badges here */}
                <div className="pt-4 space-x-1">
                    <Badge className="dark:bg-neutral-950 dark:text-neutral-500" >#Apple</Badge>
                    <Badge className="dark:bg-neutral-950 dark:text-neutral-500">#Microsoft</Badge>
                    <Badge className="dark:bg-neutral-950 dark:text-neutral-500">#Meta</Badge>
                    <Badge className="dark:bg-neutral-950 dark:text-neutral-500">#Nvidia</Badge>
                </div>
                
                <CardDescription className="truncate text-sm dark:text-neutral-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consectetur mollitia eveniet accusamus nihil nesciunt corrupti aperiam blanditiis dicta, totam officiis similique quasi non accusantium saepe beatae debitis omnis possimus.
                </CardDescription>
            </CardHeader>
            <CardContent >
                <Image src="" alt="" width="300" height="250" className="object-cover h-full w-full border border-white/[0.2] shadow-2xl rounded-2xl" />
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-2">
                <Button variant="ghost" size="sm" className="gap-1">
                    <ArrowUp className="w-4 h-4" />
                    0
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                    <ArrowDown className="w-4 h-4" />
                    0
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                    <MessageCircle className="w-4 h-4" />
                    0
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                    <Bookmark className="w-4 h-4" />
                    0
                </Button>

            </CardFooter>
        </Card>
    )
}