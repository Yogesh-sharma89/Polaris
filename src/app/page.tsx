'use client'
import { Button } from '@/components/ui/button'

import { api } from '../../convex/_generated/api'
import {  useMutation, useQuery } from 'convex/react'

const Home = () => {

    const createMutation = useMutation(api.projects.createProject)

  const handleCreateproject = ()=>{
      createMutation({name:'React animation'})
  }

  const projects = useQuery(api.projects.getProjects);


  return (

    <div className='max-w-screen h-full flex items-center justify-center flex-col gap-4'>
      <Button onClick={handleCreateproject}>Create Project</Button>
     
        {projects?.map((project)=>(
          <div key={project._id} className='p-2 border '>
               <p>{project.name}</p>
               <p>owner : {project.ownerId}</p>
          </div>
        
        ))}
   
    </div>

  )

}



export default Home;
