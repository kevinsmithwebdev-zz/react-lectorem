module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb',
    'plugin:css-modules/recommended',
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'css-modules',
    'react',
  ],
  ignorePatterns: ['*.css'],
  rules: {
  },
};
