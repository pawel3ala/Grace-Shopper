context('shoping cart page', function() {
  it('is able to load', function() {
    cy.fixture('credentials').then(credentials => {
      const {email} = credentials
      const {password} = credentials
      cy.loginByForm(email, password)
    })
    cy.get('a[href="/cart"]').click()

    /*
        DOM elements lookups
        cy.get('...)
        */
  })
  it('initially cart is empty', function() {
    // fire SQL to remove any posible existing cart items
    cy.get('h1').should('contain', 'Cart is Empty')
  })

  it('adding one item to cart', function() {
    cy.visit('/product/1')
    cy.get('button').click()

    const purchasedProduct = [{id: 1}]
    cy.verifyShopingCart(purchasedProduct)
  })
})
