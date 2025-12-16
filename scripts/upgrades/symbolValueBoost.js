import { showEvent } from "../helpers/eventLog.js";

export function onSymbolValueBoost(level) {
    const newLevel = level + 1;

    showEvent(`Wartość symboli wzrosła, o +${newLevel}`);
}


