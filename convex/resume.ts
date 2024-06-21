import { query, mutation, QueryCtx, MutationCtx, } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { 
    Skills,
    Profile, 
    Projects,
    Education,   
    WorkExperience 
} from "./resumeTypes";

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

export const initialResume = mutation({
    args: { documentName: v.string() },
    handler: async (ctx, {
        documentName
    }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) throw new ConvexError("Unauthorized!");

        return await ctx.db.insert("resume", {
            userId: hasAccess._id,
            documentName,
        });
    }
});

export const updateResumeFields = mutation({
    args: {
        documentId: v.id("resume"),
        profile: v.optional(Profile),
        projects: v.optional(Projects),
        skills: v.optional(Skills),
        workExperience: v.optional(WorkExperience),
        education: v.optional(Education),
    }, handler: async (ctx, {
        documentId,
        profile,
        projects,
        skills,
        workExperience,
        education
    }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) throw new ConvexError("Unauthorized!");

        const existingResume = await ctx.db.get(documentId);

        if (!existingResume || existingResume.userId !== hasAccess._id) {
            throw new ConvexError("Resume not found or not authorized to access the file.")
        }

        await ctx.db.patch(existingResume._id, {
            profile,
            projects,
            skills,
            workExperience,
            education,
        })
    }

})
