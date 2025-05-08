import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint, { configs } from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import-x';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import unicornPlugin from 'eslint-plugin-unicorn';
import reactDom from 'eslint-plugin-react-dom';
import react from 'eslint-plugin-react-x';
import reactPlugin from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
import vitest from '@vitest/eslint-plugin';

export default tseslint.config(
  configs.stylisticTypeChecked,
  configs.strictTypeChecked,
  unicornPlugin.configs.recommended,
  { ignores: ['**/*.js', '**/*.config.js', '**/*.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, react.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      react: {
        version: 'detect',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      perfectionist: perfectionistPlugin,
      '@stylistic/ts': stylisticTs,
      'jsx-a11y': jsxA11y,
      'react-dom': reactDom,
      react: reactPlugin,
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...reactDom.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': ['error', { allow: ['error'] }],
      'no-empty': 'warn',
      curly: ['error', 'all'],
      'no-warning-comments': ['error', { terms: [''], location: 'anywhere' }],
      'quote-props': ['error', 'always'],
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-confusing-arrow': ['error', { allowParens: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      'import/extensions': ['off'],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      'import/first': 'error',

      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-assertions': ['warn', { assertionStyle: 'never' }],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': 'error',
      ...prettierConfig.rules,
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          enforceConst: true,
          ignoreEnums: true,
          ignore: [0, 1, -1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreClassFieldInitialValues: true,
        },
      ],

      'perfectionist/sort-imports': 'error',

      '@stylistic/ts/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
      ],

      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
            args: true,
          },
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}'],
    plugins: {
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
      vitest: vitest,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
      ...jestDom.configs.recommended.rules,
      ...vitest.configs.recommended.rules,
      '@typescript-eslint/no-magic-numbers': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
    },
  }
);
