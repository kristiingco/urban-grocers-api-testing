/// <reference types="Cypress"/>

describe("Add Items to Kit", () => {
    let data;

    before(() => {
        cy.fixture("itemsToAdd").then((itemsToAddData) => {
            data = itemsToAddData;
        });
    });

    beforeEach(() => {
        cy.request({
            url: "/api/v1/kits/6/products",
            method: "POST",
            body: {
                productsList: data.productsList,
            },
        }).as("existingKit");

        cy.request({
            url: "/api/v1/kits/10/products",
            method: "POST",
            body: {
                productsList: data.productsList,
            },
            failOnStatusCode: false,
        }).as("nonExistingKit");
    });

    //Successfully adding items to the kit
    it("should return a status code of 200 when kit is found", () => {
        cy.get("@existingKit").its("status").should("equal", 200);
    });

    it("should have 'id' property when kit is found", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("id");
        });
    });

    it("should have 'name' property when kit is found", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("name");
        });
    });

    it("should have 'productsList' property when kit is found", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("productsList");
        });
    });

    it("should have 'productsCount' property when kit is found", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("productsCount");
        });
    });

    //Adding items to the kit when kit does not exist
    it("should return a status code of 404 when kit is not found", () => {
        cy.get("@nonExistingKit").its("status").should("equal", 404);
    });

    it("should have a 'message' property with the value 'Not Found' when kit is not found", () => {
        cy.get("@nonExistingKit").then((res) => {
            expect(res.body).to.have.property("message", "Not Found");
        });
    });
});
