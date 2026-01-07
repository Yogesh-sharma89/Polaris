'use client'
import FuzzyText from '@/components/FuzzyText'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
  


const NotFound =  ()=>{

    return (
        <div className=' flex flex-1 flex-col gap-10 justify-center items-center max-w-screen bg-black h-screen'>
            <FuzzyText
                fuzzRange={25}
                direction="vertical"
                clickEffect
                glitchMode
                >
               404 Not Found
             
                
            </FuzzyText>

            <Button asChild variant={'secondary'}>
                <Link href={'/'}>
                 Go to home
                
                </Link>

            </Button>
        </div>
     
    )
}

export default NotFound;