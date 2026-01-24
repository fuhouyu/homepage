// eslint.config.styles
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{styles,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // 通用
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      eqeqeq: 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'comma-spacing': 'error',
      'space-infix-ops': 'error',
      'key-spacing': 'error',
      'spaced-comment': 'error',
      'object-curly-spacing': ['error', 'always'],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // 忽略以 _ 开头的参数
          varsIgnorePattern: '^_', // 忽略以 _ 开头的变量
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',

      // React
      'react/react-in-jsx-scope': 'off', // React17+不需要import React
      'react/prop-types': 'off', // 用TS，不用prop-types
      'react/self-closing-comp': 'error',
      'react/jsx-key': 'error',
      'react/no-unknown-property': 'error',
      'react/no-direct-mutation-state': 'error',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // prettier 插件强制格式
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
];
