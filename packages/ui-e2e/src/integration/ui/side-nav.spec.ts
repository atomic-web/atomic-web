describe('SideNav', () => {
  it('Custom Styling', () => {
    cy.visit(
      '/iframe.html?id=navigation-sidenav-custom-styling--custom-styling'
    );
    cy.get('.side-nav')
      .find('.side-nav-item.active')
      .should('have.css', 'background-color', 'rgb(125, 76, 219)')
      .should('have.text', 'Inbox')
      .realHover()
      .should('have.css', 'background-color', 'rgb(218, 218, 218)')
      .parent()
      .prev()
      .prev()
      .realClick()
      .next()
      .should('have.class', 'sub-items')
      .find('.side-nav-item')
      .first()
      .should('have.css', 'background-color', 'rgb(237, 237, 237)');
  });

  it('Mini Variant', () => {
    cy.visit(
      '/iframe.html?id=navigation-sidenav-minimized--minimized'
    );
    cy.get('.side-nav')
      .find('.side-nav-item')
      .first()
      .realHover();

    cy.contains('Dashboard');

    cy.get('[aria-label="Menu"]').click();

    cy.get('.side-nav')
      .should('have.css', 'width', '300px');

    cy.get('[aria-label="Menu"]').click();

    cy.get('.side-nav')
      .should('have.css', 'width', '80px');

  });

});
