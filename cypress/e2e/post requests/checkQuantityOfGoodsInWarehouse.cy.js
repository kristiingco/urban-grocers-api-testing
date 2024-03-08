/// <reference types="Cypress"/>

describe("Check Quantity of Goods in Warehouse", () => {
    let data;

    before(() => {
        cy.fixture("idsForQuantityCheck").then((idsForQuantityCheckData) => {
            data = idsForQuantityCheckData;
        });
    });

    beforeEach(() => {
        cy.request({
            url: "/api/v1/warehouses/amount",
            method: "POST",
            body: {
                ids: data.existingID,
            },
        }).as("existingItemQuantity");

        cy.request({
            url: "/api/v1/warehouses/amount",
            method: "POST",
            body: {
                ids: data.nonExistingID,
            },
            failOnStatusCode: false,
        }).as("nonExistingItemQuantity");
    });

    // Successfully checking the quantity of goods in warehouse
    it("should return a status code of 200 when item ID exists", () => {
        cy.get("@existingItemQuantity").its("status").should("equal", 200);
    });

    it("should have 'Everything You Need' property when item ID exists", () => {
        cy.get("@existingItemQuantity").then((res) => {
            expect(res.body).to.have.property("Everything You Need");
        });
    });

    it("should have 'Food City' property when item ID exists", () => {
        cy.get("@existingItemQuantity").then((res) => {
            expect(res.body).to.have.property("Food City");
        });
    });

    it("should have 'Big World' property when item ID exists", () => {
        cy.get("@existingItemQuantity").then((res) => {
            expect(res.body).to.have.property("Big World");
        });
    });

    it("should have 'Fresh Food' property when item ID exists", () => {
        cy.get("@existingItemQuantity").then((res) => {
            expect(res.body).to.have.property("Fresh Food");
        });
    });

    // Checking the quantity of goods in warehouse when product id does not exist

    it("should return a status code of 404 when item ID does not exist", () => {
        cy.get("@nonExistingItemQuantity").its("status").should("equal", 404);
    });

    it("should have message' property when item ID does not exist", () => {
        cy.get("@nonExistingItemQuantity").then((res) => {
            expect(res.body).to.have.property("message");
        });
    });
});
