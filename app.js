let moneyCount = 0; 

document.getElementById("mainTreeImage").addEventListener("click", moneyCountFunction);
document.getElementById("moneyTracker").textContent = moneyCount;

function moneyCountFunction () {
    moneyCount += 1;
    document.getElementById("moneyTracker").textContent = moneyCount;
}
