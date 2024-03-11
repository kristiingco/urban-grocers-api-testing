/// <reference types="Cypress"/>

describe("Add Items to Kit (Success)", () => {
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
    });

    it("should return a status code of 200", () => {
        cy.get("@existingKit").its("status").should("equal", 200);
    });

    it("should have 'id' property", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("id");
        });
    });

    it("should have 'name' property", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("name");
        });
    });

    it("should have 'productsList' property", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("productsList");
        });
    });

    it("should have 'productsCount' property", () => {
        cy.get("@existingKit").then((res) => {
            expect(res.body).to.have.property("productsCount");
        });
    });
});

describe("Add Items to Kit (Failure)", () => {
    let data;

    before(() => {
        cy.fixture("itemsToAdd").then((itemsToAddData) => {
            data = itemsToAddData;
        });
    });

    beforeEach(() => {
        cy.request({
            url: "/api/v1/kits/10/products",
            method: "POST",
            body: {
                productsList: data.productsList,
            },
            failOnStatusCode: false,
        }).as("nonExistingKit");
    });

    it("should return a status code of 404", () => {
        cy.get("@nonExistingKit").its("status").should("equal", 404);
    });

    it("should have a 'message' property with the value 'Not Found'", () => {
        cy.get("@nonExistingKit").then((res) => {
            expect(res.body).to.have.property("message", "Not Found");
        });
    });
});
