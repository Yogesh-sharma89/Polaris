import ProjectIdLayout from '@/components/project-id-layout'
import  { ReactNode } from 'react'
import { Id } from '../../../../convex/_generated/dataModel';

interface layoutProps{
    children:ReactNode,
    params:Promise<{projectId:Id<'projects'>}>
}

const layout = async({children,params}:layoutProps) => {

    const {projectId} = await params;

  return (
    <ProjectIdLayout projectId = {projectId}>
        {children}
    </ProjectIdLayout>
    
  )
}

export default layout
