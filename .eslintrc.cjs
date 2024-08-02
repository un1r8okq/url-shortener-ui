module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    '@stylistic/js',
    'react-refresh',
  ],
  rules: {
    '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/js/semi': ['error', 'always'],
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
    ],
  },
}
