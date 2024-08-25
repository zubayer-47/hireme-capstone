import { 
    Skills,
    Profile, 
    Projects,
    Education,   
    WorkExperience 
} from "./types";
import { v } from "convex/values";
import { mutation, QueryCtx, MutationCtx, query, } from "./_generated/server";

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


export const readDocuments = query({
    args: {},
    handler: async(ctx, args) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        return await ctx.db
            .query("resume")
            .withIndex("by_userId", (q) => q.eq("userId", hasAccess._id))
            .collect();
    }
})

export const getResume = query({
    args: { resumeId: v.id("resume") },
    handler: async (ctx, {resumeId}) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const existingResume = await ctx.db.get(resumeId);

        if (!existingResume || existingResume.userId !== hasAccess._id) {
            throw new Error("Resume not found or not authorized to access the file.")
        }

        return existingResume;
    }
})

export const createDocument = mutation({
    args: { documentName: v.string() },
    handler: async (ctx, {
        documentName
    }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        return await ctx.db.insert("resume", {
            userId: hasAccess._id,
            documentName,
        });
    }
});

export const updateResumeFields = mutation({
    args: {
        resumeId: v.id("resume"),
        profile: v.optional(Profile),
        projects: v.optional(v.array(Projects)),
        skills: v.optional(v.array(Skills)),
        workExperience: v.optional(v.array(WorkExperience)),
        education: v.optional(v.array(Education)),
    }, handler: async (ctx, args) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;
        
        const { resumeId, ...updatedArgs } = args;

        const existingResume = await ctx.db.get(resumeId);

        if (!existingResume || existingResume.userId !== hasAccess._id) {
            throw new Error("Resume not found or not authorized to access the file.")
        }

        await ctx.db.patch(existingResume._id, { ...updatedArgs })
    }
});

export const deleteDocument = mutation({
    args: { resumeId: v.id("resume") }, 
    handler: async (ctx, { resumeId }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const existingResume = await ctx.db.get(resumeId);

        if (!existingResume || existingResume.userId !== hasAccess._id) {
            throw new Error("Resume not found or not authorized to access the file.")
        }

        await ctx.db.delete(existingResume._id);

        return true;
    }
})
