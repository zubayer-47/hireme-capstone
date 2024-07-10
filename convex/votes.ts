import { ConvexError, v } from "convex/values";
import { query, mutation, MutationCtx, QueryCtx } from "./_generated/server";

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

export const getVotes = query({
    args: {
        userId: v.id("users"),
        feedId: v.id("feeds"),
        voteType: v.union(v.literal("upvote"), v.literal("downvote")),
    },
    handler: async (ctx, args) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");
    }
})