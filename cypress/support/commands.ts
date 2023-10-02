///<reference path="../index.d.ts" />

Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.location('pathname').should('equal', '/login');

  cy.get('[name=email]').type(Cypress.env('email'));
  cy.get('[name=password]').type(Cypress.env('password'));
  cy.contains('button', 'Вход в систему').click();
});

Cypress.Commands.add('clickLink', (label) => {
  cy.get('a').contains(label).click();
});
