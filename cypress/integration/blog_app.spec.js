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

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user
      cy.login({ username: 'testuser', password: 'salasana' })
    })

    it('A blog can be created', function() {
      // Click 'new blog' button
      cy.contains('new blog').click()

      // Fill in the new blog form
      cy.get('#title').type('Test blog title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://my.test.blog.url')

      // Click create button
      cy.get('#create-button').click()

      // Verify success notification
      cy.get('#notification')
        .should('contain', 'a new blog Test blog title by Test Author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      // Verify blog is visible on screen
      cy.get('#blogs').as('bloglist')
      cy.get('@bloglist').contains('Test blog title')
      cy.get('@bloglist').contains('Test Author')
    })

    describe.only('When a blog exists', function() {
      beforeEach(function() {
        // Add a new blog
        cy.createBlog({
          title: 'Test blog title',
          author: 'Test Author',
          url: 'http://my.test.blog.url'
        })
      })

      it('it can be liked', function() {
        // Get a reference to the blog element
        cy.contains('Test blog title').parent().as('theBlog')

        // Click view button to display like button
        cy.get('@theBlog').find('#toggle-details').click()

        // Verify 0 likes for the blog
        cy.get('@theBlog').should('contain', 'likes 0')

        // Click like button for the blog
        cy.get('@theBlog').find('#like-button').click()

        // Verify notification
        cy.get('#notification')
        .should('contain', 'Blog Test blog title by Test Author updated')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

        // Verify 1 like for the blog
        cy.get('@theBlog').should('contain', 'likes 1')
      })

      it('it can be removed by the user who added it', function() {
        // Bind cypress to window.confirm event
        cy.on('window:confirm', (str) => {
          // Verify dialog propt
          expect(str).to.eq('Remove blog Test blog title by Test Author?')

          // Accept confirmation
          return true
        })

        // Get a reference to the blog element
        cy.contains('Test blog title').parent().as('theBlog')

        // Click view button to display remove button
        cy.get('@theBlog').find('#toggle-details').click()

        // Click remove button for the blog
        cy.get('@theBlog').find('#remove-button').click()

        // Verify notification 
        cy.get('#notification')
        .should('contain', 'Blog Test blog title by Test Author deleted')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

        // Verify blog is removed from list
        cy.get('#blogs').should('not.contain', 'Test blog title')
      })
    })
  })
})