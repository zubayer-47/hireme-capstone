import {
    Heading,
    Greeting,
    RecruiterInfo,
    FirstParagraph,
    MiddleParagraph,
    ClosingParagraph
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
    handler: async (ctx, args) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        return await ctx.db.query("coverLetter")
            .withIndex("by_userId", q => q.eq("userId", hasAccess._id))
            .collect();
    }
});

export const getCoverLetter = query({
    args: { coverLetterId: v.id("coverLetter") },
    handler: async (ctx, { coverLetterId }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const existingCoverLetter = await ctx.db.get(coverLetterId);

        if (!existingCoverLetter || existingCoverLetter.userId !== hasAccess._id) {
            throw new Error("Resume not found or not authorized to access the file.")
        }

        return existingCoverLetter;
    }
});

export const createDocument = mutation({
    args: { documentName: v.string() },
    handler: async (ctx, {
        documentName
    }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        return await ctx.db.insert("coverLetter", {
            userId: hasAccess._id,
            documentName,
        });
    }
});

export const updateCoverLetterFields = mutation({
    args: {
        coverLetterId: v.id("coverLetter"),
        heading: v.optional(Heading),
        greeting: v.optional(Greeting),
        recruiterInfo: v.optional(RecruiterInfo),
        firstParagraph: v.optional(FirstParagraph),
        middleParagraph: v.optional(MiddleParagraph),
        closingParagraph: v.optional(ClosingParagraph),
    },
    handler: async (ctx, args) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const { coverLetterId, ...updatedArgs } = args;

        const existingCoverLetter = await ctx.db.get(coverLetterId);

        if (!existingCoverLetter || existingCoverLetter.userId !== hasAccess._id) {
            throw new Error("Resume not found or not authorized to access the file.")
        }

        await ctx.db.patch(coverLetterId, { ...updatedArgs })
    }
})


export const deleteDocument = mutation({
    args: { coverLetterId: v.id("coverLetter") },
    handler: async (ctx, { coverLetterId }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const existingCoverLetter = await ctx.db.get(coverLetterId);

        if (!existingCoverLetter || existingCoverLetter.userId !== hasAccess._id) {
            throw new Error("Resume not found or not authorized to access the file.")
        }

        await ctx.db.delete(existingCoverLetter._id);

        return true;
    }
});




