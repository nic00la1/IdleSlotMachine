import { loadGame } from "./core/storage.js";
import { renderBalance } from "./core/ui.js";
import { losuj } from "./spinner.js";
import { renderShop } from "./core/shopUI.js";

function initGame() {
    loadGame();
    renderBalance();
    renderShop();
    
}

// Obsługa przycisku "Losuj"
const spinBtn = document.getElementById("spin");

if (spinBtn) {
    spinBtn.addEventListener("click", () => {
        losuj();
    });
};

// uruchomienie gry po załadowaniu strony
window.addEventListener("DOMContentLoaded", () => {
    initGame();
});