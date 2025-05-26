setInterval(() => {
  const video = document.querySelector('video');
  const isPlaying = !!(video && !video.paused && !video.ended && video.readyState > 2);

  if (isPlaying) {
    navigator.sendBeacon('http://localhost:5000/status', JSON.stringify({
      isPlaying: true,
      timestamp: new Date().toISOString()
    }));
  }
}, 10000); // every 10 seconds
