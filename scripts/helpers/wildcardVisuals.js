import { symbols } from "../symbols.js";
import { triggerWildcardEffect } from "./wildcardLogic.js";
import { showEvent } from "./eventLog.js";

export function applyWildcardVisuals(before, after, middleCells) {
    const changedCells = [];

    for (let i = 0; i < before.length; i++) {
        if (before[i] !== after[i]) 
            changedCells.push(middleCells[i]);
    }

    if (changedCells.length === 0) return;

    // efekt błysku
    triggerWildcardEffect(changedCells);

    // po chwili zmiana ikony
    setTimeout(() => {
        changedCells.forEach(cell => {
            const index = [...middleCells].indexOf(cell);
            const newId = after[index];
            const sym = symbols.find(s => s.id === newId);

            cell.dataset.symbol = newId;
            cell.textContent = sym.icon;

            // efekt transformacji
            cell.classList.add("wildcard-transform");
            setTimeout(() => cell.classList.remove("wildcard-transform"), 500);
        });
    }, 200);

    showEvent("🃏 Wildcard aktywowany! Symbol zmienił się na najlepszy możliwy!");
}

