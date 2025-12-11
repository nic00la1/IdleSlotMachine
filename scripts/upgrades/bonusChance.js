import { showEvent } from "../helpers/eventLog.js";
import { screenShake } from "../helpers/screenShake.js"

export function applyBonusChance(level, payout) {
    // bonus działa tylko jeśli coś się wygra
    if (payout > 0 && level > 0 && Math.random() < 0.2 * level) {
        screenShake();
        return payout * 2;
    }
    return payout;
}

// komunikat aktywacji – wywołuj TYLKO przy zakupie
export function onBonusChanceUpgrade(level) {
    showEvent(`🎁 Bonus Chance zwiększony! Poziom ${level}`);
}