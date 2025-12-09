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
            level: 0
        },
        {
            key: 'autoSpin',
            name: 'Auto-spin',
            description: "Automatyczne losowanie głównej maszyny co kilka sekund",
            baseCost: 1000,
            growth: 1.4,
            level: 0
        }
    ]
};