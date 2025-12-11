import { symbols } from "../symbols.js";
import { showEvent } from "../helpers/eventLog.js";

export function onRemoveWorstSymbolUpgrade() {
    if (symbols.length <= 1)
    {
        showEvent("⚠️ Nie można usunąć symbolu - za mało symboli.");
        return;
    }

    // Sortowanie symboli po wartości (rosnąco)
    symbols.sort((a, b) => a.value - b.value);

    const removed = symbols.shift();

    showEvent(`❌ Usunięto najgorszy symbol: ${removed.icon} (wartość ${removed.value})`);
}