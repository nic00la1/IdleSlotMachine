import { symbols } from "../symbols.js";
import { showEvent } from "../helpers/eventLog.js";
import { saveGame } from "../core/storage.js";

export function onRemoveWorstSymbolUpgrade() {
    if (symbols.length <= 1)
    {
        showEvent("⚠️ Nie można usunąć symbolu - za mało symboli.");
        return;
    }

    const nonWild = symbols.filter(s => s.id !== "wildcard");

    if (nonWild.length === 0) {
        showEvent("⚠️ Nie można usunąć symbolu - wildcard nie może być usunięty.");
        return;
    }

    // Sortowanie symboli po wartości (rosnąco)
    nonWild.sort((a, b) => a.value - b.value);

    const worst = nonWild[0];
    const index = symbols.findIndex(s => s.id === worst.id);

    if (index !== -1) symbols.splice(index, 1);

    saveGame();

    showEvent(`❌ Usunięto najgorszy symbol: ${worst.icon} (wartość ${worst.value})`);
}