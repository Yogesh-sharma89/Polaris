'use client'
import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

const Demo = () => {

  const [loading,setLoading] = useState(false);

    const handleBlocking  =  async() =>{
     
        await fetch('/api/background',{method:'POST'})
        toast.success('AI job queued.')
    }

  return (
    <div className='p-8 space-y-4'>
      <Button onClick={handleBlocking} disabled={loading} className={`${loading && 'cursor-not-allowed'}`} asChild>
        {loading ? 
           <div className='flex items-center '>
             <LoaderIcon className='size-5 animate-spin'/>
             <span>Generating...</span>
           </div>
           :
           <span>Blocking</span>
        }
      </Button>
    </div>
  )
}

export default Demo
