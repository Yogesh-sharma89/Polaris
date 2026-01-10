/* eslint-disable react-hooks/purity */
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel";

export const useProject = ()=>{
    return useQuery(api.projects.getProjects);
}

export const useProjectPartial = (limit:number)=>{
    return useQuery(api.projects.getPartial,{limit});
}

export const useCreateProject = ()=>{
    return useMutation(api.projects.createProject);
}

export const useProjectById = (id:Id<'projects'>)=>{
    return useQuery(api.projects.getProjectById,{id})
}

export const useRenameProject  = (projectId:Id<'projects'>)=>{
   
    return useMutation(api.projects.rename).withOptimisticUpdate((localstore,args)=>{
         
        const existingProject  =  localstore.getQuery(api.projects.getProjectById,{id:projectId});

        

        if(existingProject!==undefined && existingProject!==null){
            localstore.setQuery(
                api.projects.getProjectById,
                {id:projectId},
                {
                    ...existingProject,
                    name:args.name,
                    updateAt:Date.now()
                }
            )
        }

        //then push this updated project to all projects 

        const existingProjects = localstore.getQuery(api.projects.getProjects);

        if(existingProjects!==undefined){
            localstore.setQuery(
                api.projects.getProjects,
                {},
                existingProjects.map((project)=>{
                    return project._id===args.id ? {...project,name:args.name,updatedAt:Date.now()} : project
                })
            )
        }


    })
}