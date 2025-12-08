import { getPayoutMultiplier } from './upgrades/payoutMultiplier.js';
import { applyFasterSpin } from './upgrades/fasterSpin.js';
import { applyBonusChance } from './upgrades/bonusChance.js';

// --- Funkcja losuj --- 
function losuj() {
    var btn = document.querySelector('.btn-container .roll');
    var cells = document.querySelectorAll('.container table td');

    if (!cells || cells.length === 0) return;
    if (btn) btn.disabled = true;

// --- Domyślne wartości --- 
    var duration = 900; // ms
    var interval = 160;  // ms

    // Jeśli gracz ma ulepszenie fasterSpin
    var faster = gameState.upgrades.find(u => u.key === 'fasterSpin');
    if (faster) {
        // skracamy czas animacji proporcjonalnie do poziomu
        ({ duration, interval } = applyFasterSpin(faster.level, duration, interval));
    }

    var start = Date.now();

    var timer = setInterval(function() {
        cells.forEach(function(cell) {
            var sym = symbols[Math.floor(Math.random() * total)];
            cell.textContent = sym.icon;
            cell.dataset.symbol = sym.id;
        });

        if (Date.now() - start >= duration) {
            clearInterval(timer);

            // Końcowe losowanie
            cells.forEach(function(cell) {
                var sym = symbols[Math.floor(Math.random() * total)];
                cell.textContent = sym.icon;
                cell.dataset.symbol = sym.id;
            });
            if (btn) btn.disabled = false;

            // --- Obliczanie wygraną tylko dla środkowego rzędu --- 
            var middleCells = document.querySelectorAll('.container table tr:nth-child(2) td');
            var middleIds = Array.from(middleCells).map(function(td) { return td.dataset.symbol; });
            var payout = calculateMiddleRowPayout(middleIds);

            // --- BonusChance Upgrade ---
            const bonus = gameState.upgrades.find(u => u.key === 'bonusChance');
            if (bonus) {
                payout = applyBonusChance(bonus.level, payout);
            }

            // --- PayoutMultiplier Upgrade ---
            const multiplierUpgrade = gameState.upgrades.find(u => u.key === 'payoutMultiplier');
            const multiplier = multiplierUpgrade ? getPayoutMultiplier(multiplierUpgrade.level) : 1;

            var totalPayout = Math.floor(payout * multiplier);
            
            if (typeof showPayout === 'function') showPayout(totalPayout);
            // Dodaj do salda gracza (trwałe)
            if (typeof addBalance === 'function' && totalPayout > 0) addBalance(totalPayout);
        }
    }, interval);
}

window.losuj = losuj;