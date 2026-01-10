import ProjectIdView from "@/features/projects/components/projectIdView"
import { Id } from "../../../../convex/_generated/dataModel"

interface ProjectParams{

    params:Promise<{projectId:Id<'projects'>}>
}

const page = async({params}:ProjectParams) => {

    const {projectId} = await params

  return (
    <ProjectIdView projectId={projectId}/>
  )
}

export default page
