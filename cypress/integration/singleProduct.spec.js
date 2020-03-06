context('Single product page', function() {
  it('is able to load', function() {
    cy.fixture('credentials').then(credentials => {
      const {email} = credentials
      const {password} = credentials
      cy.loginByForm(email, password)
    })

    cy.visit('/product/1')

    /*
        DOM elements lookups
        cy.get('...)
        */
  })
})
