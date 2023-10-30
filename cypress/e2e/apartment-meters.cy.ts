describe('apartment meters', () => {
  beforeEach(() => {
    cy.loginAsOperator();
  });

  it('visit tasks page and visit node', () => {
    cy.focused().type('Химиков').type('{enter}');
    cy.focused().type('94').type('{enter}');
    cy.focused().type('114').type('{enter}');

    cy.getByTestId('meters-input').as('inputs');

    cy.get('@inputs').last().find('input').focus().trigger('mouseover');

    cy.contains('div', /Последнее показание/)
      .should('be.visible')
      .then((elem) =>
        cy
          .focused()
          .type(String(Number(elem.text().match(/\d+/)?.[0] || 0) + 10000))
          .type('{enter}'),
      );
    cy.contains('button', 'Подтвердить').click();
    cy.wait(1000);

    cy.focused().type('{backspace}').type('{enter}');
    cy.contains(
      'div',
      `Вы точно хотите удалить показание за ${Cypress.dayjs().format('MMMM')}`,
    );
    cy.contains('button', 'Подтвердить').click();
    cy.wait(1000);
    cy.focused().trigger('mouseout');

    cy.focused().type('{enter}');

    cy.get('@inputs').eq(1).find('input').should('have.focus');

    cy.contains('div', /Последнее показание/)
      .should('be.visible')
      .then((elem) =>
        cy
          .focused()
          .type(String(Number(elem.text().match(/\d+/)?.[0] || 0) + 10000))
          .type('{enter}'),
      );
    cy.contains('button', 'Отмена').click();
    cy.wait(1000);
  });
});
