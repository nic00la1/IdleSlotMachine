export function showEvent(message) {
    const log = document.getElementById('event-log');
    if(!log) return;
    const entry = document.createElement('div');
    entry.textContent = message;
    log.appendChild(entry);

    // Automatyczne usuwanie po kilku sekundach
    setTimeout(() => {
        if (entry.parentNode) {
            entry.parentNode.removeChild(entry);
        }
    }, 4000);
}
