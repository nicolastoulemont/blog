import React from 'react'
import { css, Global } from '@emotion/react'
import { theme } from '@chakra-ui/react'

const CodeTheme = css`
  code {
    white-space: pre;
  }
  code[class*='language-'],
  pre[class*='language-'] {
    font-family: ${theme.fonts.mono};
    text-align: left;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    width: 100%;
  }
  pre {
    padding: ${theme.space[4]};
    margin: ${theme.space[6]} 0;
    white-space: nowrap;
    overflow: auto;
    min-width: 100%;
    font-size: 0.9rem;
    border-radius: ${theme.radii.md};
    background-color: ${theme.colors.gray[900]};
    box-shadow: inset 0 3px 4px 0 rgba(0, 0, 0, 0.2);
  }
  .remark-code-title {
    padding: ${theme.space[2]} ${theme.space[4]};
    font-family: ${theme.fonts.mono};
    border-top-left-radius: ${theme.radii.md};
    border-top-right-radius: ${theme.radii.md};
    border-width: 1px;
    border-bottom-width: 0;
    font-size: ${theme.fontSizes.xs};
    margin-bottom: 0;
    width: 100%;
    background: ${theme.colors.gray[900]};
    border-color: ${theme.colors.gray[800]};
    color: ${theme.colors.gray[500]};
    box-shadow: inset 0 3px 4px 0 rgba(0, 0, 0, 0.1);
    + pre {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      margin-top: 0;
    }
  }
`

export const CodeStyles = () => <Global styles={CodeTheme} />
