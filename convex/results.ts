import { v } from "convex/values";
import { internalMutation, MutationCtx, query, QueryCtx } from "./_generated/server";

const userIdentity = async (
    ctx: QueryCtx | MutationCtx,
) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized!");

    const user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

    if (!user) throw new Error("User not found!");

    return user;
}

export const getResults = query({
    args: {
        resumeId: v.id("resume"),
    },
    handler: async (ctx, { resumeId }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const results = await ctx.db
            .query("results")
            .withIndex("by_userId_resume_id", (q) => q.eq("userId", hasAccess._id).eq("resumeId", resumeId))
            .unique();

        if (!results) return null;
        
        return results;
    }
});

export const saveResults = internalMutation({
    args: {
        resumeId: v.id("resume"),
        jobDescriptionSummary: v.object({
            location: v.string(),
            jobPosition: v.string(),
            companyName: v.string(),
            salaryRange: v.string(),
            employmentType: v.string(),
            experienceLevel: v.string(),
            benefits: v.array(v.string()),
            educationalRequirement: v.string(),
            requiredSkills: v.array(v.string()),
            responsibilities: v.array(v.string()),
            preferredQualifications: v.array(v.string()),
        }),
        extractedKeywords: v.object({
            highImportance: v.array(v.string()),
            mediumImportance: v.array(v.string()),
            lowImportance: v.array(v.string()),
        }),
        userFeedback: v.object({
            matchingElements: v.array(v.string()),
            missingElements: v.array(v.string()),
            suggestions: v.array(v.string())
        })
    },
    handler: async (ctx, args) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const existingAIResults = await ctx.db
            .query("results")
            .withIndex("by_userId_resume_id", (q) => q.eq("userId", hasAccess._id).eq("resumeId", args.resumeId))
            .unique();

        // If the current resumeId being formatted doesn't have AI results generated
        // Create a new one else patch the exisitng one.    
        if (!existingAIResults) {
            await ctx.db.insert("results", {
                userId: hasAccess._id,
                ...args
            })
        } else {
            await ctx.db.patch(existingAIResults._id, {
                ...args
            })
        }
    }
})