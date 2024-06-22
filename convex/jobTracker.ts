import { applicationStatus } from "./schema";
import { v, ConvexError } from "convex/values";
import { mutation, MutationCtx, QueryCtx, query } from "./_generated/server";

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

export const createJobToTrack = mutation({
    args: {
        userId: v.id("users"),
        company: v.string(),
        jobLink: v.string(),
        jobTitle: v.string(),
        location: v.string(),
        dateApplied: v.string(),
        status: applicationStatus,
        salary: v.optional(v.string()),
        recruiterInfo: v.optional(v.string()),
    }, handler: async (ctx, args) => {

        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) throw new ConvexError("Unauthorized!");

        return await ctx.db.insert("jobTracker", {
            ...args
        })
    }
});

export const getJobListings = query({
    args: {
    }, handler: async (ctx, args) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) throw new ConvexError("Unauthorized!");

        return await ctx.db
            .query("jobTracker")
            .withIndex("by_userId", (q) => q.eq("userId", hasAccess._id))
            .collect();
    }
})