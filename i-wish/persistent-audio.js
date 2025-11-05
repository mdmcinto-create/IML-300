// Check if audio is already playing from another page
if (!window.audioPlayer) {
  window.audioPlayer = new Audio('assets/index-assets/in-the-waiting-line_mp3juice.mp3');
  window.audioPlayer.loop = true;
  
  // Store reference globally
  if (typeof(Storage) !== "undefined") {
    // Try to resume from stored time
    const savedTime = sessionStorage.getItem('audioTime');
    if (savedTime) {
      window.audioPlayer.currentTime = parseFloat(savedTime);
    }
    
    // Save current time periodically
    setInterval(() => {
      sessionStorage.setItem('audioTime', window.audioPlayer.currentTime);
    }, 100);
  }
}

// Auto-play (user must interact with page first due to browser restrictions)
document.addEventListener('click', function() {
  if (window.audioPlayer.paused) {
    window.audioPlayer.play().catch(e => console.log('Audio play failed:', e));
  }
}, { once: true });

// Try to play immediately
window.audioPlayer.play().catch(e => {
  console.log('Waiting for user interaction to play audio');
});