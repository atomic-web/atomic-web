describe('Toast', () => {
  it('Positions Currectly', () => {
    cy.visit('/iframe.html?id=datadisplay-toast-default--default');

    cy.get('body')
      .width()
      .then((bodyWidth) => {
        cy.get('button').contains('Show Toast').click();

        cy.get('.toast-item[data-id="1"]')
          .closest('.toast-container')
          .should('have.css', 'left', '0px')
          .should('have.css', 'flex-direction', 'column')
          .contains('Close')
          .click();

        cy.contains('Top Center').click();
        cy.contains('Show Toast').click();

        cy.get('.toast-item[data-id="2"]')
          .closest('.toast-container')
          .should('have.css', 'flex-direction', 'column')
          .should('have.css', 'left', `${(bodyWidth * 50) / 100}px`)
          .contains('Close')
          .click();

        cy.contains('Top Right').click();
        cy.contains('Show Toast').click();

        cy.get('.toast-item[data-id="3"]')
          .closest('.toast-container')
          .should('have.css', 'right', '0px')
          .should('have.css', 'flex-direction', 'column')
          .contains('Close')
          .click();

        cy.contains('Bottom Left').click();
        cy.contains('Show Toast').click();

        cy.get('.toast-item[data-id="4"]')
          .closest('.toast-container')
          .should('have.css', 'left', '0px')
          .should('have.css', 'flex-direction', 'column-reverse')
          .contains('Close')
          .click();

        cy.contains('Bottom Center').click();
        cy.contains('Show Toast').click();

        cy.get('.toast-item[data-id="5"]')
          .closest('.toast-container')
          .should('have.css', 'flex-direction', 'column-reverse')
          .should('have.css', 'left', `${(bodyWidth * 50) / 100}px`)
          .contains('Close')
          .click();

        cy.contains('Bottom Right').click();
        cy.contains('Show Toast').click();

        cy.get('.toast-item[data-id="6"]')
        .closest('.toast-container')
        .should('have.css', 'right', '0px')
        .should('have.css', 'flex-direction', 'column-reverse')
        .contains('Close')
        .click();
      });
  });
});
