describe('service is available', () => {

  it('should be available on localhost:3000', () => {
    cy.visit('/')
  })

  it('should open all pages', function() {
    cy.get('main a[href]').each(page=>{
      cy.request(page.prop('href'));
    });
  });
})