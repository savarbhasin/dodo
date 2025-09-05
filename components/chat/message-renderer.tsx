import SourceList from './messages/source-list';
import ReasoningBlock from './messages/reasoning-block';
import SandpackViewer, { SandpackPart } from './messages/sandpack-viewer';
import { MessageUI } from '@/components/chat/messages/message-ui';
import type { UIMessage } from 'ai';
import type { ChatStatus } from 'ai';

interface SandpackData {
  template?: 'react' | 'vue' | 'angular' | 'vanilla' | 'node' | 'static' | 'react-ts' | 'vue-ts' | 'vanilla-ts' | 'solid' | 'svelte' | 'test-ts' | 'nextjs' | 'vite' | 'vite-react' | 'vite-react-ts';
  files?: Record<string, string>;
  dependencies?: Record<string, string>;
  options?: Record<string, any>;
}

interface MessageRendererProps {
  message: UIMessage;
  messages: UIMessage[];
  status: ChatStatus;
  regenerate: () => void;
  setFullscreenSandpack: (data: SandpackData | null) => void;
}

const MessageRenderer = ({ message, messages, status, regenerate, setFullscreenSandpack }: MessageRendererProps) => {
  const parts = message.parts;

  return (
    <>
      {message.role === 'assistant' && parts.some((p) => p.type === 'source-url') && (
        <SourceList message={message} />
      )}

      {parts.map((part, i) => {
        switch (part.type) {
          case 'text':
            return <MessageUI key={i} message={message} i={i} messages={messages} regenerate={regenerate} part={part} />;
          case 'reasoning':
            return <ReasoningBlock key={i} part={part} message={message} status={status} />;
          case 'tool-sandpack':
            return <SandpackViewer key={i} part={part as unknown as SandpackPart} setFullscreenSandpack={setFullscreenSandpack} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default MessageRenderer;
