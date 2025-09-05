import { tool } from "ai";
import { z } from "zod";
import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });


export const sandpack = tool({
    description: `
    You have access to a sandpack tool that creates interactive code sandboxes. This tool is perfect for demonstrating code examples, creating prototypes, or building interactive tutorials.

    Required Parameters:
    - template (required): Choose from "react", "vue", "angular", "vanilla", "node", "static", "react-ts", "vue-ts", "vanilla-ts", "solid", "svelte", "test-ts", "nextjs", "vite", "vite-react", or "vite-react-ts"
    - files (required): This is a required parameter that defines the code files in your sandbox. It must be an object where:
    - Keys are file paths with forward slash (e.g., "/App.js", "/index.html", "/styles.css")
    - Values are objects with:
        - code: string containing the file content
        - active: boolean (optional) - whether this file should be initially selected

    Example files structure:
    {
        "/App.tsx": {
            "code": "import React from 'react';\\n\\nfunction App() {\\n  return <h1>Hello World!</h1>;\\n}\\n\\nexport default App;",
            "active": true
        },
        "/index.tsx": {
            "code": "import React from 'react';\\nimport { createRoot } from 'react-dom/client';\\nimport App from './App';\\nimport './styles.css';\\n\\nconst container = document.getElementById('root');\\nconst root = createRoot(container);\\nroot.render(<App />);"
        }
    }

    Optional Parameters:
    - dependencies (optional): Object specifying npm packages and their versions:
    {
        "lodash": "^4.17.21",
        "axios": "^1.0.0"
    }
    - options (optional): Configuration object:
    - readOnly: boolean - make the code non-editable
    - showConsole: boolean - display the console panel
    - autorun: boolean - automatically execute code on load

    Usage Examples:

    Basic React TypeScript Example:
    {
        "template": "react-ts",
        "files": {
            "/App.tsx": {
            "code": "import React, { useState } from 'react';\\n\\nfunction App(): JSX.Element {\\n  const [count, setCount] = useState<number>(0);\\n  return (\\n    <div>\\n      <h1>Count: {count}</h1>\\n      <button onClick={() => setCount(count + 1)}>Increment</button>\\n    </div>\\n  );\\n}\\n\\nexport default App;",
            "active": true
            }
        },
        "options": {
            "showConsole": true,
            "autorun": true
        }
    }

    Important Notes:
    - Always include the files parameter - it's required and cannot be omitted
    - At least one file should be provided in the files object
    - For React-ts templates, typically include App.ts and optionally index.ts
    - Use proper escape characters for newlines (\\n) in your code strings
    - Set active: true for the file you want users to see first
    - Create proper full screen examples.
    - Use TailwindCSS for styling. You would need to import the script.

    When to Use Sandpack:
    Use the sandpack tool when you need to:
    - Demonstrate interactive code examples
    - Create live coding tutorials
    - Show working prototypes
    - Let users experiment with code modifications
    - Display complex examples that benefit from a live preview

    Remember: The files parameter is mandatory and must contain at least one file with valid code content.`,
    inputSchema: z.object({
      template: z.enum(['react', 'vue', 'angular', 'vanilla', 'node', 'static', 'react-ts', 'vue-ts', 'vanilla-ts', 'solid', 'svelte', 'test-ts', 'nextjs', 'vite', 'vite-react', 'vite-react-ts']),
  
      // Files: object with string keys and value { code: string, active?: boolean }
      files: z.record(z.string(), z.object({
        code: z.string(),
        active: z.boolean().optional(),
      })),
  
      // Dependencies: object with string keys and string versions
      dependencies: z.record(z.string(), z.string()).optional(),
  
      // Sandpack options
      options: z.object({
        readOnly: z.boolean().optional(),
        showConsole: z.boolean().optional(),
        autorun: z.boolean().optional(),
      }).optional()
    }),
    execute: async ({ template, files, dependencies, options }) => {
      return 'Tool call success.'
    }
  })


const scrape = tool({
    description: 'Scrape a webpage given the url',
    inputSchema: z.object({
        urls: z.array(z.string()),
    }),
    execute: async ({ urls }) => {
        const results = await Promise.all(urls.map(async (url) => {
            const result = await firecrawl.scrape(url, {
                formats: ['markdown']
            });
            return `${url}\n\n${result.markdown}`;
        }));
        return results.join('\n\n');
    }
})

export const tools = {
    sandpack,
    scrape
}