import { gameState } from "./state.js";

export function renderLionFuryUI() {
    const panel = document.getElementById("lion-panel");
    const bar = document.getElementById("lion-fury-bar");
    if (!bar || !panel) return;

    const fury = gameState.lionFury;
    const percent = (fury.value / fury.max) * 100;

    if (fury.value > 0 || fury.active) 
        panel.style.display = "block";
    else 
        panel.style.display = "none";

    bar.style.width = percent + "%";

    if (fury.active) 
        bar.classList.add("active");
    else
        bar.classList.remove("active");
}