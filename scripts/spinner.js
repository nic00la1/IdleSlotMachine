import { getPayoutMultiplier } from './upgrades/payoutMultiplier.js';
import { applyFasterSpin } from './upgrades/fasterSpin.js';
import { applyBonusChance } from './upgrades/bonusChance.js';
import { gameState } from './core/state.js';
import { addBalance } from './core/economy.js';
import { renderBalance, showPayout } from './core/ui.js';
import { symbols } from './symbols.js';
import { calculateMiddleRowPayout } from './utils.js';
import { renderShop } from './core/shopUI.js';
import { manualSpinLocked, setIsSpinning } from './core/spinButton.js';
import { showEvent } from './helpers/eventLog.js';
import { playRoar, playGold} from "./helpers/sounds.js"
import { triggerLionGoldRain, triggerLionJackpotGlow, triggerLionRoarEffect } from './helpers/lionEffects.js';

// --- Funkcja losuj --- 
export function losuj() {
    setIsSpinning(true); // start animacji

    const btn = document.querySelector('.btn-container .roll');
    const cells = document.querySelectorAll('.container table td');

    if (!cells || cells.length === 0) return;
    if (btn) btn.disabled = true;

    // --- Domyślne wartości --- 
    let duration = 900; // ms
    let interval = 160;  // ms

    // Jeśli gracz ma ulepszenie fasterSpin
    const faster = gameState.upgrades.find(u => u.key === 'fasterSpin');
    if (faster) {
        // skracamy czas animacji proporcjonalnie do poziomu
        ({ duration, interval } = applyFasterSpin(faster.level, duration, interval));
    }

    const start = Date.now();

    const timer = setInterval(() => {
        cells.forEach(cell => {
            const sym = symbols[Math.floor(Math.random() * symbols.length)];
            cell.textContent = sym.icon;
            cell.dataset.symbol = sym.id;
        });

        if (Date.now() - start >= duration) {
            clearInterval(timer);

            // Końcowe losowanie
            cells.forEach(cell => {
                const sym = symbols[Math.floor(Math.random() * symbols.length)];
                cell.textContent = sym.icon;
                cell.dataset.symbol = sym.id;
            });

            setIsSpinning(false);

            if (btn && !manualSpinLocked) {
              btn.disabled = false;  
            } 

            // --- Obliczanie wygraną tylko dla środkowego rzędu --- 
            const middleCells = document.querySelectorAll('.container table tr:nth-child(2) td');
            const middleIds = Array.from(middleCells).map(td => td.dataset.symbol);
            let payout = calculateMiddleRowPayout(middleIds);

            // 🔥 SPECJALNY EFEKT DLA LWA
            const hasLion = middleIds.includes("lion");
            const isTripleLion = middleIds.every(id => id === "lion");

            if (isTripleLion) {
                showEvent("🦁🦁🦁 JACKPOT LWA! OGROMNA WYGRANA!");
                payout *= 3;

                triggerLionGoldRain();
                triggerLionJackpotGlow(middleCells);
            } else if (hasLion) {
                showEvent("🦁 LEW! Trafiłeś najrzadszy symbol!");
                payout += 50;

                triggerLionRoarEffect(middleCells);
                playRoar();
            }

            // --- BonusChance Upgrade ---
            const bonus = gameState.upgrades.find(u => u.key === 'bonusChance');
            if (bonus) {
                payout = applyBonusChance(bonus.level, payout);
            }

            // --- PayoutMultiplier Upgrade ---
            const multiplierUpgrade = gameState.upgrades.find(u => u.key === 'payoutMultiplier');
            const multiplier = multiplierUpgrade ? getPayoutMultiplier(multiplierUpgrade.level) : 1;

            const totalPayout = Math.floor(payout * multiplier);
            
           showPayout(totalPayout);
           if (totalPayout > 0) {
            addBalance(totalPayout);
           }

           // Zawsze odśwież UI po spinie
           renderBalance();
           renderShop();
        }
    }, interval);
}