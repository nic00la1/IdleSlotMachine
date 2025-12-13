// Stan gry
export const gameState = {
    balance: 0, // aktualne saldo
    upgrades: [
        {
            key: 'payoutMultiplier',
            name: 'Mnożnik wypłat',
            description: 'Zwiększa wygrane poprzez mnożnik x2, x3 itd.',
            baseCost: 500,
            growth: 1.6, // szybciej rośnie wykładniczo
            level: 0
        },
        {
            key: 'fasterSpin',
            name: 'Szybsze losowanie',
            description: 'Zmniejsza czas trwania animacji spinu.',
            baseCost: 300,
            growth: 1.3, // wolniej rośnie wykładniczo
            level: 0
        },
        {
            key: 'bonusChance',
            name: 'Szansa na bonus',
            description: 'Dodaje dodatkową szansę na wygraną w środkowym rzędzie.',
            baseCost: 800,
            growth: 1.4,
            level: 0
        },
        {
            key: 'autoSpin',
            name: 'Auto-spin',
            description: "Automatyczne losowanie głównej maszyny co kilka sekund",
            baseCost: 1000,
            growth: 1.4,
            level: 0
        },
        {
            key: 'removeWorstSymbol',
            name: 'Usunięcie najgorszego symbolu',
            description: "Jednorazowo usuwa symbol o najniższej wartości z maszyny.",
            baseCost: 1500,
            growth: 1, // nie rośnie bo jest jednorazowe
            level: 0
        },
        {
            key: 'addLionSymbol',
            name: 'Lion Symbol',
            description: "Dodaje nowy najlepszy symbol 🦁 (wartość 300). Jednorazowe.",
            baseCost: 7777,
            growth: 1, // nie rośnie bo jest jednorazowe
            level: 0
        },
        {
            key: 'wildcardUpgrade',
            name: 'Wildcard Symbol',
            description: "Jednorazowo dodaje symbol 🃏, który zamienia się w najlepszy możliwy symbol.",
            baseCost: 5000,
            growth: 1, // jednorazowe
            level: 0
        }
    ]
};