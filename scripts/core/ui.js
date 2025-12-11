import { gameState } from './state.js';
import { upgradeCost, canAfford, spend } from './economy.js';
import { saveGame } from './storage.js';
import { showEvent } from '../helpers/eventLog.js';
import { onFasterSpinUpgrade } from '../upgrades/fasterSpin.js';
import { onBonusChanceUpgrade } from '../upgrades/bonusChance.js';
import { onPayoutMultiplierUpgrade } from '../upgrades/payoutMultiplier.js';
import { initAutoSpinUI, onAutoSpinUpgrade } from '../upgrades/autoSpin.js';

export function showPayout(amount) {
    const el = document.getElementById('payout');
    if (!el) return;
    el.textContent = amount > 0 ? `Wygrana: ${amount}` : 'Brak wygranej';
}

export function renderBalance() {
    const el = document.getElementById('balance');
    if (!el) return;
    el.textContent = 'Saldo: ' + gameState.balance;
}

export function renderShop() {
    const el = document.getElementById('shop');
    if (!el) return;
    el.innerHTML = '';

    const title = document.createElement('div');
    title.textContent = 'Sklep ulepszeń';
    title.style.fontWeight = '600';
    el.appendChild(title);

    // mapa handlerów
    const upgradeHandlers = {
      fasterSpin: onFasterSpinUpgrade,
      bonusChance: onBonusChanceUpgrade,
      payoutMultiplier: onPayoutMultiplierUpgrade,
      autoSpin: onAutoSpinUpgrade  
    };

    gameState.upgrades.forEach(up => {
        const cost = upgradeCost(up);

        const item = document.createElement('div');
        item.className = 'upgrade-item';
        item.innerHTML = `
            <div><strong>${up.name}</strong> (poziom ${up.level})</div>
            <div>${up.description}</div>
            <div>Koszt: ${cost}</div>
        `;

        // --- Specjalna logika dla Auto-Spin ---
        if(up.key === "autoSpin" && up.level > 0) {
            const info = document.createElement("div");
            info.textContent = "✅ Auto-Spin został odblokowany";
            item.appendChild(info);
        } else 
        {
            const btn = document.createElement('button');
            btn.textContent = 'Kup'
            btn.disabled = !canAfford(cost);
            btn.onclick = () => {
                if (spend(cost)) {
                    up.level++;
                    saveGame();
                    renderShop();
                    renderBalance();
                    showEvent(`🛒 Kupiono upgrade: ${up.name} (poziom ${up.level})`);

                    // Wywołanie komunikatu aktywacji
                    if (upgradeHandlers[up.key]) {
                        upgradeHandlers[up.key](up.level);
                    }
                }
            };
            item.appendChild(btn);
        }
        el.appendChild(item);
    });

    initAutoSpinUI(gameState);
}