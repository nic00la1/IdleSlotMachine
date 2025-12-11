import { gameState } from "./state.js";

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
