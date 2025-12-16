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

export function renderPayoutDetails(details, total) {
    const el = document.getElementById('payout-details');
    if (!el) return;

    if (total <= 0) {
        el.innerHTML = "";
        return;
    }

    if (!details || details.length === 0) {
        el.innerHTML = "";
        return;
    }

    let html = `
        <table class="payout-table">
            <tr>
                <th>Symbol</th>
                <th>Bazowa wartość</th>
                <th>Bonus</th>
                <th>Trafienia</th>
                <th>Wartość końcowa</th>
                <th>Zysk</th>
            </tr>
    `;

    for (const row of details) {
        html += `
            <tr>
                <td>${row.icon}</td>
                <td>${row.baseValue}</td>
                <td>+${row.boostLevel}</td>
                <td>${row.count}</td>
                <td>${row.boostedValue}</td>
                <td>${row.subtotal}</td>
            </tr>
        `;
    
    }

    html += `</table>`;
    el.innerHTML = html;
}