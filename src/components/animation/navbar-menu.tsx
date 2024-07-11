"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlignRight } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

import {
    Sheet,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { AppLogo } from "../app-logo";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
}: {
    setActive: (item: string) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative ">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer hover:opacity-[0.8] text-neutral-200"
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    {active === item && (
                        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
                            <motion.div
                                transition={transition}
                                layoutId="active"
                                className=" backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.2] shadow-xl"
                            >
                                <motion.div
                                    layout
                                    className="w-max h-full p-4"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
    isAuthenticated,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
    isAuthenticated: boolean;
}) => {
    const [serviceDropDown, setServiceDropDown] = useState(false);

    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative rounded-2xl border border-white/[0.2] bg-neutral-900 shadow-input px-4 sm:px-8 py-2 "
        >
            <div className="hidden sm:flex items-center justify-center space-x-8 text-sm">
                {children}
            </div>
            <div className="flex sm:hidden items-center justify-between w-full">
                    <AppLogo href="/" height={22.5} width={22.5} />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="bg-neutral-900 border-none">
                                <AlignRight className="h-5 w-5 text-neutral-200" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full flex flex-col">
                            <SheetHeader>
                                <AppLogo href="/" height={22.5} width={22.5} />
                            </SheetHeader>
                            <nav className="flex-1 pt-4">
                                <ul className="flex flex-col space-y-6">
                                    <Link href="/about" className="hover:bg-neutral-800 text-sm text-neutral-200 hover:py-2 hover:px-2 rounded-lg">About</Link>
                                    <Link href="/contact" className="hover:bg-neutral-800 text-sm text-neutral-200 hover:py-2 hover:px-2 rounded-lg">Contact</Link>
                                    <p className="hover:bg-neutral-800 text-sm text-neutral-200 hover:py-2 hover:px-2 rounded-lg" onClick={() => setServiceDropDown(!serviceDropDown)}>Services & Products</p>
                                    {serviceDropDown && (
                                       <ul className="border-l-2 pl-4 flex flex-col space-y-4 transition data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                                            <Link href="/builder" className="hover:bg-neutral-800 text-sm text-neutral-200 hover:py-2 hover:px-2 rounded-lg">Resume Builder</Link>
                                            <Link href="/builder" className="hover:bg-neutral-800 text-sm text-neutral-200 hover:py-2 hover:px-2 rounded-lg">Cover Letter Builder</Link>
                                            <Link href="/tracker" className="hover:bg-neutral-800 text-sm text-neutral-200 hover:py-2 hover:px-2 rounded-lg">Job Tracker</Link>
                                            <Link href="/feeds" className="hover:bg-neutral-800 text-sm text-neutral-200 hover:py-2 hover:px-2 rounded-lg">Community Building</Link>
                                        </ul> 
                                    )}
                                </ul>
                            </nav>

                            <SheetFooter>
                                {isAuthenticated ? (
                                    <SignOutButton redirectUrl="/">
                                        <Button className="h-9 px-3 bg-neutral-200 hover:bg-accent text-neutral-950 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground">Sign Out</Button>
                                    </SignOutButton>
                                ) : (
                                    <Link href="/auth/sign-in" className="h-9 px-3 bg-neutral-200 hover:bg-accent text-neutral-950 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground" >
                                        Sign In
                                    </Link>
                                )}
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
}: {
    title: string;
    description: string;
    href: string;
    src: string;
}) => {
    return (
        <Link href={href} className="flex space-x-2">
            <Image
                src={src}
                width={140}
                height={70}
                alt={title}
                className="flex-shrink-0 rounded-md shadow-2xl"
            />
            <div>
                <h4 className="text-xl font-bold mb-1 text-white">
                    {title}
                </h4>
                <p className="text-sm max-w-[10rem] text-neutral-300">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, ...rest }: any) => {
    return (
        <Link
            {...rest}
            className="text-neutral-200 hover:text-neutral-400 "
        >
            {children}
        </Link>
    );
};
