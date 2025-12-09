import { showEvent } from '../helpers/eventLog.js';
import { losuj } from '../spinner.js';

// --- Auto-Spin - stan ---
    var autoSpin = false;
    var autoSpinTimer = null;

 export function toggleAutoSpin() {
        autoSpin = !autoSpin;
        
        var btn = document.getElementById('auto-spin-toggle');
        btn.textContent = "Auto-spin: " + (autoSpin ? "ON" : "OFF");

        if(autoSpin) {
            autoSpinTimer = setInterval(() => {
                losuj();
                showEvent('🔄 Auto-spin wykonał losowanie')
            }, 5000); 
        }
        else {
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
        } else {
            btn.style.display = "none";
            autoSpin = false
            clearInterval(autoSpinTimer);
        }
    }
