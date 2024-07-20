import { ApplicationStatus } from "./types";
import { v } from "convex/values";
import { mutation, MutationCtx, QueryCtx, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

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

const checkExistingApplication = async (
    ctx: QueryCtx | MutationCtx,
    applicationId: Doc<"applications">["_id"]
) => {
    const hasAccess = await userIdentity(ctx);

    if (!hasAccess) throw new Error("Unauthorized!");

    const existingApplication = await ctx.db.get(applicationId);

    if (!existingApplication || existingApplication.userId !== hasAccess._id) {
        throw new Error("Job Application not found or not authorized to access the file.")
    }

    return {
        hasAccess,
        existingApplication
    };
}

export const createApplication = mutation({
    args: {
        company: v.string(),
        jobLink: v.string(),
        jobTitle: v.string(),
        location: v.string(),
        dateApplied: v.string(),
        status: ApplicationStatus,
        salary: v.optional(v.string()),
        recruiterInfo: v.optional(v.string()),
    }, handler: async (ctx, args) => {

        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) throw new Error("Unauthorized!");

        return await ctx.db.insert("applications", {
            userId: hasAccess._id,
            ...args
        })
    }
});


export const readApplications = query({
    args: {
    }, handler: async (ctx, args) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) throw new Error("Unauthorized!");

        return await ctx.db
            .query("applications")
            .withIndex("by_userId", (q) => q.eq("userId", hasAccess._id))
            .collect();
    }
});

export const getExistingApplication = query({
    args: { applicationId: v.id("applications")},
    handler: async (ctx, { applicationId }) => {
        const { existingApplication } = await checkExistingApplication(ctx, applicationId);

        return existingApplication;
    }
})

export const updateApplication = mutation({
    args: {
        company: v.optional(v.string()),
        jobLink: v.optional(v.string()),
        jobTitle: v.optional(v.string()),
        location: v.optional(v.string()),
        dateApplied: v.optional(v.string()),
        status: v.optional(ApplicationStatus),
        salary: v.optional(v.string()),
        applicationId: v.id("applications"),
        recruiterInfo: v.optional(v.string()),
    }, handler: async (ctx, args) => {
        const { existingApplication, hasAccess } = await checkExistingApplication(ctx, args.applicationId);
        
        const { applicationId, ...updatedArgs } = args;

        await ctx.db.patch(existingApplication._id, {
            userId: hasAccess._id,
            ...updatedArgs
        })

    }
});

export const deleteApplication = mutation({
    args: {
        applicationId: v.id("applications"),
    }, handler: async (ctx, { applicationId }) => {
        const { existingApplication } = await checkExistingApplication(ctx, applicationId);
        
        await ctx.db.delete(existingApplication._id);
    }
})

export const takeNotes = mutation({
    args: {
        notes: v.string(),
        applicationId: v.id("applications"),
    }, handler: async (ctx, { applicationId, notes }) => {
        const { existingApplication } = await checkExistingApplication(ctx, applicationId);
        
        return await ctx.db.patch(existingApplication._id, {
            ...existingApplication,
            notes
        })
    }
});