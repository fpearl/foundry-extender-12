// Initialize Foundry Extender 12 settings
Hooks.once("init", () => {
    console.log("Initializing Foundry Extender 12...");

    // Register the auto-close door setting
    game.settings.register("foundry-extender-12", "enableAutoCloseDoor", {
        name: "Enable Auto-Close Door",
        hint: "Automatically close doors after 10 seconds of being opened.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });
});
