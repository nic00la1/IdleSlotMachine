import { showEvent } from "../helpers/eventLog.js";

export function getPayoutMultiplier(level) {
    const multiplier = 1 + level;
    showEvent(`💰 Mnożnik wypłat: x${multiplier}`)
    return multiplier;    
}