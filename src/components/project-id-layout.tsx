'use client'
import { ReactNode } from "react"
import { Id } from "../../convex/_generated/dataModel"
import Navbar from "./navbar"
import { Allotment } from "allotment";

const MINIMUM_SIDEBAR_WIDTH = 250
const MAXIMUM_SIDEBAR_WIDTH = 800
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH=400;
const DEFAULT_MAIN_SIZE = 1000;


interface projectIdLayoutProps{
    children:ReactNode,
    projectId:Id<'projects'>
}

const ProjectIdLayout = ({children,projectId}:projectIdLayoutProps) => {
  return (
    <div className="w-full h-screen flex flex-col">
        <Navbar projectId = {projectId}/>
        <div className="flex-1 overflow-hidden">
          <Allotment className="flex-1"
           defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH,DEFAULT_MAIN_SIZE]}
          >

            <Allotment.Pane
             snap
             minSize={MINIMUM_SIDEBAR_WIDTH}
             maxSize={MAXIMUM_SIDEBAR_WIDTH}
             preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
            >
              Converstion Sidebar
            </Allotment.Pane>
           
           <Allotment.Pane>
              {children}
           </Allotment.Pane>
            

          </Allotment>
            
        </div>
     
    </div>
  )
}

export default ProjectIdLayout
