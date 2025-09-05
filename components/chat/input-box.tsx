import {
    PromptInput,
    PromptInputButton,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
  } from '@/components/ai-elements/prompt-input';
import { useState } from 'react';
import { models } from '@/lib/config';
import { ChatRequestOptions, ChatStatus, CreateUIMessage, UIMessage } from 'ai';

interface InputBoxProps {
    sendMessage: (message: CreateUIMessage<UIMessage>, options?: ChatRequestOptions) => Promise<void>;
    status: ChatStatus
}

export function InputBox({ sendMessage, status }: InputBoxProps) {
    const [input, setInput] = useState<string>('');
    const [model, setModel] = useState<string>('google/gemini-2.5-flash');
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
          sendMessage(
            { parts: [{ type: 'text', text: input }] },
            {
              body: {
                model: model,
              },
            },
          );
          setInput('');
        }
      };

    return (
        <PromptInput onSubmit={handleSubmit} className="mt-4 p-2">
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem key={model.value} value={model.value}>
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
    )
}