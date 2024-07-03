import { ConvexError, v } from "convex/values";
import { internalMutation, MutationCtx, query, QueryCtx } from "./_generated/server";

const userIdentity = async (
    ctx: QueryCtx | MutationCtx,
) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    const user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

    if (!user) return null;

    return user;
}

export const getResults = query({
    args: {
        resumeId: v.id("resume"),
    },
    handler: async (ctx, { resumeId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        const results = await ctx.db
            .query("results")
            .withIndex("by_userId_resume_id", (q) => q.eq("userId", identity._id).eq("resumeId", resumeId))
            .unique();


        if (!results) throw new ConvexError("Unable to find the AI Feedback Result");

        return results;
    }
})