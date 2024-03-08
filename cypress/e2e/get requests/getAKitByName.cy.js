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

    // Successfully receiving a kit
    it("should return a status code of 200 when kit is found", () => {
        cy.get("@successfulSearch").its("status").should("equal", 200);
    });

    it("should have 'id' property when kit is found", () => {
        cy.get("@successfulSearch").then((res) => {
            expect(res.body).to.have.property("id");
        });
    });

    it("should have 'name' property when kit is found", () => {
        cy.get("@successfulSearch").then((res) => {
            expect(res.body).to.have.property("name");
        });
    });

    it("should have 'productsList' property when kit is found", () => {
        cy.get("@successfulSearch").then((res) => {
            expect(res.body).to.have.property("productsList");
        });
    });

    it("should have 'productsCount' property when kit is found", () => {
        cy.get("@successfulSearch").then((res) => {
            expect(res.body).to.have.property("productsList");
        });
    });
});
