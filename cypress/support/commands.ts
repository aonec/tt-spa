///<reference path="../index.d.ts" />

Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.location('pathname').should('equal', '/login');

  cy.get('[name=email]').type(Cypress.env('email'));
  cy.get('[name=password]').type(Cypress.env('password'));
  cy.contains('button', 'Вход в систему').click();
});

Cypress.Commands.add('selectOption', (testId, option) => {
  cy.getByTestId(testId).click();

  cy.get('.ant-select-dropdown :not(.ant-select-dropdown-hidden)')
    .should('be.visible');

  cy.get('.ant-select-dropdown :not(.ant-select-dropdown-hidden)')
    .find('.ant-select-item-option')
    .each((elem) => {
      if (elem.text() === option) {
        cy.wrap(elem).click();
      }
    });
});

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-test=${testId}]`);
});
