document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');

    // Load saved state
    chrome.storage.sync.get(['enabled'], (result) => {
        const isEnabled = result.enabled !== undefined ? result.enabled : true;
        toggleButton.checked = isEnabled;
        console.log('Popup loaded with state:', isEnabled);
    });

    // Save state when changed
    toggleButton.addEventListener('change', () => {
        const newState = toggleButton.checked;
        chrome.storage.sync.set({ enabled: newState }, () => {
            console.log('State saved:', newState);
        });
    });
});
