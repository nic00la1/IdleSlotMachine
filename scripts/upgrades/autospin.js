import { showEvent } from '../helpers/eventLog.js';
import { losuj } from '../spinner.js';
import { disableSpinButton, enableSpinButton } from '../core/spinButton.js';

// --- Auto-Spin - stan ---
    var autoSpin = false;
    var autoSpinTimer = null;

 export function toggleAutoSpin() {
        autoSpin = !autoSpin;
        
        localStorage.setItem("autoSpinActive", autoSpin ? "1" : "0");

        var btn = document.getElementById('auto-spin-toggle');
        btn.textContent = "Auto-spin: " + (autoSpin ? "ON" : "OFF");

        if(autoSpin) {
            disableSpinButton(); // Blokada ręcznego spina

            autoSpinTimer = setInterval(() => {
                losuj();
                showEvent('🔄 Auto-spin wykonał losowanie')
            }, 5000); 
        }
        else {
            enableSpinButton(); // Odblokowanie gdy user wyłącza Auto-Spin

            clearInterval(autoSpinTimer);
            autoSpinTimer = null;
            showEvent("⏹️ Auto-spin zatrzymany")
        } 
    }

 export function initAutoSpinUI(gameState) {
        const btn = document.getElementById('auto-spin-toggle');
        if (!btn) return;

        // sprawdzamy, czy gracz ma upgrade autoSpin
        const up = gameState.upgrades.find(u => u.key === 'autoSpin');

        if (up && up.level > 0) {
            btn.style.display = "inline-block";
            btn.onclick = toggleAutoSpin;

            const saved = localStorage.getItem("autoSpinActive") === "1";
            autoSpin = saved;

            if (autoSpin) {
                disableSpinButton();
                btn.textContent = "Auto-spin: ON";
            } else {
                enableSpinButton();
                btn.textContent = "Auto-spin: OFF";
            }

        } else {
            btn.style.display = "none";
            autoSpin = false
            clearInterval(autoSpinTimer);
            enableSpinButton();
        }
    }

export function onAutoSpinUpgrade(level) {
    showEvent(`▶️ Auto-spin odblokowany! Poziom ${level}`);
} 