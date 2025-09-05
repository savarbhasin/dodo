import { SandpackProvider, SandpackLayout, SandpackPreview, SandpackCodeEditor } from '@codesandbox/sandpack-react';
import { atomDark } from '@codesandbox/sandpack-themes';

interface SandpackData {
  template?: 'react' | 'vue' | 'angular' | 'vanilla' | 'node' | 'static' | 'react-ts' | 'vue-ts' | 'vanilla-ts' | 'solid' | 'svelte' | 'test-ts' | 'nextjs' | 'vite' | 'vite-react' | 'vite-react-ts';
  files?: Record<string, string>;
  dependencies?: Record<string, string>;
  options?: Record<string, any>;
}

export interface SandpackPart {
  type: string;
  input?: SandpackData;
  output?: boolean;
}

interface SandpackViewerProps {
  part: SandpackPart;
  setFullscreenSandpack: (data: SandpackData | null) => void;
}

const SandpackViewer = ({ part, setFullscreenSandpack }: SandpackViewerProps) => (
  <div className="my-4">
    <SandpackProvider 
      theme={atomDark}
      template={part.input?.template || 'react'} 
      files={{
        ...part.input?.files || {},
      }}
      customSetup={{ dependencies: part.input?.dependencies || {} }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
        ...part.input?.options || {}
      }}
      className="h-full"
    >
      <SandpackLayout>
        {!part.output ? (
          <SandpackCodeEditor showTabs showLineNumbers showInlineErrors wrapContent/>
        ) : (
          <SandpackPreview showOpenInCodeSandbox={true} showRefreshButton={true} />
        )}
      </SandpackLayout>
    </SandpackProvider>

    {part.output && (
      <button
        onClick={() => setFullscreenSandpack(part.input || null)}
        className="mt-2 px-2 py-1 text-xs text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
      >
        View Fullscreen
      </button>
    )}
  </div>
);

export default SandpackViewer;
