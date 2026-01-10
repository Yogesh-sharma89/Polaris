'use client'

import Link from "next/link"
import { Id } from "../../convex/_generated/dataModel"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb"
import { Button } from "./ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import { UserButton } from "@clerk/nextjs"
import { useProjectById, useRenameProject } from "@/features/projects/hooks/useProject"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { CloudCheckIcon, LoaderIcon } from "lucide-react"
import { formatTimestamp } from "@/features/projects/components/projectItem"

const font = Poppins({
    subsets:['latin'],
    weight:['400','500','600','700']
})


const Navbar = ({projectId}:{projectId:Id<'projects'>}) => {


    const project = useProjectById(projectId);

    const renameProject = useRenameProject(projectId);

    const [isRenaming,setIsRenaming] = useState(false);

    const [name,setName] = useState('');

    const handleStartRename = ()=>{
        if(!project) return;

          setName(project?.name)
          setIsRenaming(true);

    }

    const handleSubmit = ()=>{

        if(!project) return ;

        const validname = name.trim();

        if(!validname || validname===project.name)return ;

        renameProject({id:project._id,name});
    }

    const handleKeyDown = (e:React.KeyboardEvent)=>{

        if(e.key==='enter'){
            handleSubmit();
        }
        else if(e.key==='Escape'){
            setIsRenaming(false);
        }
    }

  return (
    <nav className="flex w-full items-center justify-between p-3 gap-x-3 border-b bg-sidebar">

        <div className="flex items-center gap-x-1 ">

            <Breadcrumb className="mr-3">
              <BreadcrumbList className="gap-0">
                 <BreadcrumbItem>
                   <BreadcrumbLink className="flex items-center" asChild>

                      <Button className="w-fit! h-8! p-2!" asChild variant={'ghost'}>

                        <Link href={'/'} prefetch>

                            <Image
                             src={'/logo.svg'}
                             alt="Polaris Logo"
                             width={25}
                             height={25}
                            />

                            <span className={cn(
                                'text-sm font-medium',
                                font.className
                            )}>
                                Polaris
                            </span>
                        
                        </Link>

                      </Button>

                   </BreadcrumbLink>
                 </BreadcrumbItem>

                 <BreadcrumbSeparator/>

                 <BreadcrumbItem>
                 {
                    isRenaming ? 

                    <input
                      autoFocus 
                      type="text"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      onFocus={(e)=>e.currentTarget.select()}
                      onBlur={handleSubmit}
                      onKeyDown={handleKeyDown}
                      className="text-sm text-foreground font-medium outline-none rounded-sm p-1 
                       focus:ring-1 focus:ring-inset focus:ring-ring max-w-40 truncate
                      "
                    />
                    :
                
                   <BreadcrumbPage 
                   onClick={handleStartRename}
                   className="font-medium text-sm hover:text-primary truncate cursor-pointer max-w-30">
                     {project?.name}
                   </BreadcrumbPage>

                 }
                 </BreadcrumbItem>

              </BreadcrumbList>
            </Breadcrumb>

            {
                project?.importStatus==='Importing' 
                ? 
                (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <LoaderIcon className="text-muted-foreground size-5 animate-spin"/>
                        </TooltipTrigger>
                        <TooltipContent> 
                          <p>Importing...</p>    
                         </TooltipContent>
                    </Tooltip>
                )
                :
                (
                    project?.updateAt && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                               <CloudCheckIcon className="text-muted-foreground size-5"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                Saved {formatTimestamp(project.updateAt)}
                            </TooltipContent>
                        </Tooltip>
                    )
                )
            }

        </div>


       <div className="flex items-center">
          <UserButton
          />
       </div>

    </nav>
  )
}

export default Navbar
