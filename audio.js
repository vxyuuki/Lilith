// audio.js - Web Audio API Synthesizer for Cyberpunk SFX

let audioCtx = null;
let soundEnabled = false;
let glitchAudioObj = null;

// Initialize Audio Context
export function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function setSoundEnabled(state) {
    soundEnabled = state;
    if (state) {
        initAudio();
        if (!glitchAudioObj) {
            glitchAudioObj = new Audio('/glitch2.mp3');
            glitchAudioObj.preload = 'auto';
            glitchAudioObj.volume = 0.8;
        }
    }
}

export function playHoverClick() {
  if (!soundEnabled) return;
  if (!audioCtx) initAudio();

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  const now = audioCtx.currentTime + 0.01; // Add 10ms padding to prevent InvalidAccessError on some browsers

  // Sharp, digital 'tick'
  osc.type = 'square';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);

  gainNode.gain.setValueAtTime(0.15, now); // 15% volume
  gainNode.gain.linearRampToValueAtTime(0, now + 0.05);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

export function playGlitchNoise() {
  if (!soundEnabled) return;
  
  if (!glitchAudioObj) {
    glitchAudioObj = new Audio('/glitch2.mp3');
    glitchAudioObj.volume = 0.8;
  }
  
  glitchAudioObj.currentTime = 0;
  glitchAudioObj.play().catch(e => console.error("Glitch audio playback prevented:", e));
}
