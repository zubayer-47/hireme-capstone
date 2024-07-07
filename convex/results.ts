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
});

export const saveResults = internalMutation({
    args: {
        resumeId: v.id("resume"),
        jobDescriptionSummary: v.object({
            jobPosition: v.string(),
            companyName: v.string(),
            location: v.string(),
            employmentType: v.union(v.literal("Full-Time"), v.literal("Part-Time"), v.literal("Hybrid")),
            responsibilities: v.array(v.string()),
            requiredSkills: v.array(v.string()),
            preferredQualification: v.array(v.string()),
            experienceLevel: v.string(),
            educationalRequirements: v.string(),
            salaryRange: v.string(),
            benefits: v.array(v.string())
        }),
        extractedKeywords: v.object ({
            highImportance: v.array(v.string()),
            mediumImportance: v.array(v.string()),
            lowImportance: v.array(v.string()),
        }),
        userFeedback: v.object({
            missingKeywords: v.array(v.string()),
            suggestions: v.array(v.string())
        })
    },
    handler: async (ctx, args) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        await ctx.db.insert("results", {
            userId: identity._id,
            ...args
        })
    }
})