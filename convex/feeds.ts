import { v, ConvexError } from "convex/values";
import { mutation, QueryCtx, MutationCtx, query, } from "./_generated/server";

async function userIdentity(
    ctx: QueryCtx | MutationCtx,
) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    const user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();
    
    if (!user) return null;

    return user;
}

export const generateUploadUrl = mutation(
    async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new ConvexError("Unauthorized!");

        return await ctx.storage.generateUploadUrl();
    }
)

export const getFeeds = query({
    args: {}, 
    handler: async (ctx, args) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        return await ctx.db.query("feeds").collect();
    }
});

export const createFeed = mutation({
    args: {
        bio: v.string(),
        fileId: v.id("_storage"),
        fileUrl: v.string(),
        upvotes: v.number(),
        downVotes: v.number(),
        username: v.string(),
        tags: v.array(v.string()),
    }, 
    handler: async (ctx, args) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        return await ctx.db.insert("feeds", { ...args, userId: identity._id} )
    }
});


