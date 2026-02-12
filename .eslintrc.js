module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    '@typescript-eslint/no-unuse-vars': ['warn', {
      'argsIgnorePattern': '^-'
    }]
  }
};
