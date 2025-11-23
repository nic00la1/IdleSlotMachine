const symbols = ['7', '⭐', '🪙', '🍒', '🤡', '🐬', '🦋', '💘', '🧊', '🌹'];

const total = symbols.length;

function losuj() {
    const btn = document.querySelector('.btn-container .roll');
    const cells = document.querySelectorAll('.container table td');

    if (!cells || cells.length === 0) return;

    if (btn) btn.disabled = true;

    const duration = 900; // jak długo trwa animacja kręcenia (ms)
    const interval = 160;  // odświeżanie (ms)
    const start = Date.now();

    const timer = setInterval(() => {
        cells.forEach(cell => {
            cell.textContent = symbols[Math.floor(Math.random() * total)];
        });

        if (Date.now() - start >= duration) {
            clearInterval(timer);
            // ostateczne rozstrzygnięcie
            cells.forEach(cell => {
                cell.textContent = symbols[Math.floor(Math.random() * total)];
            });
            if (btn) btn.disabled = false;
        }
    }, interval);
}