describe('stack test', () => {
    beforeEach(() => {
        cy.visit('/stack')
        cy.contains('Добавить').as('add_btn')
        cy.contains('Удалить').as('delete_btn')
        cy.contains('Очистить').as('clear_btn')
        cy.get('input').as('input')
    })

    it('should have empty input', () => {
        cy.get('@input').should('have.value', '')
        cy.get('@add_btn').should('be.disabled')
        cy.get('@delete_btn').should('be.disabled')
        cy.get('@clear_btn').should('be.disabled')

        cy.get('@input').type('123').should('have.value', '123')
        cy.get('@add_btn').should('not.be.disabled')
        cy.get('@delete_btn').should('be.disabled')
        cy.get('@clear_btn').should('be.disabled')

        cy.get('@input').clear().should('have.value', '')
        cy.get('@add_btn').should('be.disabled')
        cy.get('@delete_btn').should('be.disabled')
        cy.get('@clear_btn').should('be.disabled')
    })

    it('add node action', () => {
        const DELAY = 500
        cy.clock()

        cy.get('@input').type('123').should('have.value', '123')
        cy.get('@add_btn').click()

        cy.get('div[class*="circle_circle"]').as('circles')
        cy.get('@circles').should(($lis) => {
            expect($lis).to.have.length(1)
            expect($lis.eq(0)).to.contain('123').to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($lis.eq(0).prev('div')).to.contain('top')
            expect($lis.eq(0).next('p')).to.contain('0')
        })
        cy.tick(DELAY)
        cy.get('@circles').should(($lis) => {
            expect($lis).to.have.length(1)
            expect($lis.eq(0)).to.contain('123').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(0).prev('div')).to.contain('top')
            expect($lis.eq(0).next('p')).to.contain('0')
        })
    })

    it('delete node action', () => {
        cy.get('@input').type('123').should('have.value', '123')
        cy.get('@add_btn').click()
        cy.get('div[class*="circle_circle"]').should('be.exist')
        cy.get('@delete_btn').click()
        cy.get('div[class*="circle_circle"]').should('not.be.exist')
    })

    it('clear node action', () => {
        cy.get('@input').type('123').should('have.value', '123')
        cy.get('@add_btn').click()
        cy.get('@input').type('asd').should('have.value', 'asd')
        cy.get('@add_btn').click()
        cy.get('@input').type('qwe').should('have.value', 'qwe')
        cy.get('@add_btn').click()
        cy.get('div[class*="circle_circle"]').should('be.exist')
        cy.get('@clear_btn').click()
        cy.get('div[class*="circle_circle"]').should('not.be.exist')
    })
})