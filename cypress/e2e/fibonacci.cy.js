describe('fibonacci sequence test', () => {
    before(() => {
        cy.visit('/fibonacci')
    })
    it('should have empty input', () => {
        cy.get('input').should('have.value', '')
        cy.contains('Рассчитать').should('be.disabled')
        cy.get('input').type('10').should('have.value', '10')
        cy.contains('Рассчитать').should('not.be.disabled')
        cy.get('input').clear().should('have.value', '')
        cy.contains('Рассчитать').should('be.disabled')
    })

    it('should have right fibonacci sequence', () => {
        const DELAY = 500
        cy.clock()
        cy.get('input').type('5').should('have.value', '5')
        cy.contains('Рассчитать').click();
        cy.get('div[class*="circle_circle"]').as('circles')
        cy.get('@circles').should(($lis) => {
            expect($lis).to.have.length(1)
            expect($lis.eq(0)).to.contain('0').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(0).next('p')).to.contain('0')
        })
        cy.tick(DELAY)
        cy.get('div[class*="circle_circle').should(($lis) => {
            expect($lis).to.have.length(2)
            expect($lis.eq(0)).to.contain('0').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(0).next('p')).to.contain('0')
            expect($lis.eq(1)).to.contain('1').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(1).next('p')).to.contain('1')
        })
        cy.tick(DELAY)
        cy.get('div[class*="circle_circle').should(($lis) => {
            expect($lis).to.have.length(3)
            expect($lis.eq(0)).to.contain('0').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(0).next('p')).to.contain('0')
            expect($lis.eq(1)).to.contain('1').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(1).next('p')).to.contain('1')
            expect($lis.eq(2)).to.contain('1').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(2).next('p')).to.contain('2')
        })
        cy.tick(DELAY)
        cy.get('div[class*="circle_circle').should(($lis) => {
            expect($lis).to.have.length(4)
            expect($lis.eq(0)).to.contain('0').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(0).next('p')).to.contain('0')
            expect($lis.eq(1)).to.contain('1').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(1).next('p')).to.contain('1')
            expect($lis.eq(2)).to.contain('1').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(2).next('p')).to.contain('2')
            expect($lis.eq(3)).to.contain('2').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(3).next('p')).to.contain('3')
        })
        cy.tick(DELAY)
        cy.get('div[class*="circle_circle').should(($lis) => {
            expect($lis).to.have.length(5)
            expect($lis.eq(0)).to.contain('0').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(0).next('p')).to.contain('0')
            expect($lis.eq(1)).to.contain('1').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(1).next('p')).to.contain('1')
            expect($lis.eq(2)).to.contain('1').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(2).next('p')).to.contain('2')
            expect($lis.eq(3)).to.contain('2').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(3).next('p')).to.contain('3')
            expect($lis.eq(4)).to.contain('3').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($lis.eq(4).next('p')).to.contain('4')
        })
    })
})