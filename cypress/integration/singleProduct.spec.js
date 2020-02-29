context('Single product page', function () {
    it('is able to load', function () {
        cy.loginByForm("pawel@fsa.com", "pawel")
        cy.visit('/product/1')

        /*
        DOM elements lookups
        cy.get('...)
        */

    })
})