import MessageRenderer from './message-renderer';
import type { UIMessage } from 'ai';
import type { ChatStatus } from 'ai';

interface SandpackData {
  template?: 'react' | 'vue' | 'angular' | 'vanilla' | 'node' | 'static' | 'react-ts' | 'vue-ts' | 'vanilla-ts' | 'solid' | 'svelte' | 'test-ts' | 'nextjs' | 'vite' | 'vite-react' | 'vite-react-ts';
  files?: Record<string, string>;
  dependencies?: Record<string, string>;
  options?: Record<string, any>;
}

interface ChatMessagesProps {
  messages: UIMessage[];
  status: ChatStatus;
  regenerate: () => void;
  setFullscreenSandpack: (data: SandpackData | null) => void;
}

const ChatMessages = ({ messages, status, regenerate, setFullscreenSandpack }: ChatMessagesProps) => {
  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          <MessageRenderer 
            message={message} 
            messages={messages} 
            status={status} 
            regenerate={regenerate} 
            setFullscreenSandpack={setFullscreenSandpack} 
          />
        </div>
      ))}
    </>
  );
};

export default ChatMessages;
