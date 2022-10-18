describe('list tests', () => {
    beforeEach(() => {
        cy.visit('/list')
        cy.contains('button', 'Добавить в head').as('addHead_btn');
        cy.contains('button', 'Добавить в tail').as('addTail_btn');
        cy.contains('button', 'Удалить из tail').as('deleteTail_btn');
        cy.contains('button', 'Удалить из head').as('deleteHead_btn');
        cy.contains('button', 'Добавить по индексу').as('addIndex_btn');
        cy.contains('button', 'Удалить по индексу').as('deleteIndex_btn');
        cy.get('input[placeholder="Введите значение"]').as('inputValue')
        cy.get('input[placeholder="Введите индекс"]').as('inputIndex')
    })

    it('should have empty input', () => {
        cy.get('@addTail_btn').should('be.disabled');
        cy.get('@addHead_btn').should('be.disabled');
        cy.get('@addIndex_btn').should('be.disabled');
        cy.get('@deleteIndex_btn').should('be.disabled');

        cy.get('@inputValue').type('123');
        cy.get('@addTail_btn').should('not.be.disabled');
        cy.get('@addHead_btn').should('not.be.disabled');

        cy.get('@inputIndex').type('0');
        cy.get('@addIndex_btn').should('not.be.disabled');
    })

    it('should add head element', () => {
        const DELAY = 500
        cy.clock()

        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@inputValue').type('123');
        cy.get('@addHead_btn').should('not.be.disabled').click();

        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_topCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('123').to.have.css('border-color', 'rgb(210, 82, 225)')
        })
        cy.tick(DELAY)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_topCircle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('123').to.have.css('border-color', 'rgb(127, 224, 81)')
        })
        cy.tick(DELAY)
        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('123').to.have.css('border-color', 'rgb(0, 50, 255)')
        })
    })

    it('should add tail element', () => {
        const DELAY = 500
        cy.clock()

        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@inputValue').type('123');
        cy.get('@addTail_btn').should('not.be.disabled').click();

        cy.get('@items').should($item => {
            const len = $item.length
            expect($item.eq(len - 1)
                .children('[class*="list_topCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('123').to.have.css('border-color', 'rgb(210, 82, 225)')
        })
        cy.tick(DELAY)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            const len = $item.length
            expect($item.eq(len - 1)
                .children('[class*="list_topCircle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(len - 1)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('123').to.have.css('border-color', 'rgb(127, 224, 81)')
        })
        cy.tick(DELAY)
        cy.get('@items').should($item => {
            const len = $item.length
            expect($item.eq(len - 1)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('123').to.have.css('border-color', 'rgb(0, 50, 255)')
        })
    })

    it('should add element to index', () => {
        const DELAY = 500
        cy.clock()

        cy.get('@inputIndex').clear()
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@inputValue').type('333');
        cy.get('@inputIndex').type('0');
        cy.get('@addIndex_btn').should('not.be.disabled').click();
        cy.tick(DELAY*4)

        cy.get('@inputIndex').clear()
        cy.get('@inputValue').type('222');
        cy.get('@inputIndex').type('1');
        cy.get('@addIndex_btn').should('not.be.disabled').click();
        cy.tick(DELAY*5)

        cy.get('@inputIndex').clear()
        cy.get('@inputValue').type('111');
        cy.get('@inputIndex').type('2');
        cy.get('@addIndex_btn').should('not.be.disabled').click();
        cy.tick(DELAY)

        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_topCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('111').to.have.css('border-color', 'rgb(210, 82, 225)')
        })
        cy.tick(DELAY)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_topCircle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($item.eq(1)
                .children('[class*="list_topCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('111').to.have.css('border-color', 'rgb(210, 82, 225)')
        })
        cy.tick(DELAY)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_topCircle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($item.eq(1)
                .children('[class*="list_topCircle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(1)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($item.eq(2)
                .children('[class*="list_topCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('111').to.have.css('border-color', 'rgb(210, 82, 225)')
        })
        cy.tick(DELAY*2)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_topCircle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($item.eq(1)
                .children('[class*="list_topCircle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(1)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($item.eq(2)
                .children('[class*="list_topCircle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(2)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('111').to.have.css('border-color', 'rgb(127, 224, 81)')
        })
        cy.tick(DELAY)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            expect($item.eq(2)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('111').to.have.css('border-color', 'rgb(0, 50, 255)')
        })
    })
    it('should delete element to index', () => {
        const DELAY = 500
        cy.clock()

        cy.get('@inputIndex').clear()
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@inputValue').type('333');
        cy.get('@inputIndex').type('0');
        cy.get('@addIndex_btn').should('not.be.disabled').click();
        cy.tick(DELAY*4)

        cy.get('@inputIndex').clear()
        cy.get('@inputValue').type('222');
        cy.get('@inputIndex').type('1');
        cy.get('@addIndex_btn').should('not.be.disabled').click();
        cy.tick(DELAY*5)

        cy.get('@inputIndex').clear()
        cy.get('@inputIndex').type('1');
        cy.get('@deleteIndex_btn').should('not.be.disabled').click();
        cy.tick(DELAY)

        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(210, 82, 225)')
        })
        cy.tick(DELAY)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($item.eq(1)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(210, 82, 225)')
        })
        cy.tick(DELAY*2)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($item.eq(1)
                .children('[class*="list_bottomCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('222').to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($item.eq(1)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(0, 50, 255)')
        })
        cy.tick(DELAY*2)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($item.eq(1)
                .children('[class*="list_bottomCircle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(1)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(0, 50, 255)').not.to.contain('222')
        })
    })
    it('should delete head element', () => {
        const DELAY = 500
        cy.clock()

        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@inputValue').type('123');
        cy.get('@addHead_btn').should('not.be.disabled').click();
        cy.tick(DELAY*2)
        cy.get('@deleteHead_btn').should('not.be.disabled').click();

        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_bottomCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('123').to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('').to.have.css('border-color', 'rgb(0, 50, 255)')
        })
        cy.tick(DELAY)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            expect($item.eq(0)
                .children('[class*="list_bottomCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(0)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(0, 50, 255)')
        })
    })
    it('should delete tail element', () => {
        const DELAY = 500
        cy.clock()

        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@inputValue').type('123');
        cy.get('@addTail_btn').should('not.be.disabled').click();
        cy.tick(DELAY*2)
        cy.get('@deleteTail_btn').should('not.be.disabled').click();

        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            const len = $item.length
            expect($item.eq(len - 1)
                .children('[class*="list_bottomCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('123').to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($item.eq(len - 1)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.contain('').to.have.css('border-color', 'rgb(0, 50, 255)')
        })
        cy.tick(DELAY)
        cy.get('[data-testid="listItem"]').should('be.exist').as('items')
        cy.get('@items').should($item => {
            const len = $item.length
            expect($item.eq(len - 1)
                .children('[class*="list_bottomCircle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('visibility', 'hidden')
            expect($item.eq(len - 1)
                .children('[class*="list_circle"]')
                .children('[class*="circle_content"]')
                .children('[class*="circle_circle"]'))
                .to.have.css('border-color', 'rgb(0, 50, 255)')
        })
    })
})