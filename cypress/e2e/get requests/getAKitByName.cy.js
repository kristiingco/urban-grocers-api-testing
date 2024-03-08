/// <reference types="Cypress"/>

describe("Get a Kit By Name", () => {
    let data;

    before(() => {
        cy.fixture("search").then((searchData) => {
            data = searchData;
        });
    });

    beforeEach(() => {
        cy.request(`/api/v1/kits/search?name=${data.successfulSearch}`).as(
            "successfulSearch"
        );

        cy.request({
            url: `/api/v1/kits/search?name=${data.failingSearch}`,
            failOnStatusCode: false,
        }).as("failingSearch");
    });

    it("passes", () => {
        cy.visit("https://example.cypress.io");
    });
});
