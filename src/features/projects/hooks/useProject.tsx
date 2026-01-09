import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useProject = ()=>{
    return useQuery(api.projects.getProjects);
}

export const useProjectPartial = (limit:number)=>{
    return useQuery(api.projects.getPartial,{limit});
}

export const useCreateProject = ()=>{
    return useMutation(api.projects.createProject);
}