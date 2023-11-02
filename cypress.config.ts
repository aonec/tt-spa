import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
  },
  env: {
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
  },
});
