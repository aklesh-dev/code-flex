import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Defining a mutation named 'syncUser' which is used to synchronize user data
export const syncUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    image: v.optional(v.string()),
  },
   // Handler function for the mutation which performs the synchronization logic
  handler: async (ctx, args) => {
    // Querying the 'users' table to find a user with the matching 'clerkId'
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId)) // Filtering users where clerkId equals the provided clerkId
      .first(); // Retrieving the first matching user
     // If an existing user is found, return without making any changes
    if (existingUser) return;

    // If no existing user is found, insert the new user data into the 'users' table
    return await ctx.db.insert("users", args);
  },
});

export const updateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db.query("users").withIndex("by_clerk_id", q => q.eq("clerkId", args.clerkId)).first()

    if(!existingUser) return;

    return await ctx.db.patch(existingUser._id, args);
    
  },
})
