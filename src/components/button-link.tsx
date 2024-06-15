import Link from "next/link";

type ButtonLinkProps = {
    name: string;
    href: string;
}

export const ButtonLink = ({
    name,
    href,
}: ButtonLinkProps) => {
    return (
        <Link href={href} className="h-8 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-neutral-200 hover:bg-accent hover:text-accent-foreground" >
            {name}
        </Link>
    )
}