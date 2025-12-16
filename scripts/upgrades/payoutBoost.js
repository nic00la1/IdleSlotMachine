import { showEvent } from "../helpers/eventLog.js";

export function onPayoutBoost(level) {
    const newLevel = level + 1;
    showEvent(`🎯 Mnożnik wygranych zwiększony o +${newLevel * 10}%`)
}