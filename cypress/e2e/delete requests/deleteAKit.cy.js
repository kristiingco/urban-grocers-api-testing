/// <reference types="Cypress"/>

describe("Update Kit", () => {
    beforeEach(() => {
        cy.request({
            url: "/api/v1/kits/5",
            method: "DELETE",
        }).as("existingKit");

        cy.request({
            url: "/api/v1/kits/52",
            method: "DELETE",
            failOnStatusCode: false,
        }).as("nonExistingKit");
    });

    //Successfully updating kit
    it("should return a status code of 200 when kit is found", () => {
        cy.get("@existingKit").its("status").should("equal", 200);
    });

    it("should have 'ok' property set to 'true' when kit is found", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("ok", true);
        });
    });

    //Attempting to update kit when kit id is not found
    it("should return a status code of 404 when kit is not found", () => {
        cy.get("@nonExistingKit").its("status").should("equal", 404);
    });

    it("should have 'message' property when kit is not found", () => {
        cy.get("@nonExistingKit").then((res) => {
            expect(res.body).to.have.property("message");
        });
    });
});
