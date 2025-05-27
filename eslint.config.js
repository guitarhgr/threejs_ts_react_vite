import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"]
  },
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    languageOptions: { globals: {...globals.browser, ...globals.node} }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      'block-spacing': ['error', 'always'],
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'comma-spacing': ['error', { before: false, after: true }],
        'consistent-this': ['error', 'that'],
        'curly': ['error', 'multi-line'],
        'eqeqeq': ['error', 'smart'],
        'func-call-spacing': 'error',
        'id-blacklist': ['error'],
        'keyword-spacing': ['error', { before: true }],
        'key-spacing': ['error', { afterColon: true }],
        'lines-between-class-members': 'off',
        'max-lines-per-function': ['error', {
            max: 500,
            skipBlankLines: true,
            skipComments: true,
        }],
        'max-nested-callbacks': ['error', 3],
        'max-params': ['error', 10],
        'new-parens': 'error',
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
        'no-case-declarations': 'off',
        'no-duplicate-imports': 'error',
        'no-extra-bind': 'error',
        'no-invalid-this': 'error',
        'no-lone-blocks': 'error',
        'no-multi-spaces': 'off',
        'no-redeclare': 'error',
        'no-self-assign': 'error',
        'no-shadow': 'warn',
        'no-useless-catch': 'off',
        'no-useless-computed-key': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'no-whitespace-before-property': 'error',
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'function' }
        ],
        'prefer-const': 'off',
        'quotes': ['error', 'single', { avoidEscape: true }],
        'semi': ['error', 'always'],
        'semi-spacing': ['error', { before: false, after: true }],
        'space-infix-ops': 'error',
    }
  }
]);
