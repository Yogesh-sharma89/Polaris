
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useProject } from "../hooks/useProject";
import { CommandList } from "cmdk";
import { getProjectIcon } from "./projectItem";

interface ProjectCommandDialogProps{
    open:boolean,
    onOpenChange : (open:boolean)=>void
}

const ProjectDialog = ({
 open,onOpenChange
}:ProjectCommandDialogProps) => {
 
   

   const router = useRouter();

   const projects = useProject();

   const handleProjectSelect = (projectId:string)=>{
     router.push(`/projects/${projectId}`)
    onOpenChange(false)
   }

   

  return (

    <CommandDialog
    open={open}
    onOpenChange={onOpenChange}
    className="rounded-md border max-w-125"
    title="Search Projects"
    description="Search and navigate to projects"
    >
      <CommandInput placeholder="Search projects..."/>

      <CommandList>
        <CommandEmpty>No projects found.</CommandEmpty>
        <CommandGroup heading="Projects" className="flex flex-col gap-4">
          {
            projects?.map((project)=>(
                <CommandItem key={project._id}
                value={`${project.name}-${project._id}`}
                onSelect={()=>handleProjectSelect(project._id)}
                >

                    { getProjectIcon(project) }
                    <span>{project.name}</span>


                </CommandItem>
            ))
          }
        </CommandGroup>
      </CommandList>

    </CommandDialog>
    
  )
}

export default ProjectDialog
