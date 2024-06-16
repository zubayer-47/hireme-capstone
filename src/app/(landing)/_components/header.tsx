"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import {
  Menu,
  MenuItem,
  HoveredLink,
  ProductItem
} from "@/components/animation/navbar-menu";
import { AppLogo } from "@/components/app-logo";
import { ButtonLink } from "@/components/button-link";

type HeaderProps = {
  isLoading: boolean;
  isAuthenticated: boolean;
}


export const Header = ({
  isLoading,
  isAuthenticated
}: HeaderProps) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className="relative w-full flex items-center justify-center">
      <div
        className="fixed inset-x-0 max-w-4xl mx-auto z-50 top-2"
      >
        <Menu setActive={setActive}>
          <AppLogo href="/" height={22.5} width={22.5} />
          <Link href="#" className="text-neutral-200">About</Link>
          <Link href="#" className="text-neutral-200">Contact</Link>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">Interface Design</HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Algochurn"
                href="https://algochurn.com"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Tailwind Master Kit"
                href="https://tailwindmasterkit.com"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Moonbeam"
                href="https://gomoonbeam.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Rogue"
                href="https://userogue.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>
          {isAuthenticated ? (
              <UserButton afterSignOutUrl="/" />
          ) : (
            <ButtonLink
              size="sm"
              name="Sign In" 
              href="/auth/sign-in"  
              className="bg-neutral-200 hover:bg-accent text-neutral-950 " 
            />
          )}
        </Menu>
      </div>
    </header>
  )
}
