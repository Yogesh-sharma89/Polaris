
import { useProjectPartial } from "../hooks/useProject";
import { Spinner } from "@/components/ui/spinner";
import { Kbd } from "@/components/ui/kbd";
import ProjectItem from "./projectItem";
import LatestProject from "./latestProject";

interface ProjectlistProps{
    onViewAll:()=>void;
}




const Projectlist = ({onViewAll}:ProjectlistProps) => {

  const projects = useProjectPartial(6);

  if(projects===undefined){
    return <Spinner className="size-5"/>
  }

  const [mostrecent,...rest] = projects

  return (
    <div className="flex flex-col gap-4">
       
       {mostrecent &&
        <LatestProject data={mostrecent}/>}

      {
        rest.length>0 &&
        <div className="flex flex-col gap-4">

          <div className="flex items-center justify-between">

            <span className="text-sm text-muted-foreground">
               Recent Projects
            </span>

            <button
             onClick={onViewAll}
            className="flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors">
              <span>View all</span>
              <Kbd className="bg-accent border">
                ⌘ K
              </Kbd>
            </button>

          </div>

          {/* list the project  */}

          <ul className="flex flex-col gap-2">
            {
              rest.map((project)=>(
                <ProjectItem key={project._id} data={project}/>

              ))
            }

          </ul>



        </div>
      }
      
    </div>
  )
}

export default Projectlist
