"use client";

import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem
} from "@/components/animation/navbar-menu";
import { AppLogo } from "@/components/app-logo";
import { SignOut } from "@/components/sign-out-button";
import Link from "next/link";
import { useState } from "react";

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
                src="/landing-images/builder.png"
                description="Build your professional ATS resume  in just 5 minutes and with our AI-powered resume enhancer."
              />
              <ProductItem
                title="Cover Letter Builder"
                href={`${WEBSITE_URL}/builder`}
                src="/landing-images/cover-letter.png"
                description="Build your professional cover letter in just 5 minutes."
              />
              <ProductItem
                title="Job Tracker"
                href={`${WEBSITE_URL}/tracker`}
                src="/landing-images/tracker.png"
                description="Track your job application progress and stay motivated throughout the job search journey."
              />
              <ProductItem
                title="Community Support"
                href={`${WEBSITE_URL}/feeds`}
                src="/landing-images/feeds.png"
                description="Connect with a network of job seekers, share experiences, and learn valuable tips to land your next interview."
              />
            </div>
          </MenuItem>
          {isAuthenticated ? (
              <SignOut />
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
