import { loadGame } from "./core/storage.js";
import { renderBalance } from "./core/ui.js";
import { renderShop } from "./core/shopUI.js";
import { initSpinButton } from "./core/spinButton.js";
import { initLionFury } from "./core/lionFury.js";

function initGame() {
    loadGame();
    initLionFury();
    renderBalance();
    renderShop();
    initSpinButton();
}

window.addEventListener("DOMContentLoaded", () => {
    initGame();
});