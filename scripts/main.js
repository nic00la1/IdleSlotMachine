import { loadGame } from "./core/storage.js";
import { renderBalance } from "./core/ui.js";
import { renderShop } from "./core/shopUI.js";
import { initSpinButton } from "./core/spinButton.js";

function initGame() {
    loadGame();
    renderBalance();
    renderShop();
    initSpinButton();
}

window.addEventListener("DOMContentLoaded", () => {
    initGame();
});