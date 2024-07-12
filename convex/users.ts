import { ConvexError } from "convex/values";
import { mutation, MutationCtx, QueryCtx, query  } from "./_generated/server";

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new ConvexError("Unauthorized!");
        
        // Check if the user is already stored in the database
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();
        
        if (user !== null) {
            // If the user is already in the database but the name change, 
            // Patch the new name
            if (user.name !== identity.name) {
                await ctx.db.patch(user._id, { 
                    name: identity.name,
                    profileUrl: identity.pictureUrl
                })
            }

            return user._id;
        }

        // If it's a new user, we create a new one
        return await ctx.db.insert("users", {
            name: identity.name!,
            profileUrl: identity.pictureUrl!,
            tokenIdentifier: identity.tokenIdentifier,
        })
    }
})

export const getUser = async (
    ctx: QueryCtx | MutationCtx,
    tokenIdentifier: string
) => {
    const user = await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier)).unique();

    if (!user) throw new ConvexError("User not found!");

    return user;
}

export const getSelf = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return null;

        const user = await getUser(ctx, identity.tokenIdentifier);

        if (!user) return null;

        return user;
    }
})
