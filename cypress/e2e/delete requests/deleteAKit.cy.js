/// <reference types="Cypress"/>

describe("Update Kit (Success)", () => {
    beforeEach(() => {
        cy.request({
            url: "/api/v1/kits/5",
            method: "DELETE",
        }).as("existingKit");
    });

    it("should return a status code of 200", () => {
        cy.get("@existingKit").its("status").should("equal", 200);
    });

    it("should have 'ok' property set to true", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("ok", true);
        });
    });
});

describe("Update Kit (Failure)", () => {
    beforeEach(() => {
        cy.request({
            url: "/api/v1/kits/52",
            method: "DELETE",
            failOnStatusCode: false,
        }).as("nonExistingKit");
    });

    it("should return a status code of 404", () => {
        cy.get("@nonExistingKit").its("status").should("equal", 404);
    });

    it("should have 'message' property", () => {
        cy.get("@nonExistingKit").then((res) => {
            expect(res.body).to.have.property("message");
        });
    });
});
