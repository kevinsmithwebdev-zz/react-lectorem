module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
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
  plugins: ['css-modules', 'react'],
  ignorePatterns: ['*.css', '*.snap'],
  rules: {
    'react/prop-types': 0,
    'implicit-arrow-linebreak': [0],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/destructuring-assignment': 0,
    'operator-linebreak': 0,
    'react/state-in-constructor': 0,
    'arrow-parens': ['error', 'as-needed'],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-curly-spacing': [
      'error',
      { when: 'always', allowMultiline: false },
    ],
    'react/jsx-props-no-spreading': 0,
  },
};
