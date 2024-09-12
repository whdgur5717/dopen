module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ['react-refresh', 'react'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',

      //홑따옴표
      quotes: ['error', 'single'],

      //컬리룰 추가완료. 옵션 0: off, 1: warn, 2: error 입니다. prettier로 auto-formatting 됩니다
      curly: 2,

      //console.log작성한 채로 커밋시 오류
      'no-console': ['error'],

      //html 내부 띄어쓰기 오류 off하였습니다
      'react/no-unescaped-entities': 0,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
