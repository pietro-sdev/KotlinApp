module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/extensions': 0,
    'import/no-anonymous-default-export': 0,
    'import/prefer-default-export': 0,
    'react/destructuring-assignment': 0,
    'react/function-component-definition': 0,
    'react/jsx-key': 'error',
    'react/jsx-no-constructed-context-values': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
