module.exports = {
  ignorePatterns: ['.eslintrc.js'],
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  plugins: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    //varを禁止
    'no-var': 'error',
    //早期リターンさせる
    'no-else-return': 'error',
    //厳密等価演算子使用させる
    eqeqeq: ['error', 'smart'],
  },
};
