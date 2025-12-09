import { showEvent } from "../helpers/eventLog.js";

export function applyBonusChance(level, payout) {
    if (level > 0 ) {
        const bonus = Math.random() < 0.2 * level;
        if (bonus) {
            showEvent(`🎁 Bonus! Wygrana zwiększona na poziomie ${level}`);
            return payout * 2;
        }
    }
    return payout;
}