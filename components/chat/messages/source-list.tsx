import { Sources, SourcesTrigger, SourcesContent, Source } from '@/components/ai-elements/sources';
import type { UIMessage } from 'ai';

interface SourceListProps {
  message: UIMessage;
}

const SourceList = ({ message }: SourceListProps) => {
  const sources = (message.parts as any[]).filter((p: any) => p.type === 'source-url');

  return (
    <Sources>
      <SourcesTrigger count={sources.length} />
      {sources.map((part: any, i) => (
        <SourcesContent key={`${message.id}-${i}`}>
          <Source href={part.url} title={part.url} />
        </SourcesContent>
      ))}
    </Sources>
  );
};

export default SourceList;
