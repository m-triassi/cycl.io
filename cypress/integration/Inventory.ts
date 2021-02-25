import faker from 'faker'

describe('Inventory test', () => {
    it('Add Inventory', () => {
        cy.intercept('/inventory').as('getInventory')
        cy.intercept({
            method: 'POST',
            url: '/inventory'
        }).as('addInventory')
        cy.login()
        cy.visit('/Production/Inventory')
        cy.wait('@getInventory')
        cy.get('button').contains('Add Inventory Item').click()
        cy.get('[data-cy="inventory-form-title"]').type(faker.name.findName())
        cy.get('[data-cy="inventory-form-cost"]').clear().type(faker.random.number().toString())
        cy.get('[data-cy="inventory-form-sale-price"]').clear().type(faker.random.number().toString())
        cy.get('[data-cy="inventory-form-description"]').type(faker.random.words())
        cy.get('button').contains('OK').click()
        cy.wait(['@addInventory', '@getInventory'])
        cy.get('span').contains('Inventory added').should('be.visible')
    })
    it('Search Inventory', () => {
        cy.intercept('/inventory').as('getInventory')
        cy.login()
        cy.visit('/Production/Inventory')
        cy.wait('@getInventory').then((xhr) => {
            expect(xhr.response?.statusCode).to.equal(200)
        })
        cy.get('input[placeholder="Search Inventory Item"]').type('123{enter}')
        cy.wait('@getInventory').then((xhr) => {
            expect(xhr.response?.statusCode).to.equal(200)
            expect(xhr.response?.url).to.equal('http://localhost/inventory?q=123')
        })
    })
})