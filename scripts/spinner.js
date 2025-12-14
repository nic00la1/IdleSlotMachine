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
import { triggerLionDoubleEffect, triggerLionGoldRain, triggerLionJackpotGlow } from './helpers/lionEffects.js';
import { resolveWildcard } from './helpers/wildcardLogic.js';
import { applyWildcardVisuals } from './helpers/wildcardVisuals.js';
import { addLionFury } from './core/lionFury.js';
import { onSpinDuringLionFury } from './core/lionFury.js';

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

            onSpinDuringLionFury();

            // --- Obliczanie wygraną tylko dla środkowego rzędu --- 
            const middleCells = document.querySelectorAll('.container table tr:nth-child(2) td');
            let middleIds = Array.from(middleCells).map(td => td.dataset.symbol);
            
            // --- Wildcard ---
            const wildcardUpgrade = gameState.upgrades.find(u => u.key === "wildcardUpgrade");
            let before = [...middleIds];

            if (wildcardUpgrade?.level > 0) {
                middleIds = resolveWildcard(middleIds);

                for (let i = 0; i < middleCells.length; i++) {
                    const newId = middleIds[i];
                    const sym = symbols.find(s => s.id === newId);
                    middleCells[i].dataset.symbol = newId;
                    middleCells[i].textContent = sym.icon;
                }

                applyWildcardVisuals(before, middleIds, middleCells);
            }
                
            let payout = calculateMiddleRowPayout(middleIds);

            // 🔥 SPECJALNY EFEKT DLA LWA
            const lionCells = [];
            for (let i = 0; i < middleIds.length; i++) {
                if (middleIds[i] === "lion") 
                    lionCells.push(middleCells[i]);
            }

            lionCells.forEach(cell => {
                cell.classList.add("lion-hit");
                setTimeout(() => cell.classList.remove("lion-hit"), 350);
            });

            const lionCount = middleIds.filter(id => id === "lion").length;

            const furyGain = {
                1: 2,
                2: 6,
                3: 15
            };

            if (lionCount > 0)
                addLionFury(furyGain[lionCount]);

            const bar = document.getElementById("lion-fury-bar");
            bar.classList.add("gain");
            setTimeout(() => bar.classList.remove("gain"), 400);


            if (lionCount === 3) {
                showEvent("🦁🦁🦁 JACKPOT LWA! OGROMNA WYGRANA!");
                payout *= 3;

                triggerLionGoldRain();
                triggerLionJackpotGlow(lionCells);
                playGold();
            } 
            else if (lionCount === 2) {
                showEvent("🦁🦁 PODWÓJNY LEW! Świetne trafienie!");
                payout += 100;

                triggerLionDoubleEffect(lionCells);
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