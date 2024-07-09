import Link from "next/link";

type ButtonLinkProps = {
    name: string;
    href: string;
    className?: string;
    onSave: () => void;
    size?: "sm" | "lg" | "icon";
}

const sizeStyle = {
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
    default: "h-10 px-4 py-2",
}

export const ButtonLink = ({
    name,
    href,
    size,
    onSave,
    className,
}: ButtonLinkProps) => {


    return (
        <Link onClick={() => onSave()} href={href} className={`${size ? sizeStyle[size] : sizeStyle["default"]} ${className} inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground translate-hover`} >
            {name}
        </Link>
    )
}