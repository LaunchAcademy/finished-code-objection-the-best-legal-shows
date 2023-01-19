/// <reference types="cypress" />

context("Shows Index Page", () => {
  beforeEach(() => {
    // clear the relevant table so that tests are deterministic
    // YOUR CODE HERE
    cy.task("db:truncate", "Show")

    // add the record, designating model name then data
    // adding an array of object will add multiple
    // E.g.: cy.task("db:insert", { modelName: "model", json: "array of objects or object to seed"})
    // YOUR CODE HERE
    cy.task("db:insert", { modelName: "Show", json: [ 
      { title: "The Last of Us", premiereYear: "2023", network: "HBO", description: "good show" },
      { title: "The Last of Us Pt 2", premiereYear: "2023", network: "HBO", description: "good show again" }
    ]})


    cy.visit(`/shows`)
  })

  context("when viewing the shows index page", () => {
    it("the user can see the first and second TV show", () => {
      // Written for you: a test that asserts that the first show in our list is present
      cy.get(".shows")
        .find("li")
        .first()
        .should("have.text", "The Last of Us")

      // write a test that asserts that the second show from our list is also present
      // note: you can't use a `second` method, but you can access elements in a list with `.eq(<element_number>)` 

      cy.get(".shows")
        .find("li")
        .eq(1)
        .should("have.text", "The Last of Us Pt 2")

    })

    it("has a link to the new animal form page", () => {
      cy.contains('I OBJECT: I want to add a new Show!').click()
      cy.location('pathname').should('eq', '/shows/new')
    })

    it("each element is a link to a show details page", () => {
      cy.contains('The Last of Us').click()
      cy.get("h1").should("have.text", "Info on this show:")
    })
  })
})

// Issues 
// - the first show has old dummy text in the index test. Change that provided test!
// - need instructions on making test database, and then running the correct migration script for test
// - need to make sure ids are on all form fields for test
// - need to add an errors class to ErrorList
// show page "visit" needs to be in the find callback during setup