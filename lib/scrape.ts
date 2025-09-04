import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });


export async function scrapeWebpage(url: string) {
    const result = await firecrawl.scrape(url, {
        formats: ['markdown']
    });
    return result.markdown;
}