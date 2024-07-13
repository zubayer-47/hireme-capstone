"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { MoreVertical } from "lucide-react";

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
import { EditFeedModal } from "./edit-feed-modal";
import { useToast } from "@/components/ui/use-toast";


export const CardActionsDropdown = ({ feedId }: { feedId: Id<"feeds"> }) => {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { toast } = useToast();
  
    const deleteFeed = useMutation(api.feeds.deleteFeed);
  
    const handleDelete = async () => {
      try {
        await deleteFeed({ feedId });
        setIsAlertDialogOpen(false);
        toast({
          title: "Success",
          description: "Application has been deleted.",
          variant: "default"
        });
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Something went wrong. We weren't able to delete the feed.",
          variant: "default"
        });
      }
    }
  
    const handleEdit = () => {
      setIsDropdownOpen(false);
      setIsEditModalOpen(true);
    };
  
    return (
      <>
        <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="dark:text-neutral-200 text-neutral-800">Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="dark:text-neutral-400 text-neutral-700">
                This action cannot be undone. This will permanently delete your
                post and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-9 px-3 translate-hover border-none dark:text-neutral-200 text-neutral-600" onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-app-color h-9 px-3 text-neutral-100 hover:bg-app-color/80 translate-hover"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="outline-none" size="sm" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setIsDropdownOpen(false);
              setIsAlertDialogOpen(true);
            }}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <EditFeedModal 
          isOpen={isEditModalOpen}
          feedId={feedId}
          setIsOpen={setIsEditModalOpen}
        />
      </>
    )
  }