'use client'
import { cn } from "@/lib/utils"
import { Id } from "../../../../convex/_generated/dataModel"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"

const Tab = (
    {label,isActive,onClick}:{label:string,isActive:boolean , onClick:()=>void}

)=>{
    return (

        <div 
        onClick={onClick}
        className={cn(
         'flex items-center h-full px-4 text-muted-foreground cursor-pointer border-r hover:bg-accent/30',
         isActive && "bg-background text-foreground"
        )}
        >

          <span className="text-sm">{label}</span>
        </div>
    )
}


const ProjectIdView = ({projectId}:{projectId:Id<"projects">}) => {

    const [active,setActive] = useState<"code" | "preview">('code')

  return (
    <div className="w-full h-full flex flex-col">
      <nav className="h-10 bg-sidebar w-full flex items-center border-b">
         <Tab
          label="Code"
          isActive={active==='code'}
          onClick={()=>setActive('code')}
         />

          <Tab
          label="Preview"
          isActive={active==='preview'}
          onClick={()=>setActive('preview')}
         />

         <div className="flex-1 flex justify-end items-center h-full">
            <div className="flex items-center h-full gap-2 px-4 cursor-pointer text-muted-foreground border-l hover:bg-accent/30">
              <FaGithub className="size-4"/>
               <span>Export</span>
            </div>

         </div>
      </nav>

      <div className="flex-1 relative">

        <div className={cn(
            'absolute inset-0',
            active==='code' ? 'visible':'hidden'
        )}>
           Editor
        </div>

        <div className={cn(
            'absolute inset-0',
            active==='preview' ? 'visible':'hidden'
        )}>
           preview 
        </div>

      </div>
    </div>
  )
}

export default ProjectIdView
