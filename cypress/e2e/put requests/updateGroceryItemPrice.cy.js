/// <reference types="Cypress"/>

describe("Update Grocery Item Price", () => {
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

        cy.request({
            url: "/api/v1/products/210",
            method: "PUT",
            body: {
                price: data.price,
            },
            failOnStatusCode: false,
        }).as("nonExistingProduct");
    });

    //Successfully changing grocery item price
    it("should return a status code of 200 when item is found", () => {
        cy.get("@existingProduct").its("status").should("equal", 200);
    });

    it("should have 'ok' property set to 'true' when item is found", () => {
        cy.get("@existingProduct").then((res) => {
            expect(res.body).to.have.property("ok", true);
        });
    });

    //Attempting to change item price when product is not found
    it("should return a status code of 404 when item is found", () => {
        cy.get("@nonExistingProduct").its("status").should("equal", 404);
    });

    it("should have 'message' property set to 'Not Found' when item is found", () => {
        cy.get("@nonExistingProduct").then((res) => {
            expect(res.body).to.have.property("message", "Not Found");
        });
    });
});
