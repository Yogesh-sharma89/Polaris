import FirecrawlApp from "@mendable/firecrawl-js";

if (!process.env.FIRECRAWL_API_KEY){
  throw new Error('Missing FIRECRAWL_API_KEY ')
}

export const firecrawl = new FirecrawlApp({
    apiKey:process.env.FIRECRAWL_API_KEY
})