"use client";


import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvexAuth, useMutation } from "convex/react"

export const useStoreUserEffect = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const { user } = useUser();

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
        return () => setUserId(null)

    }, [isAuthenticated, storeUser, user?.id])

    return {
        isLoading: isLoading || (isAuthenticated && userId === null),
        isAuthenticated: isAuthenticated && userId !== null,
    }
    
}