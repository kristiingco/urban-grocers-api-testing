const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: "cypress-mochawesome-reporter",
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
        },
        baseUrl:
            "https://cnt-e8abf369-dff1-4452-b714-8bdd00a1f0cc.containerhub.tripleten-services.com",
        screenshotOnRunFailure: false,
        video: false,
    },
});
