import { test as base } from '@playwright/test';

// Credenciales + datos comunes
export type TestFixtures = {
  credentials: { email: string; password: string };
  placa: string;
};

export const test = base.extend<TestFixtures>({
  credentials: [{
    email: process.env.TEST_EMAIL || 'qa@asisya.test',
    password: process.env.TEST_PASSWORD || 'SecretPwd123!'
  }, { scope: 'test' }],

  placa: [process.env.TEST_PLACA || 'ABC123', { scope: 'test' }]
});

export const expect = base.expect;