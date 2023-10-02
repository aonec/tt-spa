describe('task statistics', () => {
  beforeEach(() => {
    cy.login();
  });

  it('visit tasks page and visit node', () => {
    cy.contains('div', /Наблюдаемые/).click();
    cy.get('[data-test=task-type-selector]');
  });
});
