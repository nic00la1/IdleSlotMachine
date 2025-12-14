import { gameState } from "../core/state.js";
import { addBalance } from "../core/economy.js";
import { renderBalance } from "../core/ui.js";
import { showEvent } from "../helpers/eventLog.js";

let interval = null;

export function startPassiveIncome() {
    if (interval) return;

    const lvl = gameState.upgrades.find(u => u.key === "passiveIncome")?.level || 0;

    interval = setInterval(() => {
        const lvl = gameState.upgrades.find(u => u.key === "passiveIncome")?.level || 0;
        if (lvl > 0) {
            const income = lvl * 1;
            addBalance(income);
            renderBalance();
        }
    }, 1000);

    if (lvl > 0) 
    showEvent(`💰 Pasywny przyrost: +${lvl}$/s`);
}

export function onPassiveIncomeUpgrade(level) {
    const newLevel = level + 1;
    showEvent(`💰 Pasywny przyrost zwiększony do +${newLevel}$/s`);
}