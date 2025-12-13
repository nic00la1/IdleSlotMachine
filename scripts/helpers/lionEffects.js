// 1 LEW - delikatny efekt
export function triggerLionRoarEffect(cells) {
    cells.forEach(cell => {
        cell.classList.add("lion-roar");
        setTimeout(() => {
            cell.classList.remove("lion-roar", )
        }, 2000);
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
