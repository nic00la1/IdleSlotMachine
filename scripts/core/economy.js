import { showEvent } from '../helpers/eventLog.js';
import { onFasterSpinUpgrade } from '../upgrades/fasterSpin.js';
import { onPayoutMultiplierUpgrade } from '../upgrades/payoutMultiplier.js';
import { onAutoSpinUpgrade } from '../upgrades/autoSpin.js';
import { gameState } from './state.js';
import { saveGame } from './storage.js';
import { renderBalance } from './ui.js';
import { renderShop } from './shopUI.js';

export function getBalance() { return gameState.balance; }

export function addBalance(amount) {
    if (!amount || amount <= 0) return 0;
    gameState.balance += Math.floor(amount);
    saveGame();
    renderBalance();
    return gameState.balance;
}

export function canAfford(cost) {
    return Number(gameState.balance) >= Number(cost);
}

export function spend(amount) {
    if (amount <= 0) return true;
    if (!canAfford(amount)) return false;
    gameState.balance -= amount;
    saveGame();
    renderBalance();
    return true;
}

export function upgradeCost(upgrade) {
    const growth = Number(upgrade.growth) || 1.5;
    const base = Number(upgrade.baseCost);
    const level = Number(upgrade.level);
    return Math.floor(base * Math.pow(growth, level));
}

export function buyUpgrade(upgradeKey) {
    const up = gameState.upgrades.find(u => u.key === upgradeKey);
    if (!up) return false;

    const cost = upgradeCost(up);
    if (!canAfford(cost)) {
        showEvent("❌ Nie stać Cię na ten upgrade!");
        return false;
    } 

    spend(cost);
    up.level++;
    saveGame();
    renderBalance();
    renderShop();


    const upgradeHandlers = {
        fasterSpin: onFasterSpinUpgrade,
        bonusChance: onBonusUpgradeUpgrade,
        payoutMultiplier: onPayoutMultiplierUpgrade,
        autoSpin: onAutoSpinUpgrade
    };

    if (upgradeHandlers[upgradeKey]) {
        upgradeHandlers[upgradeKey](up.level);
    }

    return true;
}