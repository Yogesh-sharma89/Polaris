import { inngest } from "./client";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';


const google = createGoogleGenerativeAI({
  apiKey:process.env.GOOGLE_GENERATIVE_AI_API_KEY
});



export const executeAI = inngest.createFunction(
    {id:'execute-ai'},
    {event:'execute/ai'},

    async({step})=>{

        const {steps:googleSteps} = await step.ai.wrap('gemini-generate-text',generateText,{

            model:google('gemini-2.5-flash'),
            system:'You are an helpful assistant',
            prompt:'How can i attract a girl toward me '
        })

       

        return {googleSteps};

    }
)