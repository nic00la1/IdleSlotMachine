function losuj() {
    var btn = document.querySelector('.btn-container .roll');
    var cells = document.querySelectorAll('.container table td');

    if (!cells || cells.length === 0) return;

    if (btn) btn.disabled = true;


    var duration = 900; // ms
    var interval = 160;  // ms

    // Jeśli gracz ma ulepszenie fasterSpin
    var faster = gameState.upgrades.find(u => u.key === 'fasterSpin');
    if (faster && faster.level > 0) {
        // skracamy czas animacji proporcjonalnie do poziomu
        duration = Math.max(300, duration - faster.level * 100);
        interval = Math.max(80, interval - faster.level * 20);
    }

    var start = Date.now();

    var timer = setInterval(function() {
        cells.forEach(function(cell) {
            var sym = symbols[Math.floor(Math.random() * total)];
            cell.textContent = sym.icon;
            cell.dataset.symbol = sym.id;
        });

        if (Date.now() - start >= duration) {
            clearInterval(timer);
            // Końcowe losowanie
            cells.forEach(function(cell) {
                var sym = symbols[Math.floor(Math.random() * total)];
                cell.textContent = sym.icon;
                cell.dataset.symbol = sym.id;
            });
            if (btn) btn.disabled = false;

            // Obliczaj wygraną tylko dla środkowego rzędu
            var middleCells = document.querySelectorAll('.container table tr:nth-child(2) td');
            var middleIds = Array.from(middleCells).map(function(td) { return td.dataset.symbol; });
            var payout = calculateMiddleRowPayout(middleIds);
            // Zastosuj dowolny mnożnik wypłaty z ulepszeń
            var multiplier = (typeof getPayoutMultiplier === 'function') ? getPayoutMultiplier() : 1;
            var totalPayout = Math.floor(payout * multiplier);
            if (typeof showPayout === 'function') showPayout(totalPayout);
            // Dodaj do salda gracza (trwałe)
            if (typeof addBalance === 'function' && totalPayout > 0) addBalance(totalPayout);
        }
    }, interval);

    // --- Auto-Spin ---
    var autoSpin = false;
    var autoSpinTimer = null;

    function toggleAutoSpin() {
        autoSpin = !autoSpin;
        
        var btn = document.getElementById('auto-spin-toggle');
        btn.textContent = "Auto-spin: " + (autoSpin ? "ON" : "OFF");

        if(autoSpin) 
            autoSpinTimer = setInterval(losuj, 5000); // Spin co 5 sekund
        else 
            clearInterval(autoSpinTimer);
    }

    // Podpinamy przycisk po załadowaniu strony
    document.addEventListener('DOMContentLoaded', function() {
        var btn = document.getElementById('auto-spin-toggle');
        if (btn) btn.onclick = toggleAutoSpin;
    })
}
