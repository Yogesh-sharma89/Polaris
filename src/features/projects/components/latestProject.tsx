import { Button } from "@/components/ui/button"
import { Doc } from "../../../../convex/_generated/dataModel"
import Link from "next/link"
import { getProjectIcon, formatTimestamp } from './projectItem';
import { ArrowRightIcon } from "lucide-react"


interface ProjectItemProps{
    data:Doc<'projects'>
}

const LatestProject = ({data}:ProjectItemProps) => {
  return (
    <div className="flex flex-col gap-3">

        <span className="text-sm text-muted-foreground">
            Last updated
        </span>

        <Button 
         variant={'outline'}
         className="flex flex-col gap-3 p-4 items-start justify-start h-auto rounded-sm bg-background border"
         asChild
        >

            <Link href={`/projects/${data._id}`}
            className="group"
            >

                <div className="flex items-center justify-between w-full">

                    <div className="flex items-center gap-2">

                        {getProjectIcon(data)}

                        <span className="font-medium truncate">{data.name}</span>

                    </div>

                    <ArrowRightIcon
                    className="size-4 text-muted-foreground group-hover:translate-x-1 hover:text-foreground/60 transition-transform"
                    />

                </div>

                <span className="text-xs text-muted-foreground">
                    {
                        formatTimestamp(data.updateAt)
                    }

                </span>
            </Link>

          
        </Button>
      
    </div>
  )
}

export default LatestProject
