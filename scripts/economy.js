// Ekonomia i ulepszenia (zachowane w localStorage)
var ECON_KEY_BALANCE = 'idle_slot_balance_v1';
var ECON_KEY_UPGRADES = 'idle_slot_upgrades_v1';

var gameState = {
    balance: 0,
    upgrades: {
        payoutMultiplierLevel: 0,
        payoutMultiplier: 1
    }
};

function loadGame() {
    try {
        var rawBal = localStorage.getItem(ECON_KEY_BALANCE);
        if (rawBal !== null) gameState.balance = parseInt(rawBal, 10) || 0;
        var rawUp = localStorage.getItem(ECON_KEY_UPGRADES);
        if (rawUp) {
            var up = JSON.parse(rawUp);
            if (up && typeof up === 'object') {
                gameState.upgrades = Object.assign(gameState.upgrades, up);
            }
        }
    } catch (e) {
        console.warn('Failed to load game state', e);
    }
}

function saveGame() {
    try {
        localStorage.setItem(ECON_KEY_BALANCE, String(gameState.balance));
        localStorage.setItem(ECON_KEY_UPGRADES, JSON.stringify(gameState.upgrades));
    } catch (e) {
        console.warn('Failed to save game state', e);
    }
}

function getBalance() { return gameState.balance; }

function addBalance(amount) {
    if (!amount || amount <= 0) return 0;
    gameState.balance += Math.floor(amount);
    saveGame();
    renderBalance();
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
    renderBalance();
    return true;
}

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
    renderShop();
    renderBalance();
    return true;
}

function renderBalance() {
    var el = document.getElementById('balance');
    if (!el) return;
    el.textContent = 'Saldo: ' + gameState.balance;
}

function renderShop() {
    var el = document.getElementById('shop');
    if (!el) return;
    var lvl = gameState.upgrades.payoutMultiplierLevel || 0;
    var cost = payoutMultiplierCostForLevel(lvl);
    el.innerHTML = '';

    var title = document.createElement('div');
    title.textContent = 'Sklep ulepszeń';
    title.style.fontWeight = '600';
    el.appendChild(title);

    var item = document.createElement('div');
    item.style.marginTop = '8px';
    item.innerHTML = '<div>Mnożnik wypłat: x' + (gameState.upgrades.payoutMultiplier || 1) + ' (level ' + lvl + ')</div>';
    var btn = document.createElement('button');
    btn.textContent = 'Kup (+1) — Koszt: ' + cost;
    btn.onclick = function() { buyPayoutMultiplier(); };
    item.appendChild(btn);
    el.appendChild(item);
}
