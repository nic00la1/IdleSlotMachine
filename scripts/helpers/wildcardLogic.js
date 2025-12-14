import { symbols } from "../symbols.js";

export function resolveWildcard(middleIds) {
    if (!middleIds.includes("wildcard")) return middleIds;

    const withoutWild = middleIds.filter(id => id !== "wildcard");

    if (withoutWild.length === 0) {
        const best = symbols.reduce((a, b) => a.value > b.value ? a : b);
        return ["wildcard", "wildcard", "wildcard"].map(() => best.id)
    }

    const bestSymbol = withoutWild
        .map(id => symbols.find(s => s.id === id))
        .sort((a, b) => b.value - a.value)[0];

    return middleIds.map(id => id === "wildcard" ? bestSymbol.id : id);
}

export function triggerWildcardEffect(cells) {
    cells.forEach(cell => {
        cell.classList.add("wildcard-transform");
        setTimeout(() => cell.classList.remove("wildcard-transform"), 500);
    });
}