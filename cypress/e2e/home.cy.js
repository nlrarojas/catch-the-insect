describe('home page', () => {
  it('Start page is displayed', () => {
    cy.visit('127.0.0.1:8080')
    cy.get('h1')
      .should('exist')
      .contains('Catch The Insect')
    cy.get('button')
      .should('exist')
      .contains('Play Game')
  })

  it('Start a game', () => {
    cy.visit('127.0.0.1:8080')
    cy.get('#start-btn')
      .should('exist')
      .click()
    cy.get('.choose-insect-btn')
      .should('have.length.gt', 3)
      // get the number of elements
      .its('length')
      .then((n) => Cypress._.random(0, n - 1))
      .then((k) => {
        cy.log(`picked random index ${k}`)
        // get all elements again and pick one
        cy.get('.choose-insect-btn').eq(k).click()
        // confirm the click
        cy.get('.insect').should('have.length', 1)
      })
  })
  
  it('Simulate a game', () => {
    cy.visit('127.0.0.1:8080')
    cy.get('#start-btn')
      .should('exist')
      .click()
    cy.get('.choose-insect-btn')
      .should('have.length.gt', 3)
      // get the number of elements
      .its('length')
      .then((n) => Cypress._.random(0, n - 1))
      .then((k) => {
        cy.log(`picked random index ${k}`)
        // get all elements again and pick one
        cy.get('.choose-insect-btn').eq(k).click()
        // confirm the click
        cy.get('.insect').should('have.length', 1)
      })
    cy.get('.insect')
      .should('have.length.gt', 0)
      .click()
    cy.get('.insect')
      .should('have.length.gt', 1)
    cy.get('.insect')
      .eq(0)
      .click()
    cy.get('.insect')
      .eq(1)
      .click()
    cy.get('.insect')
      .should('have.length.gt', 2)    
  })

  it('Page elements are loaded correctly, timer is updated', () => {
    cy.visit('127.0.0.1:8080')
    cy.get('#start-btn')
      .should('exist')
      .click()

    cy.get('.choose-insect-btn')
      .should('have.length.gt', 3)
      // get the number of elements
      .its('length')
      .then((n) => Cypress._.random(0, n - 1))
      .then((k) => {
        cy.log(`picked random index ${k}`)
        // get all elements again and pick one
        cy.get('.choose-insect-btn').eq(k).click()
        // confirm the click
        cy.get('.insect').should('have.length', 1)
      })
    cy.clock()

    cy.get('#time')
      .should('exist')

    cy.tick(1000)
    cy.get('#time').should('have.text', 'Time: 00:04')
    cy.tick(1000)
    cy.get('#time').should('have.text', 'Time: 00:05')
  })
  
  it('Page elements are loaded correctly, score is updated', () => {
    cy.visit('127.0.0.1:8080')
    cy.get('#start-btn')
      .should('exist')
      .click()

    cy.get('.choose-insect-btn')
      .should('have.length.gt', 3)
      // get the number of elements
      .its('length')
      .then((n) => Cypress._.random(0, n - 1))
      .then((k) => {
        cy.log(`picked random index ${k}`)
        // get all elements again and pick one
        cy.get('.choose-insect-btn').eq(k).click()
        // confirm the click
        cy.get('.insect').should('have.length', 1)
      })

    cy.get('#score')
      .should('exist')

    cy.get('#score').should('have.text', 'Score: 0')

    cy.get('.insect')
      .should('have.length.gt', 0)
      .click()

    cy.get('#score').should('have.text', 'Score: 1')

    cy.get('.insect')
      .eq(0)
      .click()

    cy.get('#score').should('have.text', 'Score: 2')
  })
})