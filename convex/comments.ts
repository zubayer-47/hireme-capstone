import { ConvexError, v } from 'convex/values';
import { query, mutation, QueryCtx, MutationCtx } from './_generated/server';

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

export const getAllCommentsOnFeed = query({
    args: { feedId: v.id("feeds") },
    handler: async (ctx, { feedId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        return await ctx.db.query("comments")
            .withIndex("by_feedId", (q) => q.eq("feedId", feedId))
            .order("desc")
            .collect();
    }
})

export const createComment = mutation({
    args: { 
        feedId: v.id("feeds"), 
        comment: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        await ctx.db.insert("comments", {
            ...args,
            userId: identity._id,
            username: identity.name,   
            profileUrl: identity.profileUrl 
        })
    }
});

export const editComment = mutation({
    args: { commentId: v.id("comments"), comment: v.string() },
    handler: async (ctx, { commentId, comment }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        return await ctx.db.patch(commentId, {
            comment
        });
    }
});

export const deleteComment = mutation({
    args: { commentId: v.id("comments") },
    handler: async (ctx, { commentId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        return await ctx.db.delete(commentId);
    }
})

