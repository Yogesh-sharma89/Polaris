import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { toast } from "sonner";

export const createProject = mutation({
    args:{
        name:v.string()
    },
    handler:async(ctx,args)=>{

        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            toast.error('Unauthenticated');
            throw new Error('Not authenticated')
        }
        return  await ctx.db.insert('projects',{name:args.name,ownerId:identity.subject})
    }
})

export const getProjects = query({
   
    handler:async(ctx)=>{
          const userId = await ctx.auth.getUserIdentity();

            if(!userId){
                return [];
            }

        return await ctx.db.query('projects').withIndex('by_owner',(q)=>q.eq('ownerId',userId.subject)).order('desc').collect();
    }
})