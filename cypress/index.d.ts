/// <reference types="cypress" />

declare namespace Cypress {
  import dayjs from '../src/api/dayjs';

  interface Cypress {
    dayjs: typeof dayjs;
  }

  interface Chainable {
    login(): Chainable<void>;

    clickLink(label: string): Chainable<void>;
  }
}
