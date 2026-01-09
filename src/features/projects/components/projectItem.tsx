import Link from "next/link"
import { Doc } from "../../../../convex/_generated/dataModel"
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { FaGithub } from "react-icons/fa"

interface ProjectItemProps{
    data:Doc<'projects'>
}

export const formatTimestamp = (timestamp:number)=>{
  return formatDistanceToNow(new Date(timestamp),{addSuffix:true})
}

export const getProjectIcon = (project:Doc<'projects'>)=>{
    if(project.importStatus==='Completed'){
        return <FaGithub className="size-4 text-muted-foreground"/>
    }

    if(project.importStatus==='Failed'){
        return <AlertCircleIcon className="size-4 text-muted-foreground"/>
    }

    if(project.importStatus==='Importing'){
        return <Loader2Icon className="size-4 text-muted-foreground animate-spin"/>
    }

    return <GlobeIcon className="size-4 text-muted-foreground"/>
}

const ProjectItem = (

 {data}:ProjectItemProps
) => {
  return (
    <Link href={`/projects/${data._id}`}
    className="text-sm text-foreground/60 flex items-center justify-between py-1 hover:text-foreground group
    font-medium w-full
    "
    >

        <div className="flex items-center gap-3">
            {
                getProjectIcon(data)
            }
            <span className="truncate">{data.name}</span>
        </div>

        <span className="text-xs text-muted-foreground hover:text-foreground/70 transition-colors">
          {formatTimestamp(data.updateAt)}
        </span>
      
    </Link>
  )
}

export default ProjectItem
