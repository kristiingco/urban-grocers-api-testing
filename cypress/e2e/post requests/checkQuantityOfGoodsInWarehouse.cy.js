/// <reference types="Cypress"/>

describe("Check Quantity of Goods in Warehouse (Success)", () => {
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
    });

    it("should return a status code of 200", () => {
        cy.get("@existingItemQuantity").its("status").should("equal", 200);
    });

    it("should have 'Everything You Need' property", () => {
        cy.get("@existingItemQuantity").then((res) => {
            expect(res.body).to.have.property("Everything You Need");
        });
    });

    it("should have 'Food City' property", () => {
        cy.get("@existingItemQuantity").then((res) => {
            expect(res.body).to.have.property("Food City");
        });
    });

    it("should have 'Big World' property", () => {
        cy.get("@existingItemQuantity").then((res) => {
            expect(res.body).to.have.property("Big World");
        });
    });

    it("should have 'Fresh Food' property", () => {
        cy.get("@existingItemQuantity").then((res) => {
            expect(res.body).to.have.property("Fresh Food");
        });
    });
});

describe("Check Quantity of Goods in Warehouse (Failure)", () => {
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
                ids: data.nonExistingID,
            },
            failOnStatusCode: false,
        }).as("nonExistingItemQuantity");
    });

    it("should return a status code of 404", () => {
        cy.get("@nonExistingItemQuantity").its("status").should("equal", 404);
    });

    it("should have 'message' property", () => {
        cy.get("@nonExistingItemQuantity").then((res) => {
            expect(res.body).to.have.property("message");
        });
    });
});
