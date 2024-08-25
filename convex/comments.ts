import { v } from 'convex/values';
import { query, mutation, QueryCtx, MutationCtx } from './_generated/server';

async function userIdentity(
    ctx: QueryCtx | MutationCtx,
) {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) throw new Error("Unauthorized!");

    const user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

    if (!user) throw new Error("User not found!");

    return user;
}

export const getAllCommentsOnFeed = query({
    args: { feedId: v.id("feeds") },
    handler: async (ctx, { feedId }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

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
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        await ctx.db.insert("comments", {
            ...args,
            userId: hasAccess._id,
            username: hasAccess.name,   
            profileUrl: hasAccess.profileUrl 
        })
    }
});

export const editComment = mutation({
    args: { commentId: v.id("comments"), comment: v.string() },
    handler: async (ctx, { commentId, comment }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        return await ctx.db.patch(commentId, {
            comment
        });
    }
});

export const deleteComment = mutation({
    args: { commentId: v.id("comments") },
    handler: async (ctx, { commentId }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        return await ctx.db.delete(commentId);
    }
})

