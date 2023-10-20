describe('task statistics', () => {
  beforeEach(() => {
    cy.login();
  });

  it('visit tasks page and visit node', () => {
    cy.contains('div', /Наблюдаемые/).click();

    cy.getByTestId('task-item').should('be.visible');

    cy.selectOption('task-type-selector', 'Неполадки с ОДПУ');

    cy.getByTestId('task-item').first().click();
    cy.getByTestId('task-creation-time').then((time) => {
      const date = Cypress.dayjs(time.text(), 'DD.MM.YYYY HH:mm');
      cy.getByTestId('task-pipe-node-link')
        .invoke('removeAttr', 'target')
        .click();

      cy.getByTestId('node-graph-filter-button').click();

      cy.get('.ant-picker-range')
        .find('input')
        .each((input, index) => {
          cy.wrap(input).invoke('removeAttr', 'readonly');

          if (index === 0) {
            cy.wrap(input).type(date.startOf('week').format('DD MMMM YYYY'));
          } else {
            cy.wrap(input)
              .type(date.endOf('week').format('DD MMMM YYYY'))
              .type('{enter}');
          }
        });

      cy.contains('button', 'Применить настройки').click();
    });
  });
});
