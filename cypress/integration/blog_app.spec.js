describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create a user to db for testing purposes
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.get('#username')
    cy.contains('password')
    cy.get('#password')
    cy.get("#login-button").contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // fill in login form
      cy.get('#username').type('testuser')
      cy.get('#password').type('salasana')

      // click login button
      cy.get('#login-button').click()

      // // verify local storage
      // localStorage.getItem('bloglistAppUser')

      // verify stuff shown
      cy.contains('blogs')
      cy.contains('Test User logged in')
      cy.get('#logout-button').contains('logout')
    })

    it('fails with wrong credentials', function () {
      // fill in login form
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpass')

      // click login button
      cy.get('#login-button').click()

      // verify stuff shown
      cy.get('#notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})