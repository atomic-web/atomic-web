describe('OverflowNav', () => {
    it('menu displayed', () => {
       cy.visit('/iframe.html?id=navigation-overflownav-default--default')
       cy.get('[aria-label="Open Menu"]').click();
       cy.get("button").should("have.length",10);
    });

    it('render custom tag', () => {
      cy.visit('/iframe.html?id=navigation-overflownav-custom-tag--custom-tag')
      cy.get('[aria-role="menu"]').find(">*").should("match.");
   });
});
