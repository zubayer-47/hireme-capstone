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

const WEBSITE_URL = process.env.WEBSITE_URL;

export const Header = ({
  isAuthenticated
}: {
  isAuthenticated: boolean;
}) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className="relative w-full flex items-center justify-center">
      <div
        className="fixed max-w-xl mx-auto px-2 z-50 top-2 w-full"
      >
        <Menu setActive={setActive} isAuthenticated={isAuthenticated}>
          <AppLogo href="/" height={22.5} width={22.5} />
          <Link href="/about" className="text-neutral-200 hover:opacity-[0.8]">About</Link>
          <Link href="/contact" className="text-neutral-200 hover:opacity-[0.8]">Contact</Link>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/builder">Resume Builder</HoveredLink>
              <HoveredLink href="/builder">Cover Letter Builder</HoveredLink>
              <HoveredLink href="/tracker">Job Tracker</HoveredLink>
              <HoveredLink href="/feeds">Community Support</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Resume Builder"
                href={`${WEBSITE_URL}/builder`}
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Cover Letter Builder"
                href={`${WEBSITE_URL}/builder`}
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Job Tracker"
                href={`${WEBSITE_URL}/tracker`}
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Community Support"
                href={`${WEBSITE_URL}/feeds`}
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>
          {isAuthenticated ? (
              <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/auth/sign-in" className="h-9 px-3 bg-neutral-200 hover:bg-accent text-neutral-950 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground" >
              Sign In
            </Link>
          )}
        </Menu>
      </div>
    </header>
  )
}
