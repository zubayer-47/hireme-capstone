"use client";


import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useStoreUserEffect = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
    console.log({isAuthenticated},'convexAuth')
    const { user } = useUser();
    const router = useRouter();

    const [userId, setUserId] = useState<Id<"users"> | null>(null);
    const storeUser = useMutation(api.users.store);

    useEffect(() => {
        // if the user is not login don't do anything
        if (!isAuthenticated) return;

        // Store the new user in the database
        const createUser = async () => {
            const id = await storeUser();
            setUserId(id)
        }

        createUser();
        router.refresh();
        return () => setUserId(null)

    }, [isAuthenticated, storeUser, user?.id])

    return {
        isLoading: isLoading || (isAuthenticated && userId === null),
        isAuthenticated: isAuthenticated && userId !== null,
    }
    
}