// .eslintrc.js

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-curly-newline': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
};
