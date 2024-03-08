/// <reference types="Cypress"/>

describe("Check Availability of Goods in Warehouse", () => {
    let data;

    before(() => {
        cy.fixture("itemsForAvailabilityCheck").then(
            (itemsForAvailabilityCheckData) => {
                data = itemsForAvailabilityCheckData;
            }
        );
    });

    beforeEach(() => {
        cy.request({
            url: "/api/v1/warehouses/check",
            method: "POST",
            body: {
                products: data.products,
            },
        }).as("productsAvailability");
    });

    it("should return a status code of 200", () => {
        cy.get("@productsAvailability").its("status").should("equal", 200);
    });

    it("should have 'Everything You Need'", () => {
        cy.get("@productsAvailability").then((res) => {
            expect(res.body).to.have.property("Everything You Need");
        });
    });

    it("should have 'Food City' property", () => {
        cy.get("@productsAvailability").then((res) => {
            expect(res.body).to.have.property("Food City");
        });
    });

    it("should have 'Big World' property when kit is found", () => {
        cy.get("@productsAvailability").then((res) => {
            expect(res.body).to.have.property("Big World");
        });
    });

    it("should have 'Fresh Food' property when kit is found", () => {
        cy.get("@productsAvailability").then((res) => {
            expect(res.body).to.have.property("Fresh Food");
        });
    });
});
