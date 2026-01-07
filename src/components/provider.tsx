"use client";

import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ClerkProvider,  useAuth, UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "./themeProvider";
import { dark } from "@clerk/themes";
import Loader from "./loader";
import { UnauthenticatedView } from "@/features/auth/components/unauthenticated-view";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Provider = ({children}:{children:ReactNode})=>{
    return (
        <ClerkProvider 
          appearance={{
            theme:dark
            }}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
               <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
               
               >
                <Authenticated>
                    <UserButton/>
                      {children}
                </Authenticated>

                <Unauthenticated>
                   <UnauthenticatedView/>
                </Unauthenticated>

                <AuthLoading>
                    <Loader/>
                </AuthLoading>

              
                  
               </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}