import { upgradeCost, canAfford, spend } from './economy.js';
import { saveGame } from './storage.js';
import { showEvent } from '../helpers/eventLog.js';
import { onFasterSpinUpgrade } from '../upgrades/fasterSpin.js';
import { onBonusChanceUpgrade } from '../upgrades/bonusChance.js';
import { onPayoutMultiplierUpgrade } from '../upgrades/payoutMultiplier.js';
import { initAutoSpinUI, onAutoSpinUpgrade } from '../upgrades/autoSpin.js';
import { gameState } from './state.js';

// Mapowanie kluczy na funkcje aktywujące ulepszenia
const upgradeHandlers = {
      fasterSpin: onFasterSpinUpgrade,
      bonusChance: onBonusChanceUpgrade,
      payoutMultiplier: onPayoutMultiplierUpgrade,
      autoSpin: onAutoSpinUpgrade  
};

// Podział ulepszeń na kategorie
const MAIN_UPGRADES = ["payoutMultiplier", "fasterSpin", "bonusChance"];
const SIDE_UPGRADES = ["autoSpin"];

let openSections = new Set();

export function renderShop() {
    const el = document.getElementById('shop');
    if (!el) return;
    el.innerHTML = '';

    const sections = [
        { name: "Główne ulepszenia", keys: MAIN_UPGRADES },
        { name: "Poboczne ulepszenia", keys: SIDE_UPGRADES }
    ];

    sections.forEach(section => {
        // Nagłówek sekcji (rozwijany)
        const header = document.createElement("div");
        header.className = "shop-section-header";
        header.textContent = section.name;

        // Kontener na ulepszenia
        const list = document.createElement("div");
        list.className = "shop-section-content";
        list.style.display = "none";

         // Przywracanie stanu sekcji po odświeżeniu
        if (openSections.has(section.name)) {
            list.style.display = "block";
            header.classList.add("open");
        }

        header.onclick = () => {
            const isOpen = list.style.display === "none";
            list.style.display = isOpen ? "block" : "none";
            header.classList.toggle("open", isOpen);

            if (isOpen) 
                openSections.add(section.name);
            else 
                openSections.delete(section.name);
        };  

        // Wstawienie nagłówka i listy do DOM
        el.appendChild(header);
        el.appendChild(list);

         // Ulepszenia w sekcji
    gameState.upgrades
        .filter(up => section.keys.includes(up.key))
        .forEach(up => {
            const item = document.createElement('div');
            item.className = 'upgrade-item';

            item.innerHTML = `
                <div><strong>${up.name}</strong> (poziom ${up.level})</div>
                <div>${up.description}</div>
            `;

            // --- Auto-Spin ---
            if(up.key === "autoSpin" && up.level > 0) {
                const info = document.createElement("div");
                info.textContent = "✅ Auto-Spin został odblokowany";
                item.appendChild(info);
            } else 
            {
                const cost = upgradeCost(up);

                const costDiv = document.createElement("div");
                costDiv.textContent = `Koszt: ${cost}`;
                item.appendChild(costDiv);

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
            list.appendChild(item);
        });
    });

    // Aktualizacja UI Auto-Spin
    initAutoSpinUI(gameState);
}