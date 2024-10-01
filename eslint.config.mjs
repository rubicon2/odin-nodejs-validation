import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  eslintConfigPrettier,
  {
    files: ['**/*.js'],
    ignores: ['**/*.test.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];
