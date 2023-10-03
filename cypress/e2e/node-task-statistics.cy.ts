describe('task statistics', () => {
  beforeEach(() => {
    cy.login();
  });

  it('visit tasks page and visit node', () => {
    cy.contains('div', /Наблюдаемые/).click();
    cy.intercept('GET', 'api/Tasks*').as('getTasks');
    cy.wait('@getTasks');

    cy.selectOption('task-type-selector', 'Неполадки с ОДПУ');

    cy.getByTestId('task-item').first().click();
    cy.contains('div', 'Дата создания')
      .next()
      .invoke('text')
      .should((timeText) => {
        const time = timeText;
        return time;
      });

    cy.contains('a', 'Перейти').invoke('removeAttr', 'target').click();

    cy.getByTestId('node-graph-filter-button').click();
  });
});
