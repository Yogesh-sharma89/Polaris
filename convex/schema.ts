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
        ),
        exportStatus:v.optional(
            v.union(
                v.literal('Exporting'),
                 v.literal('Completed'),
                v.literal('Failed'),
                v.literal('Cancelled')
            )
        ),
        updateAt:(v.number()),
        exportRepoUrl:v.optional(v.string())
    }).index("by_owner",['ownerId'])
    
})
