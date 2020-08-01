module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
