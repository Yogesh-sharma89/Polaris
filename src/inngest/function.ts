import { firecrawl } from "@/lib/firecrawl";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';


const google = createGoogleGenerativeAI({
  apiKey:process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

const URL_REGEX = /^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?#][^\s]*)?$/;

export const executeAI = inngest.createFunction(
    {id:'execute-ai'},
    {event:'execute/ai'},

    async({event,step})=>{

        const {prompt} = event.data as {prompt:string};

        // const serachResults = await step.run('firecrawl-search',async()=>{
        //     const results =  await firecrawl.search(prompt,{
        //         limit:3,
        //         scrapeOptions:{formats:['markdown']}
        //     })
        //     return results;
        // })

        // const links = serachResults ? serachResults.web?.map((item)=>JSON.parse(JSON.stringify(item.links)))


        const urls = await step.run('extract-url',async()=>{
             return prompt.match(URL_REGEX) ?? [];
          })  as string []

        const scrapedContent = await step.run('scrape-url',async()=>{

             const results = await Promise.all(

                urls.map(async(url)=>{
                   const result = await firecrawl.scrape(url,{
                    formats:['markdown']
                   })
                   return result.markdown ?? null;
                })
             )
             return results.filter(Boolean).join('\n\n');
          })

        const finalPrompt = scrapedContent ? 
           `Context:\n${scrapedContent}\n\nQuestion:\n${prompt}` : prompt



        const {steps:googleSteps} = await step.ai.wrap('gemini-generate-text',generateText,{

            model:google('gemini-2.5-flash'),
            system:'You are an helpful assistant',
            prompt:finalPrompt
        })

       

        return {googleSteps};

    }
)