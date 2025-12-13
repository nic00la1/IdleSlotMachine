// 2 LWY - mocniejszy efekt
export function triggerLionDoubleEffect(cells) {
    cells.forEach(cell => {
        cell.classList.add("lion-double");
        setTimeout(() => {
            cell.classList.remove("lion-double", )
        }, 700);
    });
}

// 3 LWY - złoty deszcz + glow
export function triggerLionGoldRain() {
    document.body.classList.add("lion-gold-rain");
    setTimeout(() => document.body.classList.remove("lion-gold-rain"), 1500);
}

export function triggerLionJackpotGlow(cells) {
    cells.forEach(cell => {
        cell.classList.add("lion-jackpot");
        setTimeout(() => cell.classList.remove("lion-jackpot"), 1500);
    });
}
