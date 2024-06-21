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

export const trackJob = mutation({
    args: {
        userId: v.id("users"),
        resumeId: v.id("resume"),
        company: v.string(),
        jobLink: v.string(),
        jobTitle: v.string(),
        location: v.string(),
        status: applicationStatus,
        notes: v.optional(v.string()),
        salary: v.optional(v.string()),
        contactInfo: v.optional(v.string()),
        applicationPlatform: v.optional(v.string()),
    }, handler: async (ctx, args) => {

        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) throw new ConvexError("Unauthorized!");

        return await ctx.db.insert("jobTracker", {
            ...args
        })   
    }
})