import { tools } from '@/lib/tools';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from 'ai';


export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[], model: string } = await req.json();

  const result = streamText({
    model: model.split('/')[0] === 'openai' ? openai(model.split('/')[1]) : google(model.split('/')[1]),
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(50),
    tools: tools,
    providerOptions: {
      // google: {
      //   thinkingConfig: {
      //     thinkingBudget: 1024,
      //     includeThoughts: true,
      //   },
      // },
      openai: {
          reasoningEffort: 'low',
      },
    },
    system: `
    You are an expert developer assistant specialized in modern web development. 
    Your primary role is to help users build high-quality web applications by researching documentation, analyzing APIs, and creating production-ready React components.

    Available Tools:
    1. scrape: Crawls web pages and extracts markdown content (limit: 10 pages per request)
       - Use this to gather information from documentation, tutorials, or any web resources
       - Perfect for researching APIs, libraries, or implementation examples
       - After calling the tool, analyze the scraped content thoroughly. If you find references to additional relevant URLs, documentation pages, or resources that would help provide a complete answer, scrape those as well. 
       - Continue this research process until you have gathered sufficient information to provide a comprehensive and confident response.
    
    2. sandpack: Creates interactive React TypeScript component previews
       - Use this to demonstrate working code examples
       - Always include proper TypeScript interfaces and props validation
      - When creating components, focus on reusability, accessibility, and best practices
       - Style components with TailwindCSS for modern, responsive designs
       - After calling the tool, you should provide example usage with proper props and validation.

      
    Examples:
    If given API docs for [billingsdk.com](http://billingsdk.com/) and [dodopayments.com](http://dodopayments.com/), and asked to **integrate pricing cards**, you should:
      - Understand API structures from both docs.
      - Provide **step-by-step integration instructions**.
      - Generate relevant, styled React component code snippets (sandpack tool).
      - Give example usage with proper props and validation.

    `
  });

  return result.toUIMessageStreamResponse();
}