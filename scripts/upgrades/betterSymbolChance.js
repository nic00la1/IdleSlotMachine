import { gameState } from "../core/state.js";
import { showEvent } from "../helpers/eventLog.js";

export function onBetterSymbolChanceUpgrade(level) {
    const shift = 0.03;

    if (!gameState.symbolQualityShift) {
        gameState.symbolQualityShift = 0;
    }

    gameState.symbolQualityShift += shift
    const percent = Math.round(gameState.symbolQualityShift * 100);

    showEvent(`🏃‍♀️ Lepsza jakość symboli:  + ${percent}%)`)
}