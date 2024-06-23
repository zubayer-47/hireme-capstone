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

export const ActionsDocumentTable = ({
    documentId
}: { documentId: Id<"resume"> }) => {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { toast } = useToast();

    const deleteDocument = useMutation(api.resume.deleteDocument);

    const handleDelete = async () => {

        try {
            setIsAlertDialogOpen(false);
            const res = await deleteDocument({ documentId });
            
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
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="translate-hover" onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDelete()}
                            className="dark:bg-neutral-900 dark:text-neutral-300 text-neutral-700 hover:bg-neutral-800 translate-hover"
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
                    <DropdownMenuItem className="cursor-pointer">Share</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer"><Link href={`/resume/${documentId}`}>Edit</Link></DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => {
                        setIsDialogOpen(false);
                        setIsAlertDialogOpen(true);
                    }}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}