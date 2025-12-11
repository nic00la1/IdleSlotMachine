import { losuj } from "../spinner.js";
import { gameState } from "./state.js";

export let manualSpinLocked = false;
export let isSpinning = false;

export function setIsSpinning(value) {
    isSpinning = value;
}

export function initSpinButton() {
    const spinBtn = document.getElementById("spin");
    if (!spinBtn) return;

    // Czy upgrade jest kupiony?
    const autoSpinUpgrade = gameState.upgrades.find(u => u.key === "autoSpin");

    // Czy Auto-Spin jest aktywny?
    const autoSpinActive = localStorage.getItem("autoSpinActive") === "1"; 

    if (autoSpinUpgrade && autoSpinUpgrade.level > 0 && autoSpinActive) {
        spinBtn.disabled = true;
        manualSpinLocked = true;
    } else {
        spinBtn.disabled = false;
        manualSpinLocked = false;
    }

    spinBtn.addEventListener("click", () => {
        losuj();
    });
}

export function disableSpinButton() {
    manualSpinLocked = true;
    const spinBtn = document.getElementById("spin");
    if (spinBtn) {
        spinBtn.disabled = true;
        spinBtn.classList.add("spin-locked"); // animacja blokady
    } 
}

export function enableSpinButton() {
    manualSpinLocked = false;
    const spinBtn = document.getElementById("spin");
    if (spinBtn) {
        spinBtn.disabled = false;
        spinBtn.classList.remove("spin-locked"); // powrót do normalnego stanu
    } 
}