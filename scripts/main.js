// Importy bazowe
import './symbols.js';
import './utils.js';

// Importy core
import { loadGame } from "./core/storage.js";
import { renderBalance, renderShop, showPayout } from "./core/ui.js";

// Importy helperów
import { showEvent } from "./helpers/eventLog.js";

// Importy upgrades
import './upgrades/fasterSpin.js';
import './upgrades/bonusChance.js';
import './upgrades/payoutMultiplier.js';
import './upgrades/autoSpin.js';

import { losuj } from './spinner.js'


// Inicjalizacja gry po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    renderBalance();
    renderShop();
    showPayout(0);
    showEvent('🎰 Gra uruchomiona!');

    const btn = document.querySelector('.roll');
    if (btn) btn.addEventListener('click', losuj);
});