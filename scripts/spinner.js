function losuj() {
    var btn = document.querySelector('.btn-container .roll');
    var cells = document.querySelectorAll('.container table td');

    if (!cells || cells.length === 0) return;

    if (btn) btn.disabled = true;

    var duration = 900; // ms
    var interval = 160;  // ms
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
            showPayout(payout);
        }
    }, interval);
}
