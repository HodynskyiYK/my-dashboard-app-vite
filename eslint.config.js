import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import boundaries from 'eslint-plugin-boundaries';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  {
    ignores: ['dist', 'build', 'node_modules'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      import: importPlugin,
      boundaries: boundaries,
      prettier: prettierPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
      ],
    },
    rules: {
      // boundaries
      'boundaries/no-unknown': 'error',
      'boundaries/no-unknown-files': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'features', allow: ['entities', 'shared'] },
            { from: 'pages', allow: ['widgets', 'features', 'entities', 'shared'] },
            { from: 'shared', allow: ['shared'] },
            { from: 'widgets', allow: ['features', 'entities', 'shared'] },
            { from: "pages", allow: ["widgets", "features", "entities", "shared", "app"]
}
          ],
        },
      ],

      // public API restriction
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@/pages/*/*'], message: 'Use public API (index.ts)' },
            { group: ['@/features/*/*'], message: 'Use public API (index.ts)' },
            { group: ['@/entities/*/*'], message: 'Use public API (index.ts)' },
          ],
        },
      ],

      // 🔥 NEW — import order
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          alphabetize: { order: 'asc' },
        },
      ],

      // 🔥 NEW — prettier as lint rule
      'prettier/prettier': 'error',
    },
  },

  // 🔥 важливо: вимикає конфлікти форматування
  eslintConfigPrettier,
);