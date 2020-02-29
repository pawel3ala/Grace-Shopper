context('shoping cart page', function () {
    it('is able to load', function () {
        cy.loginByForm("pawel@fsa.com", "pawel")
        cy.get('a[href="/cart"]').click()

        /*
        DOM elements lookups
        cy.get('...)
        */
    })
    it('initially cart is empty', function () {
        cy.get('h1').should('contain', 'Cart is Empty')

    })

    // it('initially cart is empty', function () {
    //     cy.visit('/product/1')
    //     cy.get('button').click()

    //     const purchasedProduct = [{id: 1}]
    //     cy.verifyShopingCart(purchasedProduct)

    // })



})