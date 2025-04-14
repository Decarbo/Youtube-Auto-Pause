let wasPlaying = false;
let isEnabled = true;

// Get initial state from storage when content script loads
chrome.storage.sync.get(['enabled'], (result) => {
    isEnabled = result.enabled !== undefined ? result.enabled : true;
});

// Listen for state changes in storage
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        isEnabled = changes.enabled.newValue;
    }
});

// Function to find the video element 
const findYouTubeVideo = () => document.querySelector('video');

// Handle tab visibility changes
document.addEventListener('visibilitychange', () => {
    if (!isEnabled) return;

    const video = findYouTubeVideo();
    if (!video) return;

    if (document.hidden) {
        // Tab is hidden
        wasPlaying = !video.paused;
        if (wasPlaying) {
            video.pause();
        }
    } else {
        // Tab is visible again
        if (wasPlaying) {
            video.play();
        }
    }
});
