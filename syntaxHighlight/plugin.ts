import { createRemarkPlugin } from '@atomiks/mdx-pretty-code'
import fs from 'fs'
import path from 'path'

export const syntaxHighLightPlugin = createRemarkPlugin({
  // Options passed to shiki.getHighlighter()
  shikiOptions: {
    // Link to your VS Code theme JSON file
    theme: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'syntaxHighlight', 'dark.json'), 'utf-8')),
  },
})
