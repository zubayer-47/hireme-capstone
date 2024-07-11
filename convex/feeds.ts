import { v, ConvexError } from "convex/values";
import { mutation, QueryCtx, MutationCtx, query, } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

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
    args: { 
        bookmarked: v.optional(v.boolean()),
    },
    handler: async (ctx, { bookmarked }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        let feeds = await ctx.db.query("feeds").order("desc").collect();

        if (bookmarked === true) {
            const saved = await ctx.db
                .query("isSaved")
                .withIndex("by_userId", q => q.eq("userId", identity._id))
                .collect();

            feeds = feeds.filter(feed => saved.some((s) => s.feedId === feed._id));
        }

        return feeds;

    }
});

export const getFeedWithId = query({
    args: { feedId: v.id("feeds") },
    handler: async (ctx, { feedId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized");

        return await ctx.db.get(feedId);
    }
})

export const createFeed = mutation({
    args: {
        bio: v.string(),
        fileId: v.id("_storage"),
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
            fileUrl: fileUrl ?? "",
            username: identity.name,
            upVoteCount: 0,
            downVoteCount: 0,
            voterIds: [],
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


export const deleteFeed = mutation({
    args: { feedId: v.id("feeds") },
    handler: async (ctx, { feedId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        return await ctx.db.delete(feedId);
    }
});


export const vote = mutation({
    args: {
        feedId: v.id("feeds"),
        voteType: v.union(v.literal("upvote"), v.literal("downvote"))
    },
    handler: async (ctx, { feedId, voteType }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new ConvexError("Unauthorized!");

        const feed = await ctx.db.get(feedId);

        if (!feed) throw new ConvexError("The ID you provided is invalid.");

        const voterIndex = feed.voterIds.findIndex(v => v.voterId === identity._id);
        if (voterIndex !== -1) {
            const existingVote = feed.voterIds[voterIndex]
            if (existingVote.voterId === identity._id) {
                if (voteType === "upvote") {
                    feed.upVoteCount -= 1;
                } else if (voteType === "downvote") {
                    feed.downVoteCount -= 1;
                }
                feed.voterIds.splice(voterIndex, 1);
            } else {
                if (existingVote.voteType === "upvote") {
                    feed.upVoteCount -= 1;
                    feed.downVoteCount += 1;
                } else if (existingVote.voteType === "downvote") {
                    feed.downVoteCount -= 1;
                    feed.upVoteCount += 1;
                }
                feed.voterIds[voterIndex].voteType = voteType;
            }

        } else {
            if (voteType === "upvote") {
                feed.upVoteCount += 1;
            } else if (voteType === "downvote") {
                feed.downVoteCount += 1;
            }
            feed.voterIds.push({ voterId: identity._id, voteType })
        }

        await ctx.db.patch(feedId, {
            upVoteCount: feed.upVoteCount,
            downVoteCount: feed.downVoteCount,
            voterIds: feed.voterIds,
        })
    }
})


