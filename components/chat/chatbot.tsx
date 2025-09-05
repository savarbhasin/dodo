'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useChat } from '@ai-sdk/react';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Loader } from '@/components/ai-elements/loader';
import { InputBox } from '@/components/chat/input-box';
import ChatMessages from './chat-messages';
import FullscreenSandpack from '@/components/chat/messages/fullscreen-sandpack';

interface SandpackData {
  template?: 'react' | 'vue' | 'angular' | 'vanilla' | 'node' | 'static' | 'react-ts' | 'vue-ts' | 'vanilla-ts' | 'solid' | 'svelte' | 'test-ts' | 'nextjs' | 'vite' | 'vite-react' | 'vite-react-ts';
  files?: Record<string, string>;
  dependencies?: Record<string, string>;
  options?: {
    readOnly?: boolean;
    showConsole?: boolean;
    autorun?: boolean;
  };
}

const ChatBot = () => {
  const [fullscreenSandpack, setFullscreenSandpack] = useState<SandpackData | null>(null);
  const { messages, status, regenerate, sendMessage } = useChat();

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            <ChatMessages 
              messages={messages} 
              status={status} 
              regenerate={regenerate} 
              setFullscreenSandpack={setFullscreenSandpack} 
            />
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <InputBox status={status} sendMessage={sendMessage} />
      </div>

      {fullscreenSandpack && createPortal(
        <FullscreenSandpack 
          sandpackData={fullscreenSandpack} 
          onClose={() => setFullscreenSandpack(null)} 
        />,
        document.body
      )}
    </div>
  );
};

export default ChatBot;
