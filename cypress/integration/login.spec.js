describe('Login', () => {
    beforeEach(function () {
        cy.visit('/')
        cy.get('a[href="/login"]').click()
    })

    it('displays errors on login', () => {
        cy.get('input[name=email]').type('dupa@ppp.com')
        cy.get('input[name=password]').type('password123{enter}')

        cy
            .get('form div')
            .should('be.visible')
            .and('contain', 'Wrong username and/or password')

        cy.url().should('include', '/login')
    })

    it('user is able to log in', () => {
        cy.get('input[name=email]').type('pawel@fsa.com')
        cy.get('input[name=password]').type('pawel{enter}')

        cy.get('h3').should('contain', 'Welcome, pawel@fsa.com')

        cy.url().should('include', '/home')
        cy.get('a[href="#"]').should('contain', 'Logout')
        cy.get('a[href="/order"]').should('contain', 'Orders')
    })

    it('able to succesfully log out', () => {
        cy.get('input[name=email]').type('pawel@fsa.com')
        cy.get('input[name=password]').type('pawel{enter}')

        cy.get('h3').should('contain', 'Welcome, pawel@fsa.com')

        cy.url().should('include', '/home')
        cy.get('a[href="#"]').click()
        cy.get('a[href="/login"]').should('contain', 'Login')
    })
})