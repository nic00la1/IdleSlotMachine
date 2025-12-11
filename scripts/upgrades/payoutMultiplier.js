import { showEvent } from "../helpers/eventLog.js";


// Efekt mnożnika - używane przy każdym spinie
export function getPayoutMultiplier(level) {
    return 1 + level;
}

// Komunikat aktywacji - wywołuje TYLKO przy zakupie
export function onPayoutMultiplierUpgrade(level) {
    const multiplier = 1 + level;
    showEvent(`💰 Mnożnik wypłat zwiększony! Teraz x${multiplier}`)
}