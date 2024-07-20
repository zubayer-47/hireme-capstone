import Link from "next/link";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "@/lib/utils";

type NavLinksProps = {
    pathname: string;
    titleSection: string;
    links: {
        href: string;
        navLinkTitle: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[]
}

export const NavLinks = ({
    links,
    pathname,
    titleSection,
}: NavLinksProps) => {
    return (
        <ul>
            <p className="font-semibold dark:text-neutral-200 text-neutral-500">{titleSection}</p>
            {links.map(({ href, navLinkTitle, icon: Icon }, index) => (
                <li key={index} className={cn(pathname.includes(navLinkTitle) && "dark:bg-neutral-950 bg-neutral-200 rounded-md px-1")}>
                    <Link
                        href={href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 capitalize dark:text-neutral-300 text-neutral-600 transition-all hover:text-neutral-500 hover:dark:bg-neutral-950 hover:bg-neutral-200"
                    >
                        <Icon className="h-4 w-4" />
                        {navLinkTitle}
                    </Link>
                </li>
            ))}
        </ul>
    )
}