import { symbols } from '../symbols.js';
import {  ECON_KEY_BALANCE, ECON_KEY_UPGRADES } from './constants.js';
import { gameState } from './state.js';

export function loadGame() {
    try {
        const rawBal = localStorage.getItem(ECON_KEY_BALANCE);
        if (rawBal !== null) {
            const parsed = parseInt(rawBal, 10);
            gameState.balance = isNaN(parsed) ? 0 : parsed;
        }

        const rawUp = localStorage.getItem(ECON_KEY_UPGRADES);
        if (rawUp) {
            const savedUpgrades = JSON.parse(rawUp);
            if (Array.isArray(savedUpgrades)) {
                savedUpgrades.forEach(saved => {
                    const current = gameState.upgrades.find(u => u.key === saved.key);
                    if (current) current.level = saved.level;
                });
            }
        }

        const rawSymbols = localStorage.getItem("symbols");
        if (rawSymbols) {
            const savedSymbols = JSON.parse(rawSymbols);

            // Czyszczenie oryginalnej tablicy i wstawienie zapisanych symboli
            symbols.length = 0;
            symbols.push(...savedSymbols);
        }

        const rawLionFury = localStorage.getItem("lionFury");
        if (rawLionFury) {
            try {
                gameState.lionFury = JSON.parse(rawLionFury);
            }
            catch {
                console.warn("Nie udało się odczytać lionFury");
            }
        }

        const rawShift = localStorage.getItem("symbolQualityShift");
        if (rawShift !== null) 
            gameState.symbolQualityShift = parseFloat(rawShift) || 0;

    } catch (e) {
        console.warn("Nie udało się odczytać stanu gry", e);
    }
}

export function saveGame() {
    try {
        localStorage.setItem(ECON_KEY_BALANCE, String(gameState.balance));
        localStorage.setItem(ECON_KEY_UPGRADES, JSON.stringify(gameState.upgrades));
        localStorage.setItem("symbols", JSON.stringify(symbols));
        localStorage.setItem("lionFury", JSON.stringify(gameState.lionFury));
        localStorage.setItem("symbolQualityShift", String(gameState.symbolQualityShift));
    }
    catch (e) {
        console.warn("Nie udało się zapisać stanu gry", e);
    }
}

window.saveGame = saveGame;