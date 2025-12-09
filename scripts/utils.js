import { symbols } from './symbols.js';

// Tworzymy mapę wartości symboli 
const symbolValues = (function(){
    var map = {};
    for (var i = 0; i < symbols.length; i++) {
        map[symbols[i].id] = symbols[i].value;
    }
    return map;
})();

export function calculateMiddleRowPayout(middleIds) {
    var counts = {};
    for (var i = 0; i < middleIds.length; i++) {
        var id = middleIds[i];
        counts[id] = (counts[id] || 0) + 1; 
    }

    var payout = 0;
    for (var id in counts) {
        if (!Object.prototype.hasOwnProperty.call(counts, id)) continue;
        var cnt = counts[id];
        var val = symbolValues[id] || 0;
        if (cnt === 2) payout += val * 2; // Dla wylosowania tego samego symbolu 2 razy (zysk = wartość symbolu * 2)
        if (cnt === 3) payout += val * 5; // Dla wylosowania tego samego symbolu 3 razy (zysk = wartość symbolu * 5)
    }
    return payout;
}

export function showPayout(amount) {
    var el = document.getElementById('payout');
    if (!el) return;
    el.textContent = amount > 0 ? `Wygrana: ${amount}` : 'Brak wygranej';
}
