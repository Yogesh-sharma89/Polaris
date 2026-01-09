import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { SparkleIcon } from "lucide-react"
import {FaGithub} from 'react-icons/fa'
import Projectlist from "./project-list"
import { useCreateProject } from "../hooks/useProject"
import {uniqueNamesGenerator,adjectives,colors,animals} from 'unique-names-generator'
import { toast } from "sonner"
import ProjectDialog from "./command-dialog"
import { useEffect, useState } from "react"

const font = Poppins({
    subsets:['latin'],
    weight:['400','500','600','700']
})

const ProjectView = () => {

    const createProject = useCreateProject();

    const [open,setOpen] = useState(false);

    useEffect(()=>{

    const keyPress = (e:KeyboardEvent)=>{
         if(e.key==='k' && (e.metaKey || e.ctrlKey)){
            e.preventDefault();
            setOpen(true);
         }
      }

      window.addEventListener('keydown',keyPress)

      return ()=> window.removeEventListener('keydown',keyPress)


   },[])

  return (
    <>

     <ProjectDialog open={open} onOpenChange={setOpen}/>
  
    <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md flex flex-col gap-5 items-center">

         <div className="flex items-center gap-4 w-full">
            <Image
            src={'/logo.svg'}
            alt={'./logo-alt.svg'}
            width={35}
            height={35}
            className="md:size-13 size-10"
            />

            <h1 className={cn(
                'text-4xl md:text-5xl font-semibold',
                font.className
            )}>Polaris</h1>
             
         </div>

         <div className="flex flex-col gap-5 w-full">

            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-3 gap-4">

                <Button
                 variant={'outline'}
                  onClick={()=>{
                    const projectName = uniqueNamesGenerator({
                        dictionaries:[adjectives,colors,animals],
                        separator:'-',
                        length:3
                    })

                    createProject({name:projectName})
                    toast.success('New project created')
                 }}
                 className="flex flex-col gap-4 items-start justify-start p-4 h-full bg-background rounded-sm"
                >
                    
                    <div className="flex items-center w-full justify-between">
                        <SparkleIcon className="size-4"/>
                       <Kbd className="bg-accent border">
                        Ctrl+J
                       </Kbd>

                    </div>

                    <div>
                        <span className="text-sm">New</span>
                    </div>

                </Button>

                <Button
                 variant={'outline'}
                 onClick={()=>{}}
                 className="flex flex-col gap-4 items-start justify-start p-4 h-full bg-background rounded-sm"
                >
                    
                    <div className="flex items-center w-full justify-between">
                        <FaGithub className="size-5"/>
                       <Kbd className="bg-accent border">
                        Ctrl+I
                       </Kbd>

                    </div>

                    <div>
                        <span className="text-sm">Import</span>
                    </div>

                </Button>

            </div>

            <Projectlist onViewAll={()=>setOpen(true)}/>

         </div>

      </div>
    </div>
      </>
  )
}

export default ProjectView
