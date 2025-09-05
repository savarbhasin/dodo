import { tools } from '@/lib/tools';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from 'ai';


export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[], model: string } = await req.json();

  const result = streamText({
    model: model.split('/')[0] === 'openai' ? openai(model.split('/')[1]) : google(model.split('/')[1]),
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: tools,
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: 1024,
          includeThoughts: true,
        },
      },
      openai: {
          reasoningEffort: 'low',
      },
    }
  });

  return result.toUIMessageStreamResponse();
}