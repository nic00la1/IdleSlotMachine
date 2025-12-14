import { gameState } from "../core/state.js";
import { symbols } from "../symbols.js";

function applySymbolQualityShift(baseSymbol) {
    const shift = gameState.symbolQualityShift || 0;
    if (shift <= 0) return baseSymbol;

    const adjusted = baseSymbol.map(s => ({ ...s }));
    const sorted = [...adjusted].sort((a, b) => a.value - b.value);

    sorted.forEach((symbol, index) => {
        const factor = 1 + shift * (index / (sorted.length - 1));
        symbol.weight = (symbol.weight || 1) * factor;
    });

    return sorted;
}

export function getRandomSymbol() {
    const adjusted = applySymbolQualityShift(symbols);

    const totalWeight = adjusted.reduce((sum, s) => sum + (s.weight || 1), 0);
    let r = Math.random() * totalWeight;

    for (const s of adjusted) {
        r -= (s.weight || 1);
        if (r <= 0) return s;
    }

    return adjusted[adjusted.length - 1];
}