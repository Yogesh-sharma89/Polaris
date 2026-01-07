import { defineTable,defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  
    projects: defineTable({
        name:v.string(),
        ownerId:v.string(),
        importStatus:v.optional(
            v.union(
                v.literal('Importing'),
                v.literal('Completed'),
                v.literal('Failed')
            )
        )
    }).index("by_owner",['ownerId'])
    
})
