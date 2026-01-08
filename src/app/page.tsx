'use client'
import { Button } from '@/components/ui/button'

import { api } from '../../convex/_generated/api'
import {  useMutation, useQuery } from 'convex/react'
import { toast } from 'sonner'

const Home = () => {

    const createMutation = useMutation(api.projects.createProject)

  const handleCreateproject = async()=>{
    try{
      await   createMutation({name:'React animation'})
      toast.success('Project created')
    }catch(err){
      toast.error('Failed to create project.');
    }
     
  }

  const projects = useQuery(api.projects.getProjects);


  return (

    <div className='w-screen h-full flex items-center justify-center flex-col gap-4'>
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
