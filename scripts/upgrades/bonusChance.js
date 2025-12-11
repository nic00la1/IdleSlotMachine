import { showEvent } from "../helpers/eventLog.js";

// efekt bonusu – używane przy każdym spinie
export function applyBonusChance(level, payout) {
    if (level > 0 && Math.random() < 0.2 * level) {
        return payout * 2; // faktyczny efekt
    }
    return payout;
}

// komunikat aktywacji – wywołuj TYLKO przy zakupie
export function onBonusChanceUpgrade(level) {
    showEvent(`🎁 Bonus Chance zwiększony! Poziom ${level}`);
}