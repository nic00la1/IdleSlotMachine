// ustawia początkowy tekst „Brak wygranej”.
document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizuje ekonomię i UI
    if (typeof loadGame === 'function') loadGame();
    if (typeof renderBalance === 'function') renderBalance();
    if (typeof renderShop === 'function') renderShop();
    if (typeof showPayout === 'function') showPayout(0);
});
