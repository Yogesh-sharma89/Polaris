import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { verifyAuth } from "./auth";
import { Id } from './_generated/dataModel';

export const createProject = mutation({
    args:{
        name:v.string()
    },
    handler:async(ctx,args)=>{

        const identity = await  verifyAuth(ctx);
        return  await ctx.db.insert('projects',{name:args.name,ownerId:identity.subject,updateAt:Date.now()})
    }
})

export const getProjects = query({
   
    handler:async(ctx)=>{
          
        const identity = await verifyAuth(ctx);

        return await ctx.db.query('projects').withIndex('by_owner',(q)=>q.eq('ownerId',identity.subject)).order('desc').collect();
    }
})

export const getPartial = query({
    
    args:{limit:v.number()},

    handler:async(ctx,args)=>{

       const identity = await verifyAuth(ctx);

       return await ctx.db.query('projects').withIndex('by_owner',(q)=>q.eq('ownerId',identity.subject)).order('desc').take(args.limit);
    }
})

export const getProjectById = query({
    args:{id:v.id('projects')},

    handler:async(ctx , args)=>{

        const identity = await verifyAuth(ctx);

        //check if this project is exist 

        const project = await ctx.db.get('projects',args.id);

        if(!project){
            throw new Error('Project not found!')
        }

        if(project.ownerId!==identity.subject){
            throw new Error('Unauthorized access')
        }

        return project;

        
    }
})


export const rename = mutation({
    args:{id:v.id('projects'),name:v.string()},

    handler:async(ctx , args)=>{

        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get('projects',args.id);

        if(!project){
            throw new Error('Project not found!')
        }

        if(project.ownerId!==identity.subject){
            throw new Error('Unauthorized access')
        }

        //now rename the project 

        await ctx.db.patch('projects',args.id,{name:args.name,updateAt:Date.now()});
    }
})