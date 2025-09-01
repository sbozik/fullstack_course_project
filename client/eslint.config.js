import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import pluginReact from 'eslint-plugin-react'

export default [
  { files: ['src/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  globalIgnores(['dist']),
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // ...reactConfig.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  stylistic.configs['recommended'],
]
