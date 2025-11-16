let moneyCount = 0;
let clickPower = 1;
let logsPerSecond = 0;

// Cache DOM elements
const tree = document.getElementById("mainTreeImage");
const moneyTracker = document.getElementById("moneyTracker");
const upgradeButtons = document.querySelectorAll(".upgrade");

// Track purchases for each upgrade
const upgradePurchases = Array(upgradeButtons.length).fill(0);

// Initialize UI
moneyTracker.textContent = moneyCount;

// --- Click the tree ---
tree.addEventListener("click", (e) => {
    moneyCount += clickPower;
    moneyTracker.textContent = moneyCount;

    // Optional shake animation if you have it
    tree.classList.add("treeShake");
    setTimeout(() => tree.classList.remove("treeShake"), 150);

    spawnParticles(e);
});

// --- Passive income ---
setInterval(() => {
    moneyCount += logsPerSecond;
    moneyTracker.textContent = moneyCount;
}, 1000);

// --- Upgrade buttons logic ---
upgradeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        let cost = parseInt(button.getAttribute("data-cost"));
        let value = parseInt(button.getAttribute("data-value"));
        let type = button.getAttribute("data-type");

        if (moneyCount >= cost) {
            moneyCount -= cost;

            // Apply upgrade
            if (type === "click") {
                clickPower += value;
            } else if (type === "lps") {
                logsPerSecond += value;
            }

            // Increment purchase count
            upgradePurchases[index]++;
            button.textContent = `${button.textContent.split(' — ')[0]} — Level: ${upgradePurchases[index]} — Cost: ${cost} logs`;

            // Optionally scale cost for next purchase (e.g., 15% increase)
            const newCost = Math.floor(cost * 1.15);
            button.setAttribute("data-cost", newCost);

            // Update tracker
            moneyTracker.textContent = moneyCount;
        } else {
            // Optional feedback if not enough logs
            button.style.backgroundColor = "#b33a3a";
            setTimeout(() => button.style.backgroundColor = "", 200);
        }
    });
});


function spawnParticles(e) {
    const numberOfParticles = 8;

    const rect = tree.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Position at click point
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Random movement direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 20;

        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        particle.style.setProperty("--dx", `${dx}px`);
        particle.style.setProperty("--dy", `${dy}px`);

        tree.parentElement.appendChild(particle);

        // Remove after animation
        setTimeout(() => particle.remove(), 400);
    }
}
