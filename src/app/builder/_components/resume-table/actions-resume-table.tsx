"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { MoreHorizontal } from "lucide-react";

import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const ActionsResumeTable = ({
    resumeId
}: { resumeId: Id<"resume"> }) => {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { toast } = useToast();

    const deleteDocument = useMutation(api.resume.deleteDocument);

    const handleDelete = async () => {

        try {
            setIsAlertDialogOpen(false);
            const res = await deleteDocument({ resumeId });
            
            if (res) {
               toast({
                    title: "Success",
                    description: "Document has been deleted.",
                    variant: "default"
                }); 
            }
            
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete document.",
                variant: "destructive"
            }); 
        }
    }
    return (
        <>
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="dark:text-white text-neutral-800">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-neutral-200 text-neutral-700">
                            This action cannot be undone. This will permanently delete your
                            resume and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="h-9 px-3 translate-hover border-none dark:text-white text-neutral-600" onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDelete()}
                            className="h-9 px-3 bg-app-color text-neutral-200  hover:bg-app-color/80 translate-hover"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 dark:text-neutral-300 text-neutral-700" >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer"><Link href={`/builder/resume/${resumeId}`}>Open</Link></DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => {
                        setIsDialogOpen(false);
                        setIsAlertDialogOpen(true);
                    }}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}