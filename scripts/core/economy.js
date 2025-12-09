import { gameState } from './state.js';
import { saveGame } from './storage.js';

export function getBalance() { return gameState.balance; }

export function addBalance(amount) {
    if (!amount || amount <= 0) return 0;
    gameState.balance += Math.floor(amount);
    saveGame();
    return gameState.balance;
}

export function canAfford(cost) {
    return gameState.balance >= cost;
}

export function spend(amount) {
    if (amount <= 0) return true;
    if (!canAfford(amount)) return false;
    gameState.balance -= amount;
    saveGame();
    return true;
}

export function upgradeCost(upgrade) {
    const growth = upgrade.growth || 1.5;
    return Math.floor(upgrade.baseCost * Math.pow(growth, upgrade.level));
}