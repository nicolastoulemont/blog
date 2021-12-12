import { createRemarkPlugin } from '@atomiks/mdx-pretty-code'
import fs from 'fs'

export const syntaxHighLightPlugin = createRemarkPlugin({
  // Options passed to shiki.getHighlighter()
  shikiOptions: {
    // Link to your VS Code theme JSON file
    theme: JSON.parse(fs.readFileSync(require.resolve('./dark.json'), 'utf-8')),
  },
})
