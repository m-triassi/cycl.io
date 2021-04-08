import faker from 'faker'

describe('Sale test', () => {
    it('Add Sale', () => {
        cy.intercept('/inventory').as('getInventory')
        cy.intercept('/sale').as('filterSale')
        cy.intercept({
            method: 'PUT',
            url: 'sale/orderables/0'
        }).as('addSale')
        cy.login()
        cy.visit('/Sales')
        cy.wait('@getInventory')
        cy.wait('@filterSale')
        cy.get('button').contains('Create Sale').click()
        cy.get('[data-cy="sale-form-description"]').type(faker.random.words())
        cy.get('[data-cy="sale-form-client-name"]').type(faker.name.findName())
        cy.get('[data-cy="sale-form-payment-type"]').click()
        cy.get('[data-cy="sale-form-payment-type"]').click()
        cy.get('[ant-select-selection-item]').contains('Visa').click()
        cy.get('[data-cy="sale-form-card-number"]').clear().type(faker.random.number().toString())
        cy.get('[data-cy="sale-form-card-name"]').type(faker.name.findName())
        cy.get('[data-cy="sale-material-select"]').get('select').eq(0)
        cy.get('[data-cy="sale-material-quantity"]').clear().type(faker.random.number().toString())
        cy.get('button').contains('OK').click()
        cy.wait(['@addSale', '@filterSale'])
        // cy.get('span').contains('Sale added').should('be.visible')
    })
    // it('Search Inventory', () => {
    //     cy.intercept('/inventory').as('getInventory')
    //     cy.login()
    //     cy.visit('/Production/Inventory')
    //     cy.wait('@getInventory').then((xhr) => {
    //         expect(xhr.response?.statusCode).to.equal(200)
    //     })
    //     cy.get('input[placeholder="Search Inventory Item"]').type('123{enter}')
    //     cy.wait('@getInventory').then((xhr) => {
    //         expect(xhr.response?.statusCode).to.equal(200)
    //         expect(xhr.response?.url).to.equal('http://localhost/inventory?q=123')
    //     })
    // })
})