const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: "cypress-mochawesome-reporter",
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
        },
        baseUrl:
            "https://cnt-310b9285-a9d2-4db2-9cce-d5456e939cb0.containerhub.tripleten-services.com",
        screenshotOnRunFailure: false,
        video: false,
    },
});
