/// <reference types="Cypress"/>

describe("Update Kit", () => {
    let data;

    before(() => {
        cy.fixture("itemsForKitUpdate").then((itemsForKitUpdateData) => {
            data = itemsForKitUpdateData;
        });
    });

    beforeEach(() => {
        cy.request({
            url: "/api/v1/kits/5",
            method: "PUT",
            body: {
                name: data.name,
                productsList: data.productsList,
            },
        }).as("existingKit");

        cy.request({
            url: "/api/v1/kits/52",
            method: "PUT",
            body: {
                name: data.name,
                productsList: data.productsList,
            },
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

    it("should have 'message' property set to 'Not Found' when kit is not found", () => {
        cy.get("@nonExistingKit").then((res) => {
            expect(res.body).to.have.property("message", "Not Found");
        });
    });
});
