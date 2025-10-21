module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['coverage/**'],
  overrides: [
    {
      files: ['jest.setup.js', '**/__tests__/**'],
      env: {
        jest: true,
      },
    },
  ],
};
