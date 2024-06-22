"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

import { MoreHorizontal } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";



export const ActionsTable = ({
    application
}: { application: Doc<"applications"> }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const { toast } = useToast();

    const deleteApplication = useMutation(api.applications.deleteApplication)

    return (
        <>
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="transform hover:-translate-y-1 transition-all duration-400" onClick={() => setIsConfirmOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                await deleteApplication({
                                    applicationId: application._id,
                                });
                                toast({
                                    title: "Sucess",
                                    description: "Application has been deleted.",
                                    variant: "default"
                                })
                                setIsConfirmOpen(false)
                            }}
                            className="bg-primary-color/80 text-white hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* Open modal here */}
                    <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsConfirmOpen(true)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}