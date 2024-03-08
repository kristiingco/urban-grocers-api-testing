/// <reference types="Cypress"/>

describe("Create User Account", () => {
    let data;

    before(() => {
        cy.fixture("user").then((userData) => {
            data = userData;
        });
    });

    beforeEach(() => {
        cy.request({
            url: "/api/v1/users",
            method: "POST",
            body: {
                firstName: data.firstName,
                email: data.email,
                phone: data.phone,
                comment: data.comment,
                address: data.address,
            },
        }).as("successfulUserCreation");

        cy.request({
            url: "/api/v1/users",
            method: "POST",
            body: {
                email: data.email,
                phone: data.phone,
                comment: data.comment,
                address: data.address,
            },
            failOnStatusCode: false,
        }).as("noFirstName");

        cy.request({
            url: "/api/v1/users",
            method: "POST",
            body: {
                firstName: data.firstName,
                email: data.email,
                comment: data.comment,
                address: data.address,
            },
            failOnStatusCode: false,
        }).as("noPhone");

        cy.request({
            url: "/api/v1/users",
            method: "POST",
            body: {
                firstName: data.firstName,
                phone: data.phone,
                email: data.email,
                comment: data.comment,
            },
            failOnStatusCode: false,
        }).as("noAddress");

        cy.request({
            url: "/api/v1/users",
            method: "POST",
            body: {
                firstName: data.invalidFirstName,
                email: data.email,
                phone: data.phone,
                comment: data.comment,
                address: data.address,
            },
            failOnStatusCode: false,
        }).as("invalidFirstName");

        cy.request({
            url: "/api/v1/users",
            method: "POST",
            body: {
                firstName: data.firstName,
                email: data.email,
                phone: data.invalidPhone,
                comment: data.comment,
                address: data.address,
            },
            failOnStatusCode: false,
        }).as("invalidPhone");

        cy.request({
            url: "/api/v1/users",
            method: "POST",
            body: {
                firstName: data.firstName,
                email: data.email,
                phone: data.phone,
                comment: data.comment,
                address: data.invalidAddress,
            },
            failOnStatusCode: false,
        }).as("invalidAddress");
    });

    // Successfully creating a user account
    it("should return a status code of 201 when user is successfully created", () => {
        cy.get("@successfulUserCreation").its("status").should("equal", 201);
    });

    it("should have 'authToken' property when user is successfully created", () => {
        cy.get("@successfulUserCreation").then((res) => {
            expect(res.body).to.have.property("authToken");
        });
    });

    // Creating a user account when firstName is not passed
    it("should return a status code of 400 when first name is not passed", () => {
        cy.get("@noFirstName").its("status").should("equal", 400);
    });

    it("should have 'message' property with the value 'Not all required parameters have been passed' when first name is not passed", () => {
        cy.get("@noFirstName").then((res) => {
            expect(res.body).to.have.property(
                "message",
                "Not all required parameters have been passed"
            );
        });
    });

    // Creating a user account when phone number is not passed
    it("should return a status code of 400 when phone number is not passed", () => {
        cy.get("@noPhone").its("status").should("equal", 400);
    });

    it("should have 'message' property with the value 'Not all required parameters have been passed' when phone number is not passed", () => {
        cy.get("@noPhone").then((res) => {
            expect(res.body).to.have.property(
                "message",
                "Not all required parameters have been passed"
            );
        });
    });

    // Creating a user account when address is not passed
    it("should return a status code of 400 when address is not passed", () => {
        cy.get("@noAddress").its("status").should("equal", 400);
    });

    it("should have 'message' property with the value 'Not all required parameters have been passed' when address is not passed", () => {
        cy.get("@noAddress").then((res) => {
            expect(res.body).to.have.property(
                "message",
                "Not all required parameters have been passed"
            );
        });
    });

    // Creating a user account when username is invalid
    it("should return a status code of 400 when username is invalid", () => {
        cy.get("@invalidFirstName").its("status").should("equal", 400);
    });

    it("should have 'message' property with the correct value when username is invalid", () => {
        cy.get("@invalidFirstName").then((res) => {
            expect(res.body).to.have.property(
                "message",
                "You have entered an invalid username. The name can contain only Latin letters, the length should be 2-15 characters."
            );
        });
    });

    // Creating a user account when phone number is invalid
    it("should return a status code of 400 when phone number is invalid", () => {
        cy.get("@invalidPhone").its("status").should("equal", 400);
    });

    it("should have 'message' property with the correct value when phone number is invalid", () => {
        cy.get("@invalidPhone").then((res) => {
            expect(res.body).to.have.property(
                "message",
                "You have entered an invalid user's phone number. The phone number can only contain numbers and a + sign"
            );
        });
    });

    // Creating a user account when address is invalid
    it("should return a status code of 400 when address is invalid", () => {
        cy.get("@invalidAddress").its("status").should("equal", 400);
    });

    it("should have 'message' property with the correct value when address is invalid", () => {
        cy.get("@invalidAddress").then((res) => {
            expect(res.body).to.have.property(
                "message",
                "You have entered an invalid address. The address can contain only Latin characters and punctuation marks, the address length should be 5-50 characters"
            );
        });
    });
});
