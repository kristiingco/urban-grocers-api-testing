const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: "cypress-mochawesome-reporter",
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
        },
        baseUrl:
            "https://cnt-c4ed9c54-018d-43fd-aef9-59c5f64ceb4d.containerhub.tripleten-services.com",
        screenshotOnRunFailure: false,
        video: false,
    },
});
