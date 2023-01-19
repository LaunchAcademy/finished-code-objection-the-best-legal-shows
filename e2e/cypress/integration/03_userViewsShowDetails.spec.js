/// <reference types="cypress" />

context("Shows Index Page", () => {
    beforeEach(() => {
        let showId
        // clear the shows table and seed what you think is needed!
        // youll need to use the `find` task in order to retrieve the id of the seeded show here
        cy.task("db:truncate", "Show" )
        cy.task("db:insert", { modelName: "Show", json: { title: "The Last of Us", premiereYear: "2023", network: "HBO", description: "good show" } })
        

        cy.task("db:find", { modelName: "Show", conditions: { title: "The Last of Us" } }).then((shows) => {
            showId = shows[0].id
            // has to be in the callback to get access to a JS variable
            cy.visit(`/shows/${showId}`)
        })
    })

    context("when viewing the show details page", () => {
        it("the user can see each of the details regarding that show", () => {
            cy.get("h2").should("include.text", "The Last of Us")
            // YOUR CODE HERE
        })

        it("the page has a link to the new TV Show index page", () => {
            cy.contains('Back to All Shows').click()
            cy.location('pathname').should('eq', '/shows')
        })
    })
})
