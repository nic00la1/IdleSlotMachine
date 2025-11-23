const symbols = [
    {id: '7', icon : '7', value: 100},
    {id: 'star', icon : '⭐', value: 90},
    {id: 'coin', icon : '🪙', value: 80},
    {id: 'cherry', icon : '🍒', value: 70},
    {id: 'clown', icon : '🤡', value: 60},
    {id: 'dolphin', icon : '🐬', value: 50},
    {id: 'butterfly', icon : '🦋', value: 40},
    {id: 'heart', icon : '💘', value: 30},
    {id: 'ice', icon : '🧊', value: 20},
    {id: 'rose', icon : '🌹', value: 10}
];

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