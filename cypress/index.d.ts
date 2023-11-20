/// <reference types="cypress" />

declare namespace Cypress {
  import dayjs from '../src/api/dayjs';

  interface Cypress {
    dayjs: dayjs.Dayjs;
  }

  interface Chainable {
    loginAsAdmin(): Chainable<void>;

    loginAsOperator(): Chainable<void>;

    selectOption(testId: string, option: string): Chainable<void>;

    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
  }
}
