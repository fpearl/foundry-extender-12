// Auto-Close Door Script
// Version: 1.1.0
// Author: Frederic Pearl
// GitHub: https://github.com/fpearl
// Discord: DrDebruyere
// Description: Automatically closes doors 10 seconds after being opened unless disabled with a custom flag.

const AUTO_CLOSE_VERSION = "1.1.0";
console.log(`Auto-Close Door Script Version ${AUTO_CLOSE_VERSION} by Frederic Pearl is running.`);

Hooks.on("updateWall", (wallDocument, change, options, userId) => {
    try {
        console.log("updateWall Triggered:", wallDocument);

        // Check if the wall is a door
        const doorType = wallDocument.door ?? wallDocument.data?.door;
        const doorState = change?.ds ?? wallDocument.ds;

        if (doorType > 0) { // Door type is 1 (normal) or 2 (secret)
            console.log("Door Detected!");
            console.log("Door Type:", doorType === 1 ? "Normal Door" : "Secret Door");
            console.log(
                "Door State:",
                doorState === 0 ? "Closed" : doorState === 1 ? "Open" : "Locked"
            );

            // Automatically close the door if it was opened
            if (doorState === 1) { // State 1 = Open
                console.log("Door opened. Scheduling automatic close...");
                setTimeout(async () => {
                    const currentWall = canvas.walls.get(wallDocument.id);
                    if (currentWall && currentWall.document.ds === 1) {
                        await currentWall.document.update({ ds: 0 }); // Close the door
                        console.log("Door automatically closed!");
                        // Foundry handles door sounds automatically
                    }
                }, 10000); // Wait 10 seconds (10000 ms)
            }
        } else {
            console.warn("Wall is not a door or lacks door-related properties.");
        }
    } catch (error) {
        console.error("Error in updateWall hook:", error);
    }
});