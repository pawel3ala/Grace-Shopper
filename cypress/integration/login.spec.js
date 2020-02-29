describe('Login', () => {
  beforeEach(function() {
    cy.visit('/')
    cy.get('a[href="/login"]').click()
  })

  it('displays errors on login', () => {
    cy.fixture('credentials').then(credentials => {
      const {email} = credentials
      const {password} = credentials

      cy.get('input[name=email]').type(email)
      cy.get('input[name=password]').type(`${password}typo{enter}`)
    })

    cy
      .get('form div')
      .should('be.visible')
      .and('contain', 'Wrong username and/or password')

    cy.url().should('include', '/login')
  })

  it('user is able to log in', () => {
    cy.fixture('credentials').then(credentials => {
      const {email} = credentials
      const {password} = credentials

      cy.get('input[name=email]').type(email)
      cy.get('input[name=password]').type(`${password}{enter}`)
    })

    cy.get('h3').should('contain', 'Welcome, pawel@fsa.com')

    cy.url().should('include', '/home')
    cy.get('a[href="#"]').should('contain', 'Logout')
    cy.get('a[href="/order"]').should('contain', 'Orders')
  })

  it('able to succesfully log out', () => {
    cy.fixture('credentials').then(credentials => {
      const {email} = credentials
      const {password} = credentials

      cy.get('input[name=email]').type(email)
      cy.get('input[name=password]').type(`${password}{enter}`)
    })

    cy.get('h3').should('contain', 'Welcome, pawel@fsa.com')

    cy.url().should('include', '/home')
    cy.get('a[href="#"]').click()
    cy.get('a[href="/login"]').should('contain', 'Login')
  })
})
