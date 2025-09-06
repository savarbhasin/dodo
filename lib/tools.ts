import { tool } from "ai";
import { z } from "zod";
import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });


export const sandpack = tool({
    description: `
    You have access to a Sandpack-powered tool for creating live, interactive Next.js (Page Router) previews.

    Use this tool to showcase Next.js pages and API routes. Prefer the "nextjs" template. Use "react-ts" only for plain React component sandboxes.

    What the Next.js (Page Router) template already includes (do NOT rewrite unless you need changes):
    - /pages/_app.js
    - /pages/index.js
    - /next.config.js (DONT EDIT)
    - /package.json (DONT EDIT)
    - /styles.css

    Provide ONLY the files you want to add or change. Predefined files need not be included if unchanged.

    Styling:
    - Tailwind via CDN is available in preview. You can use Tailwind classes without installing dependencies or importing CSS.

    The tool accepts:
    - template: "nextjs" (preferred) or "react-ts".
    - files: object with string keys and value { code: string, active?: boolean } for files you add/override.
    - dependencies: object with string keys and string versions (rarely needed for the default template).
    - options: { readOnly?: boolean; showConsole?: boolean; autorun?: boolean }

    Always produce fully working code that directly runs in the sandbox. For backend demos, add API routes under "/pages/api/*.js".

    Example: Next.js Page Router page with an API route (only overriding index page and adding an API file).
    {
      "template": "nextjs",
      "files": {
        "/pages/index.js": { "code": "export default function Home() {\n  const [msg, setMsg] = React.useState('');\n  React.useEffect(() => {\n    fetch('/api/hello').then(r => r.json()).then(d => setMsg(d.message));\n  }, []);\n  return (\n    <div className=\"min-h-screen flex items-center justify-center\">\n      <main className=\"p-6 text-center space-y-4\">\n        <h1 className=\"text-2xl font-semibold\">Next.js + API</h1>\n        <p className=\"text-gray-400\">{msg}</p>\n      </main>\n    </div>\n  );\n}" , "active": true },
        "/pages/api/hello.js": { "code": "export default function handler(req, res) { res.status(200).json({ message: 'Hello from Next.js API!' }); }" }
      }
    }
    `,
    inputSchema: z.object({
      template: z.enum(['nextjs', 'react-ts']),
  
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
    execute: async ({ template: _template, files: _files, dependencies: _dependencies, options: _options }) => { // eslint-disable-line @typescript-eslint/no-unused-vars
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