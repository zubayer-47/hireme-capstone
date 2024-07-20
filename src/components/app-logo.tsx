import Link from "next/link";
import Image from "next/image";

type AppLogoProps = {
    href: string;
    width: number;
    height: number;
    className?: string;
}

export const AppLogo = ({
    href,
    width,
    height,
    className
}: AppLogoProps) => {
    return (
        <Link href={href} className={`flex items-center gap-1 group transition ${className}`}>
            <Image src="/svg/logo.svg" alt="Letter H Logo & App Logo for the website Hireme" width={width} height={height} className="group-hover:animate-spin" />
            <p className="text-neutral-800 dark:text-white text-sm font-semibold group-hover:dark:text-neutral-300 group-hover:text-neutral-700">Hireme</p>
        </Link>

    )
}