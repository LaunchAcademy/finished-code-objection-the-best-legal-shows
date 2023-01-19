// /// <reference types="cypress" />

context("New Show Form Page", () => {
    beforeEach(() => {
        cy.task("db:truncate", "Show")
        cy.visit("/shows/new")
    })

    context("on the new tv show form page", () => {
        context("when the user fills out the form correctly", () => {
            it("creates a new list item", () => {
                cy.get("#title")
                .type("The Last of Us Part 3")
                .should("have.value", "The Last of Us Part 3")

                cy.get("#network")
                .type("HBO")
                .should("have.value", "HBO")

                cy.get("#premiereYear")
                .type("2023")
                .should("have.value", "2023")

                cy.get("#description")
                .type("good show")
                .should("have.value", "good show")

                cy.get("form")
                .contains("Submit")
                .click()

                cy.location("pathname").should("eq", "/shows")

                cy.get("li")
                .last()
                .should("have.text", "The Last of Us Part 3")

                // get the first input field, type into the input field, and then assert that that field has the correct value

                // do this for each subsequent field
                // ....

                // click the button with the text that corresponds to your submit button

                // assert that the pathname has changed to the shows index page

                // asset that the list element in your list of lis contains your new show entry
            })
        })

        context("when the user fills out the form incorrectly", () => {
            it("remains on the new item form page if the form is submitted without a name and displays errors", () => {
                cy.get("form").submit()

                cy.get("h1").should("have.text", "We Have Evidence of a New Best Show!")

                cy.get(".errors").should("have.text", "Premiere Year: is a required propertyTitle: is a required property")

                // get the form and submit it                 

                // get the h2 tag, and ensure it has the text Add Your New Frand

                // ensure that an h2 tag with "Can you spot all of the stuffed animals in the space?" should not exist 

                // get the errors element (ideally by className), and ensure it has the text Name: is a required property
            })
        })
    }) 
})