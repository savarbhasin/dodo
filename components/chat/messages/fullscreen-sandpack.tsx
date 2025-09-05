import { SandpackProvider, SandpackLayout, SandpackPreview } from '@codesandbox/sandpack-react';
import { atomDark } from '@codesandbox/sandpack-themes';

interface SandpackData {
  template?: 'react' | 'vue' | 'angular' | 'vanilla' | 'node' | 'static' | 'react-ts' | 'vue-ts' | 'vanilla-ts' | 'solid' | 'svelte' | 'test-ts' | 'nextjs' | 'vite' | 'vite-react' | 'vite-react-ts';
  files?: Record<string, string>;
  dependencies?: Record<string, string>;
  options?: Record<string, any>;
}

interface FullscreenSandpackProps {
  sandpackData: SandpackData | null;
  onClose: () => void;
}

const FullscreenSandpack = ({ sandpackData, onClose }: FullscreenSandpackProps) => (
  <div className="fixed inset-0 z-50 bg-black">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 z-60 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
    >
      ✕ Close
    </button>
    <SandpackProvider
      theme={atomDark}
      template={sandpackData?.template || 'react'}
      files={sandpackData?.files || {}}
      customSetup={{ dependencies: sandpackData?.dependencies || {} }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
        ...sandpackData?.options || {}
      }}
      style={{ height: '100vh', width: '100vw' }}
    >
      <SandpackLayout className="h-full w-full">
        <SandpackPreview
          className="h-full w-full"
          style={{ height: '100vh', width: '100vw' }}
          showOpenInCodeSandbox={false}
          showRefreshButton
        />
      </SandpackLayout>
    </SandpackProvider>
  </div>
);

export default FullscreenSandpack;
