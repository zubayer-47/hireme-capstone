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
                href: "#",
                icon: CalendarClock,
                navLinkTitle: "Recent",
            },
            {
                href: "#",
                icon: MessageSquareMore,
                navLinkTitle: "Most Discussed",
            },
            {
                href: "#",
                icon: ArrowUp,
                navLinkTitle: "Most Upvotes",
            },
            {
                href: "#",
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
                navLinkTitle: "Builder",
            },
            {
                href: "/tracker",
                icon: Sheet,
                navLinkTitle: "Tracker",
            },
        ]
    }


]