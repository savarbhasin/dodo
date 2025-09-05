import { Reasoning, ReasoningTrigger, ReasoningContent } from '@/components/ai-elements/reasoning';
import type { UIMessage } from 'ai';
import type { ChatStatus } from 'ai';

interface ReasoningPart {
  type: 'reasoning';
  text: string;
}

interface ReasoningBlockProps {
  part: ReasoningPart;
  message: UIMessage;
  status: ChatStatus;
}

const ReasoningBlock = ({ part, message, status }: ReasoningBlockProps) => (
  <Reasoning
    className="w-full"
    isStreaming={status === 'streaming' && message.id === message.id}
  >
    <ReasoningTrigger />
    <ReasoningContent>{part.text}</ReasoningContent>
  </Reasoning>
);

export default ReasoningBlock;
