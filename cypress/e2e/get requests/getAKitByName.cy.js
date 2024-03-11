/// <reference types="Cypress"/>

describe("Get a Kit By Name (Success)", () => {
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
    });

    it("should return a status code of 200", () => {
        cy.get("@successfulSearch").its("status").should("equal", 200);
    });

    it("should have 'id' property", () => {
        cy.get("@successfulSearch").then((res) => {
            expect(res.body).to.have.property("id");
        });
    });

    it("should have 'name' property", () => {
        cy.get("@successfulSearch").then((res) => {
            expect(res.body).to.have.property("name");
        });
    });

    it("should have 'productsList' property", () => {
        cy.get("@successfulSearch").then((res) => {
            expect(res.body).to.have.property("productsList");
        });
    });

    it("should have 'productsCount' property", () => {
        cy.get("@successfulSearch").then((res) => {
            expect(res.body).to.have.property("productsList");
        });
    });
});

describe("Get a Kit By Name (Failure)", () => {
    let data;

    before(() => {
        cy.fixture("search").then((searchData) => {
            data = searchData;
        });
    });

    beforeEach(() => {
        cy.request({
            url: `/api/v1/kits/search?name=${data.failingSearch}`,
            failOnStatusCode: false,
        }).as("failingSearch");
    });

    it("should return a status code of 404", () => {
        cy.get("@failingSearch").its("status").should("equal", 404);
    });

    it("should have a 'message' property with the value 'Not Found'", () => {
        cy.get("@failingSearch").then((res) => {
            expect(res.body).to.have.property("message", "Not Found");
        });
    });
});
