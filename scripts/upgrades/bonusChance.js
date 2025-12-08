export function applyBonusChance(level, payout) {
    if (level > 0 && Math.random() < 0.1 * level) {
        payout += 50; // Dodatkowy bonus
    }
    return payout;
}