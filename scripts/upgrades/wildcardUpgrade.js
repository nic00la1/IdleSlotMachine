import { gameState } from "../core/state.js";
import {symbols } from "../symbols.js"

export function onWildcardUpgrade(level) {
if (level > 1) return;

    const upgrade = gameState.upgrades.find(u => u.key === "wildcardUpgrade");
    if (!upgrade) return;

    if (upgrade.level > 0) {
        if (!symbols.some(s => s.id === "wildcard")) {
            symbols.push({
                id: "wildcard",
                icon: "🃏",
                value: 0
            });
        }
        return;
    }

    symbols.push({
        id: "wildcard",
        icon: "🃏",
        value: 0
    });

    upgrade.level = 1;
}
