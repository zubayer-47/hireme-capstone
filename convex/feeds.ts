import { v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx, } from "./_generated/server";
// import { GenericMutationCtx } from "convex/server";

// async function userIdentity(
//     ctx: QueryCtx | MutationCtx,
// ) {
//     const identity = await ctx.auth.getUserIdentity();
//         console.log({identity}, "feedUserIdentity")

//     if (!identity) throw new Error("Unauthorized!");

//     const user = await ctx.db
//         .query("users")
//         .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
//         .unique();

//     if (!user) {
//         // await ctx.db.insert("users", {
//         //     name: identity.name!,
//         //     profileUrl: identity.pictureUrl!,
//         //     tokenIdentifier: identity.tokenIdentifier,
//         // })
//     }
    
//     // if (!user) throw new Error("User not found!");

//     return user;
// }

async function userIdentity(ctx: QueryCtx | MutationCtx) {
    // Get the authenticated user's identity
    // try {
        const identity = await ctx.auth.getUserIdentity();
    console.log({ identity, have: "insert" in ctx.db }, "feedUserIdentity");

    if (!identity) throw new Error("Unauthorized!");

    // Check if the user exists in the database
    let user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

        // console.log({user})

    // If the user does not exist, create a new user record
    if (!user && "insert" in ctx.db) {

        console.log("insert" in ctx.db, "is insert exist")
       const user = await ctx.db.insert("users", {
            name: identity.name!,
            profileUrl: identity.pictureUrl!,
            tokenIdentifier: identity.tokenIdentifier,
        });

        // return user;

        // throw new Error("User not found! XXXXX");
    }

    // Return the user (whether newly created or pre-existing)
    return user;
    // } catch (error) {
    //     console.log(error, "Not Found! User XXXXXXX")
    // }
}

export const generateUploadUrl = mutation(
    async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Unauthorized!");

        return await ctx.storage.generateUploadUrl();
    }
)

type CommentCounts = {
    [feedId: string]: number;
};

export const getFeeds = query({
    args: {
        filters: v.optional(
            v.union(
                v.literal("bookmarks"), 
                v.literal("recent"), 
                v.literal("most-upvotes"), 
                v.literal("most-discussed")
            ))
    },
    handler: async (ctx, { filters }) => {
        try {
            const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        let feeds = await ctx.db.query("feeds").order("desc").collect();

        if (filters === "bookmarks") {
            const saved = await ctx.db
                .query("isSaved")
                .withIndex("by_userId", q => q.eq("userId", hasAccess._id))
                .collect();

            feeds = feeds.filter(feed => saved.some((s) => s.feedId === feed._id));
        } else if (filters === "most-upvotes") {
            feeds.sort((a, b) => b.upVoteCount - a.upVoteCount);

        } else if (filters === "most-discussed") {
            const comments = await ctx.db.query("comments").collect();

            let commentCounts: CommentCounts = {};
            comments.forEach(comment => {
                if (comment.feedId in commentCounts) {
                    commentCounts[comment.feedId]++;
                } else {
                    commentCounts[comment.feedId] = 1;
                }
            });

            feeds.sort((a, b) => {
                const countA = commentCounts[a._id] || 0;
                const countB = commentCounts[b._id] || 0;
                return countB - countA; 
            });

        }

        return feeds;
        } catch (error) {
            console.log({error}, "Error from GetFeeds")
        }

    }
});

export const getFeedWithId = query({
    args: { feedId: v.id("feeds") },
    handler: async (ctx, { feedId }) => {
        const identity = await userIdentity(ctx);

        if (!identity) throw new Error("Unauthorized");

        return await ctx.db.get(feedId);
    }
})

export const createFeed = mutation({
    args: {
        bio: v.string(),
        fileId: v.id("_storage"),
        tags: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const fileUrl = await ctx.storage.getUrl(args.fileId);
        return await ctx.db.insert("feeds", {
            ...args,
            userId: hasAccess._id,
            fileUrl: fileUrl ?? "",
            username: hasAccess.name,
            upVoteCount: 0,
            downVoteCount: 0,
            voterIds: [],
            profImgUrl: hasAccess.profileUrl
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
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const feed = await ctx.db.get(feedId);

        if (!feed) throw new Error("The feed you requested doesn't exist.");

        return await ctx.db.patch(feedId, {
            bio,
            tags,
        });

    }
});


export const deleteFeed = mutation({
    args: { feedId: v.id("feeds") },
    handler: async (ctx, { feedId }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        return await ctx.db.delete(feedId);
    }
});


export const vote = mutation({
    args: {
        feedId: v.id("feeds"),
        voteType: v.union(v.literal("upvote"), v.literal("downvote"))
    },
    handler: async (ctx, { feedId, voteType }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const feed = await ctx.db.get(feedId);

        if (!feed) throw new Error("The ID you provided is invalid.");

        const voterIndex = feed.voterIds.findIndex(v => v.voterId === hasAccess._id);
        if (voterIndex !== -1) {
            const existingVote = feed.voterIds[voterIndex]
            if (existingVote.voterId === hasAccess._id) {
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
            feed.voterIds.push({ voterId: hasAccess._id, voteType })
        }

        await ctx.db.patch(feedId, {
            upVoteCount: feed.upVoteCount,
            downVoteCount: feed.downVoteCount,
            voterIds: feed.voterIds,
        })
    }
});


export const bookmarkFeed = mutation({
    args: {
        feedId: v.id("feeds"),
    },
    handler: async (ctx, { feedId }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const feed = await ctx.db.get(feedId);

        if (!feed) throw new Error("The ID you provided is invalid.");

        return await ctx.db.insert("isSaved", {
            feedId,
            userId: hasAccess._id
        })
    }
})

export const unbookmarkFeed = mutation({
    args: {
        feedId: v.id("feeds"),
    },
    handler: async (ctx, { feedId }) => {
        const hasAccess = await userIdentity(ctx);

        if (!hasAccess) return null;

        const feed = await ctx.db.get(feedId);

        if (!feed) throw new Error("The ID you provided is invalid.");

        const savedFeed = await ctx.db.query("isSaved").withIndex("by_userId_feedId", q => q.eq("userId", hasAccess._id).eq("feedId", feedId)).unique();

        if (!savedFeed) throw new Error("The ID you provided is invalid.");

        return await ctx.db.delete(savedFeed._id)
    }
})


