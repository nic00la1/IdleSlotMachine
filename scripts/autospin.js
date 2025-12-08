// --- Auto-Spin - stan ---
    var autoSpin = false;
    var autoSpinTimer = null;

 function toggleAutoSpin() {
        autoSpin = !autoSpin;
        
        var btn = document.getElementById('auto-spin-toggle');
        btn.textContent = "Auto-spin: " + (autoSpin ? "ON" : "OFF");

        if(autoSpin) {
            autoSpinTimer = setInterval(() => {
                if (typeof window.losuj === 'function') {
                    window.losuj();
                }
            }, 5000); 
        }
        else {
            clearInterval(autoSpinTimer);
            autoSpinTimer = null;
        } 
    }

    // uruchom przy starcie
    document.addEventListener('DOMContentLoaded', initAutoSpinUI);

    // wywołaj też po każdym odświeżeniu sklepu - automatycznie
    if (typeof renderShop === 'function') {
        const originalRenderShop = renderShop;
        renderShop = function(...args) {
            const result = originalRenderShop.apply(this, args);
            initAutoSpinUI();
            return result;
        }
    }

    function initAutoSpinUI() {
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


