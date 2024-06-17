import { query, mutation,  } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const generateUploadUrl = mutation(
    async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return "Unauthorized!";

        return await ctx.storage.generateUploadUrl();
    }
)

export const createResume = mutation({
    args: {

    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return "Unauthorized!";
    }
}) 