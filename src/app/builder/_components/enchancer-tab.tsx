"use client";

import {
    Sheet,
    SheetTitle,
    SheetClose,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const EnhancerTab = () => {
    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button
                    size="sm"
                    className="flex items-center gap-1 text-sm bg-app-color hover:bg-app-color/80 text-neutral-200 translate-hover rounded-lg"
                >
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span className="whitespace-nowrap">Enhancer</span>
                </Button>
            </SheetTrigger>
            <SheetContent >
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
