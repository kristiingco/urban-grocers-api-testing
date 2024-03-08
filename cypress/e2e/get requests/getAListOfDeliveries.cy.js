/// <reference types="Cypress"/>

describe("Get a List of Deliveries", () => {
    beforeEach(() => {
        cy.request("/api/v1/couriers").as("getListOfDeliveries");
    });

    it("should return a status code of 200", () => {
        cy.get("@getListOfDeliveries").its("status").should("equal", 200);
    });

    it("should return an array with a length greater than 0", () => {
        cy.get("@getListOfDeliveries").then((res) => {
            expect(res.body).to.have.lengthOf.above(0);
        });
    });

    it("should not result to null", () => {
        cy.get("@getListOfDeliveries").then((res) => {
            expect(res.body).to.not.be.null;
        });
    });
});
