const config = {
  'src/**/*.{ts,tsx}': ['npm run lint:fix', 'npm run format'],
  'src/**/*.css': ['npm run lint:styles:fix'],
};

export default config;
