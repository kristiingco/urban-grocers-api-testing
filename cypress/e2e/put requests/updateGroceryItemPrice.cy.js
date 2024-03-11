/// <reference types="Cypress"/>

describe("Update Grocery Item Price (Success)", () => {
    let data;

    before(() => {
        cy.fixture("price").then((priceData) => {
            data = priceData;
        });
    });

    beforeEach(() => {
        cy.request({
            url: "/api/v1/products/3",
            method: "PUT",
            body: {
                price: data.price,
            },
        }).as("existingProduct");
    });

    it("should return a status code of 200", () => {
        cy.get("@existingProduct").its("status").should("equal", 200);
    });

    it("should have 'ok' property set to true", () => {
        cy.get("@existingProduct").then((res) => {
            expect(res.body).to.have.property("ok", true);
        });
    });
});

describe("Update Grocery Item Price (Failure)", () => {
    let data;

    before(() => {
        cy.fixture("price").then((priceData) => {
            data = priceData;
        });
    });

    beforeEach(() => {
        cy.request({
            url: "/api/v1/products/210",
            method: "PUT",
            body: {
                price: data.price,
            },
            failOnStatusCode: false,
        }).as("nonExistingProduct");
    });

    it("should return a status code of 404", () => {
        cy.get("@nonExistingProduct").its("status").should("equal", 404);
    });

    it("should have 'message' property set to 'Not Found'", () => {
        cy.get("@nonExistingProduct").then((res) => {
            expect(res.body).to.have.property("message", "Not Found");
        });
    });
});
