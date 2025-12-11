import { showEvent } from '../helpers/eventLog.js';

// Funkcja wywoływana przy zakupie upgrad'u
export function onFasterSpinUpgrade(level) {
    showEvent(`⚡ Faster Spin aktywowany! Spin przyspieszony (poziom ${level})`)
}

export function applyFasterSpin(level, duration, interval) {
    if (level > 0) {
        duration = Math.max(300, duration - level * 100);
        interval = Math.max(80, interval - level * 20);
    }
    return { duration, interval }; 
}