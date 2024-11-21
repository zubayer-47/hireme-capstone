

import Link from "next/link";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const FilterFeedDropdown = () => {

    return (
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2 dark:text-white text-neutral-600  dark:bg-neutral-800 hover:dark:bg-neutral-900 bg-neutral-200 hover:bg-neutral-100 border" size="sm">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter Feed
                </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link href="/feeds?filter=recent">Recent</Link>
            </DropdownMenuItem>
            <DropdownMenuItem >
                <Link href="/feeds?filter=most-discussed">Most Discussed</Link>
            </DropdownMenuItem>
            <DropdownMenuItem >
                <Link href="/feeds?filter=most-upvotes">Most Upvotes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem >
                <Link href="/feeds?filter=bookmarks">Bookmarks</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    )
}