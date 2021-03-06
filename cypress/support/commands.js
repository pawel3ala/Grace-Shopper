// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginByForm', (email, password) => {
  cy.visit('/')
  Cypress.log({
    name: 'loginByForm',
    message: `${email} | ${password}`
  })

  return cy.request({
    method: 'POST',
    url: '/auth/login',
    form: true,
    body: {
      email,
      password
    }
  })
})

Cypress.Commands.add('verifyShopingCart', arrayOfProducts => {
  arrayOfProducts.forEach(prod => {
    cy.get(`a[href='/product/${prod.id}']`)
  })
})
