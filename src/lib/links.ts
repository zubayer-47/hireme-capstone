import {
    Sheet,
    Blocks,
    ArrowUp,
    Bookmark,
    CalendarClock,
    MessageSquareMore,
} from "lucide-react";

export const dataLinks = [
    {
        titleSection: "Discover",
        links: [
            {
                href: "/feeds?filter=recent",
                icon: CalendarClock,
                navLinkTitle: "Recent",
            },
            {
                href: "/feeds?filter=most-discussed",
                icon: MessageSquareMore,
                navLinkTitle: "Most Discussed",
            },
            {
                href: "/feeds?filter=most-upvotes",
                icon: ArrowUp,
                navLinkTitle: "Most Upvotes",
            },
            {
                href: "/feeds?filter=bookmarks",
                icon: Bookmark,
                navLinkTitle: "Bookmarks",
            },
        ]
    },
    {
        titleSection: "Resources",
        links: [
            {
                href: "/builder",
                icon: Blocks,
                navLinkTitle: "builder",
            },
            {
                href: "/tracker",
                icon: Sheet,
                navLinkTitle: "tracker",
            },
        ]
    }


]