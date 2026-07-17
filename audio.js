// audio.js - Web Audio API Synthesizer for Cyberpunk SFX

let audioCtx = null;
let soundEnabled = false;

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
    }
}

export function playHoverClick() {
  if (!soundEnabled) return;
  if (!audioCtx) initAudio();

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  const now = audioCtx.currentTime;

  // Sharp, digital 'tick' using square wave and immediate attack
  osc.type = 'square';
  osc.frequency.setValueAtTime(1000, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);

  gainNode.gain.setValueAtTime(0.05, now); // Start directly at 5% volume (creates a tiny pop, perfect for a click)
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

export function playGlitchNoise() {
  if (!soundEnabled) return;
  if (!audioCtx) initAudio();

  const duration = 0.5; // 0.5 seconds of noise
  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate harsh white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 1.5;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  // Filter to make it sound like digital static/TV glitch (bandpass)
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 800; // Center frequency
  filter.Q.value = 0.8;

  const gainNode = audioCtx.createGain();
  
  const now = audioCtx.currentTime + 0.01;

  // Chaotic volume envelope
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.4, now + 0.05);
  gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
  gainNode.gain.linearRampToValueAtTime(0.6, now + 0.2);
  gainNode.gain.linearRampToValueAtTime(0, now + duration);

  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  noise.start(now);
}
