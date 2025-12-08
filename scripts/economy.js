// --- Klucze do localStorage ---
var ECON_KEY_BALANCE = 'idle_slot_balance_v1';
var ECON_KEY_UPGRADES = 'idle_slot_upgrades_v1';

// --- Stan gry ---
var gameState = {
    balance: 0, // aktualne saldo
    upgrades: [
        {
            key: 'payoutMultiplier',
            name: 'Mnożnik wypłat',
            description: 'Zwiększa wygrane poprzez mnożnik x2, x3 itd.',
            baseCost: 500,
            growth: 1.6, // szybciej rośnie wykładniczo
            level: 0
        },
        {
            key: 'fasterSpin',
            name: 'Szybsze losowanie',
            description: 'Zmniejsza czas trwania animacji spinu.',
            baseCost: 300,
            growth: 1.3, // wolniej rośnie wykładniczo
            level: 0
        },
        {
            key: 'bonusChance',
            name: 'Szansa na bonus',
            description: 'Dodaje dodatkową szansę na wygraną w środkowym rzędzie.',
            baseCost: 800,
            level: 0
        },
        {
            key: 'autoSpin',
            name: 'Auto-spin',
            description: "Automatyczne losowanie głównej maszyny co kilka sekund",
            baseCost: 1000,
            growth: 1.4,
            level: 0
        }
    ]
};

function updateUI() {
    renderBalance();
    renderShop();
}

// --- Funkcje ekonomii i zapisu ---
function loadGame() {
    try {
        // saldo
        var rawBal = localStorage.getItem(ECON_KEY_BALANCE);
        if (rawBal !== null) {
            var parsed = parseInt(rawBal, 10);
            gameState.balance = isNaN(parsed) ? 0 : parsed;
        } 

        // ulepszenia
        var rawUp = localStorage.getItem(ECON_KEY_UPGRADES);
        if (rawUp) {
            var savedUpgrades = JSON.parse(rawUp);

            if (Array.isArray(savedUpgrades)) {
                // scal po kluczu 'key'
                savedUpgrades.forEach(function(saved) {
                    var current = gameState.upgrades.find(function(u) {
                        return u.key === saved.key;
                    });
                    if (current) {
                        current.level = saved.level; // zachowaj poziom
                    }
                })
            }
        }
    } catch (e) {
        console.warn('Nie udało się zapisać stanu gry', e);
    }
}

function saveGame() {
    try {
        localStorage.setItem(ECON_KEY_BALANCE, String(gameState.balance));
        localStorage.setItem(ECON_KEY_UPGRADES, JSON.stringify(gameState.upgrades));
    } catch (e) {
        console.warn('Nie udało się zapisać stanu gry', e);
    }
}

function getBalance() { return gameState.balance; }

function addBalance(amount) {
    if (!amount || amount <= 0) return 0;
    gameState.balance += Math.floor(amount);
    saveGame();
    updateUI();
    return gameState.balance;
}

function canAfford(cost) {
    return gameState.balance >= cost;
}

function spend(amount) {
    if (amount <= 0) return true;
    if (!canAfford(amount)) return false;
    gameState.balance -= amount;
    saveGame();
    updateUI();
    return true;
}

function upgradeCost(upgrade) {
    var growth = upgrade.growth || 1.5 // współczynnik wzrostu (domyślnie 1.5)
    return Math.floor(upgrade.baseCost * Math.pow(growth, upgrade.level));
}


// --- Ulepszenia ---
function getPayoutMultiplier() { return gameState.upgrades.payoutMultiplier || 1; }

function payoutMultiplierCostForLevel(level) {
    var base = 500;
    return base * (level + 1);
}

function buyPayoutMultiplier() {
    var lvl = gameState.upgrades.payoutMultiplierLevel || 0;
    var cost = payoutMultiplierCostForLevel(lvl);
    if (!spend(cost)) {
        alert('Brak środków. Potrzebujesz: ' + cost);
        return false;
    }
    // Zwiększ mnożnik o +1 za każdy zakup
    gameState.upgrades.payoutMultiplierLevel = lvl + 1;
    gameState.upgrades.payoutMultiplier = 1 + gameState.upgrades.payoutMultiplierLevel; // level 1 => multiplier 2
    saveGame();
    updateUI();
    return true;
}

// --- Renderowanie UI ---
function renderBalance() {
    var el = document.getElementById('balance');
    if (!el) return;
    el.textContent = 'Saldo: ' + gameState.balance;
}

function renderShop() {
    var el = document.getElementById('shop');
    if (!el) return;
    el.innerHTML = '';

    var title = document.createElement('div');
    title.textContent = 'Sklep ulepszeń';
    title.style.fontWeight = '600';
    el.appendChild(title);

    gameState.upgrades.forEach(function(up) {
        var cost = upgradeCost(up);

        var item = document.createElement('div');
        item.className = 'upgrade-item';
        item.style.marginTop = '12px';
        item.innerHTML = `
            <div>
                <strong>${up.name}</strong> (poziom ${up.level})
            </div>
            <div>
                ${up.description}
            </div>
            <div>
                Koszt: ${cost}
            </div>
        `;
    

    var btn = document.createElement('button');
    btn.textContent = 'Kup';
    btn.disabled = !canAfford(cost);
    btn.onclick = function() {
        if (spend(cost)) {
            up.level++;
            saveGame();
            renderShop();
            renderBalance();
        }
    };

    item.appendChild(btn);
    el.appendChild(item);
    });

    if (typeof window.initAutoSpinUI === 'function') {
    window.initAutoSpinUI(window.gameState);
    }
}

window.gameState = gameState;
window.addBalance = addBalance;
window.renderShop = renderShop;
window.renderBalance = renderBalance;

document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    updateUI();
    if (typeof window.initAutoSpinUI === 'function') {
        window.initAutoSpinUI(window.gameState);
    }
});