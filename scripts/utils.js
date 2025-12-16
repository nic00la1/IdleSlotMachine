import { symbols } from './symbols.js';
import { gameState } from './core/state.js';

export function calculateMiddleRowPayout(middleIds) {
    const counts = {};
    for (const id of middleIds) {
        counts[id] = (counts[id] || 0) + 1;
    }

    const details = [];
    let payout = 0;

    for (const id in counts) {
        if (!Object.prototype.hasOwnProperty.call(counts, id)) continue;

        const count = counts[id];
        const symbol = symbols.find(s => s.id === id);
        if (!symbol) continue;
        
        const baseValue = symbol.value;

        // Bonus do wartości symboli
        const boostLevel = gameState.upgrades.find(u => u.key === "symbolValueBoost")?.level || 0;
        const boostedValue = baseValue + boostLevel;

        // Oblicz subtotal
        let subtotal = 0;
        if (count === 2) subtotal = boostedValue * 2;
        if (count === 3) subtotal = boostedValue * 5;
        
        payout += subtotal;

        // Zapisz szczegóły
        details.push({
            id,
            icon: symbol.icon,
            baseValue,
            boostLevel,
            boostedValue,
            count,
            subtotal
        });
    }

    // Bonus do mnożnika wypłat
    const payoutBoostLevel = gameState.upgrades.find(u => u.key === "payoutBoost")?.level || 0;
    payout = Math.floor(payout * (1 + payoutBoostLevel * 0.10));

    return {
        total: payout,
        details
    }
}

export function showPayout(amount) {
    var el = document.getElementById('payout');
    if (!el) return;
    el.textContent = amount > 0 ? `Wygrana: ${amount}` : 'Brak wygranej';
}
