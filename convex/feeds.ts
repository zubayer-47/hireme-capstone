import { v, ConvexError } from "convex/values";
import { mutation, QueryCtx, MutationCtx, query, } from "./_generated/server";
import { reducer } from '../src/components/ui/use-toast';

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

export const getFeeds = query({
    args: { bookmarked: v.optional(v.boolean()) },
    handler: async (ctx, { bookmarked }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        let feeds = await ctx.db.query("feeds").collect();

        if (bookmarked) {
            const saved = await ctx.db
                .query("isSaved")
                .withIndex("by_userId", q => q.eq("userId", identity._id))
                .collect();
            
            feeds = feeds.filter(feed => saved.some((s) => s.feedId === feed._id));
        }

        return feeds;

    }
});

export const createFeed = mutation({
    args: {
        bio: v.string(),
        fileId: v.id("_storage"),
        upvoteCount: v.number(),
        downvoteCount: v.number(),
        username: v.string(),
        tags: v.array(v.string()),
        profImgUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        const fileUrl = await ctx.storage.getUrl(args.fileId);
        return await ctx.db.insert("feeds", { 
            ...args, 
            userId: identity._id,
            fileUrl: fileUrl ?? ""
        })
    }
});

export const editBioTagFeed = mutation({
    args: {
        feedId: v.id("feeds"),
        bio: v.string(),
        tags: v.array(v.string()),
    },
    handler: async (ctx, { bio, tags, feedId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        const feed = await ctx.db.get(feedId);

        if (!feed) throw new ConvexError("The feed you requested doesn't exist.");

        return await ctx.db.patch(feedId, {
            bio,
            tags,
        });

    }
});

export const vote = mutation({
    args: {
        upvote: v.boolean(),
        upvoteCount: v.number(),
        downvoteCount: v.number(),
        feedId: v.id("feeds")
    },
    handler: async (ctx, {
        upvote,
        downvoteCount,
        upvoteCount,
        feedId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        const feed = await ctx.db.get(feedId);

        if (!feed) throw new ConvexError("The feed you requested doesn't exist.");

        if (upvote) {
            await ctx.db.patch(feedId, {
                upvoteCount
            });
        } else {
            await ctx.db.patch(feedId, {
                downvoteCount
            });
        }
    }
});

export const comment = mutation({
    args: {
        commenterId: v.id("users"),
        comment: v.string(),
        feedId: v.id("feeds")
    },
    handler: async (ctx, { comment, commenterId, feedId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        const feed = await ctx.db.get(feedId);

        if (!feed) throw new ConvexError("The feed you requested doesn't exist.");

        const newComment = { commenterId, comment };

        const updatedComments = feed.comments ? [...feed.comments, newComment] : [newComment];

        return await ctx.db.patch(feed._id, {
            comments: updatedComments
        })
    }
});

export const deleteFeed = mutation({
    args: { feedId: v.id("feeds") },
    handler: async (ctx, { feedId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        return await ctx.db.delete(feedId);
    }
})


