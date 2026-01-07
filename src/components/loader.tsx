import { LoaderIcon } from "lucide-react"


const Loader = () => {
  return (
    <div className="max-w-screen min-h-svh flex items-center justify-center gap-4">
       <LoaderIcon className="size-9 animate-spin"/>
      
    </div>
  )
}

export default Loader
