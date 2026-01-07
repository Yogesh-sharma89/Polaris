import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { SignInButton } from "@clerk/nextjs"
import { ShieldAlertIcon } from "lucide-react"

export const UnauthenticatedView = ()=>{
  return (
    <div className="min-w-screen flex flex-1 items-center justify-center h-screen bg-background">

        <div className="w-full max-w-lg bg-muted">

            <Item variant={'outline' } className="p-4">

                <ItemMedia variant={'icon'}>
                    <ShieldAlertIcon/>
                </ItemMedia>

                <ItemContent>
                    <ItemTitle>Unauthorized access</ItemTitle>
                    <ItemDescription>
                        You are not authorized to access this resource.
                    </ItemDescription>
                </ItemContent>

                <ItemActions>
                    <SignInButton>
                        <Button variant={'outline'} size={'sm'}>
                            Sign in
                        </Button>
                    </SignInButton>
                </ItemActions>

            </Item>

        </div>

    </div>
  )
}