import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
  },
  env: {
    admin_email: process.env.ADMIN_TEST_EMAIL,
    admin_password: process.env.ADMIN_TEST_PASSWORD,
    operator_email: process.env.OPERATOR_TEST_EMAIL || '2.4@mail.ru',
    operator_password: process.env.OPERATOR_TEST_PASSWORD || '123456',
  },
});
