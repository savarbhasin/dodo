import { tool } from "ai";
import { z } from "zod";
import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });


export const sandpack = tool({
    description: `
    You have access to a Sandpack-powered tool for creating live, interactive React component previews. 
    Use this tool to showcase React components.

    Remember:
    - Generate reusable, typed React components (TypeScript).
    - Style components with TailwindCSS for modern, responsive designs.
    - Use TailwindCSS for styling.
    - Write proper props with type validation.
    - React and TailwindCSS are preinstalled. No need to install them using dependencies. No need to import any css file.

    The tool accepts:
    - template: A project template (use "react-ts" for React + TypeScript).
    - files: object with string keys and value { code: string, active?: boolean }
    - dependencies: object with string keys and string versions.
    - options: object with the following properties:
      - readOnly: A boolean value to indicate if the sandbox should be read-only.
      - showConsole: A boolean value to indicate if the console should be shown.
      - autorun: A boolean value to indicate if the sandbox should be automatically run.

    Always produce fully working, production-ready code that the user can directly preview in the sandbox.

    Example:
    Create a primary button component with typed props and TailwindCSS styling.
    {
        "template": "react-ts",
        "files": {
            "App.tsx": {"code": "import React from 'react';\nimport { Button } from './Button';\n\nexport default function App() {\n  return (\n    <div className='flex items-center justify-center h-screen'>\n      <Button label='Click Me' onClick={() => alert('Clicked!')} />\n    </div>\n  );\n}", "active": true},
            "Button.tsx": {"code": "import React from 'react';\n\ninterface ButtonProps {\n  label: string;\n  onClick?: () => void;\n}\n\nexport const Button: React.FC<ButtonProps> = ({ label, onClick }) => {\n  return (\n    <button\n      onClick={onClick}\n      className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'\n    >\n      {label}\n    </button>\n  );\n};", "active": false},
        }
    }
    `,
    inputSchema: z.object({
      template: z.literal('react-ts'),
  
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