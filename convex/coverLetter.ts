import {
    Heading,
    Greeting,
    RecruiterInfo,
    FirstParagraph,
    MiddleParagraph,
    ClosingParagraph
} from "./types";
import { v, ConvexError } from "convex/values";
import { mutation, QueryCtx, MutationCtx, query, } from "./_generated/server";

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



export const readDocuments = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        return await ctx.db.query("coverLetter")
            .withIndex("by_userId", q => q.eq("userId", identity._id))
            .collect();
    }
});

export const getCoverLetter = query({
    args: { coverLetterId: v.id("coverLetter") },
    handler: async (ctx, { coverLetterId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        const existingCoverLetter = await ctx.db.get(coverLetterId);

        if (!existingCoverLetter || existingCoverLetter.userId !== identity._id) {
            throw new ConvexError("Resume not found or not authorized to access the file.")
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

        if (!hasAccess) throw new ConvexError("Unauthorized!");

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
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        const { coverLetterId, ...updatedArgs } = args;

        const existingCoverLetter = await ctx.db.get(coverLetterId);

        if (!existingCoverLetter || existingCoverLetter.userId !== identity._id) {
            throw new ConvexError("Resume not found or not authorized to access the file.")
        }

        await ctx.db.patch(coverLetterId, { ...updatedArgs })
    }
})


export const deleteDocument = mutation({
    args: { coverLetterId: v.id("coverLetter") },
    handler: async (ctx, { coverLetterId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        const existingCoverLetter = await ctx.db.get(coverLetterId);

        if (!existingCoverLetter || existingCoverLetter.userId !== identity._id) {
            throw new ConvexError("Resume not found or not authorized to access the file.")
        }

        await ctx.db.delete(existingCoverLetter._id);

        return true;
    }
});




