import { symbols } from "../symbols.js";

export function resolveWildcard(middleIds) {
    if (!middleIds.includes("wildcard")) return middleIds;

    const withoutWild = middleIds.filter(id => id !== "wildcard");

    const allSame = withoutWild.length > 0 && withoutWild.every(id => id === withoutWild[0]);

    if (allSame) {
        const best = symbols.reduce((a, b) => a.value > b.value ? a : b);
        return middleIds.map(id => id === "wildcard" ? best.id : id);
    }

    const candidates = withoutWild
        .map(id => symbols.find(s => s.id === id))
        .filter(Boolean);

        const bestSymbol = candidates.sort((a, b) => b.value - a.value)[0];
        return middleIds.map(id => id === "wildcard" ? bestSymbol.id : id);
}

export function triggerWildcardEffect(cells) {
    cells.forEach(cell => {
        cell.classList.add("wildcard-transform");
        setTimeout(() => cell.classList.remove("wildcard-transform"), 500);
    });
}