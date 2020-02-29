describe('Homepage', () => {
  it('is able to load', () => {
    cy.visit('/')
  })

  it('is header visible', () => {
    cy.get('h1').should('contain', 'Grapefruit')
  })

  it('is slogan visible', () => {
    cy.get('h4').should('contain', '"They\'re Gr-r-reat Fruit!!"')
  })

  it('is Home button visible', () => {
    cy.get('a[href="/home"]').should('contain', 'Home')
  })

  it('is Login visible', () => {
    cy.get('a[href="/login"]').should('contain', 'Login')
  })

  it('is Sign Up visible', () => {
    cy.get('a[href="/signup"]').should('contain', 'Sign Up')
  })

  it('is HomePage icon visible', () => {
    cy.get('a[href="/"] i')
  })

  it('is Cart icon visible', () => {
    cy.get('a[href="/cart"]')
  })

  it('is Filter button visible', () => {
    cy.get('button').contains('Filter')
  })

  it('is showing 15 products', () => {
    cy.get('a img[class="allProductImg"]').should('have.length', 15)
  })
})

context('Homepage with stubbed database', function() {
  it('can visit /dashboard', function() {
    cy.server()
    cy.fixture('products_0_15.json').then(json => {
      cy.route('GET', '/api/*', json)
    })

    cy.loginByForm('pawel@fsa.com', 'pawel')
    cy.get('a[href="/"] i').click()
    cy.get('a img[class="allProductImg"]').should('have.length', 15)
  })
})

context('Homepage - initial redux state ', function() {
  it('checks if catalog has 15 items', function() {
    cy.loginByForm('pawel@fsa.com', 'pawel')
    cy.get('a img[class="allProductImg"]').should('have.length', 15)
    cy
      .window()
      .its('store')
      .invoke('getState')
      .its('catalog')
      .should('have.length', 15)
  })
})
