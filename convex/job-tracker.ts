import { applicationStatus } from "./schema";
import { v, ConvexError } from "convex/values";
import { mutation, MutationCtx, QueryCtx, query } from "./_generated/server";


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

        const jobId = await ctx.db.insert("jobTracker", {
            ...args
        })

        
    }
})