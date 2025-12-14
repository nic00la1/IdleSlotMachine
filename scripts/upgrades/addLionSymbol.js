import { symbols, lionSymbol } from "../symbols.js";
import { showEvent } from "../helpers/eventLog.js";

export function onAddLionSymbolUpgrade(level) {
    if (level === 1) { 
        // dodajemy 🦁 do symboli
        symbols.unshift(lionSymbol, lionSymbol, lionSymbol);

        showEvent("🦁 Odblokowano nowy symbol: LION! Najwyższa wartość w grze.");
    }
}