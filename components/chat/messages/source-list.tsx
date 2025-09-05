import { Sources, SourcesTrigger, SourcesContent, Source } from '@/components/ai-elements/sources';

export interface SourceListPart {
  type: string;
  input?: {
    urls: string[];
  }
}

const SourceList = ({ part }: {
  part: SourceListPart
}) => {
  const sources = part.input?.urls;
  return (
    <Sources>
      <SourcesTrigger count={sources?.length || 0} />
      {sources?.map((url: string, i: number) => (
        <SourcesContent key={i}>
          <Source href={url} title={url} />
        </SourcesContent>
      ))}
    </Sources>
  );
};

export default SourceList;
