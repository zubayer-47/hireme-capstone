"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";


export const SignOut = () => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        router.refresh()
    }, [])
    return (
        <SignOutButton redirectUrl="/">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Image src={user?.imageUrl || `/svg/user-profile-placeholder.svg`} width={25} height={25} alt="User Profile Picture" className="rounded-full cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                        <SignOutButton redirectUrl="/">
                            Sign Out
                        </SignOutButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SignOutButton>
    )
}