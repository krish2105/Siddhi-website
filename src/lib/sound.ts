/**
 * Procedural Luxury Audio Feedback & Spatial Soundscape using the Web Audio API
 * Generates crisp, zero-latency mechanical tactile clicks, latch snaps, and ambient acoustics.
 */

let audioCtx: AudioContext | null = null;
let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let ambientLfo: OscillatorNode | null = null;
let isAmbientActive = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Trigger subtle device haptic feedback if supported (mobile/Android/Safari iOS)
 */
export function triggerHaptic(duration: number | number[] = 14) {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch {
      // Haptics not allowed without prior interaction
    }
  }
}

/**
 * High-end metallic mechanical click (Leica / B&O style switch)
 */
export function playMechanicalClick() {
  triggerHaptic(12);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Audio context prevented by browser autoplay policy
  }
}

/**
 * Slide-latch movement sound
 */
export function playSlideSound() {
  triggerHaptic(18);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(850, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch {
    // Ignored
  }
}

/**
 * Positive mechanical snap / latch release sound
 */
export function playEjectSound() {
  triggerHaptic([18, 40, 25]);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(800, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.05);

    gain1.gain.setValueAtTime(0.15, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start();
    osc1.stop(ctx.currentTime + 0.06);
  } catch {
    // Ignored
  }
}

/**
 * Fizzy enzymatic effervescent micro-bubble sound
 */
export function playBubblePop() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startFreq = 1800 + Math.random() * 800;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 1.5, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // Ignored
  }
}

/**
 * Elegant architectural harmonic chime (View transition / Checkout success)
 */
export function playChime() {
  triggerHaptic([20, 50, 30]);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const frequencies = [528, 660, 792, 1056]; // Golden harmonic ratio
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = idx * 0.04;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.08, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.5);
    });
  } catch {
    // Ignored
  }
}

/**
 * Continuous luxury ambient soundscape (432Hz warmth + spatial binaural respiration)
 */
export function toggleAmbientSoundscape(): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isAmbientActive) {
    stopAmbientSoundscape();
    return false;
  } else {
    startAmbientSoundscape();
    return true;
  }
}

export function isAmbientSoundscapeActive(): boolean {
  return isAmbientActive;
}

export function startAmbientSoundscape() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (isAmbientActive) return;

    // Filter to keep frequencies silky and warm
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, ctx.currentTime);

    // Master ambient gain
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 1.8);

    // Warm 432Hz harmonic tone
    ambientOsc1 = ctx.createOscillator();
    ambientOsc1.type = 'sine';
    ambientOsc1.frequency.setValueAtTime(216, ctx.currentTime); // Sub-harmonic

    ambientOsc2 = ctx.createOscillator();
    ambientOsc2.type = 'sine';
    ambientOsc2.frequency.setValueAtTime(432, ctx.currentTime); // Primary harmonic

    // Gentle slow breathing LFO modulation
    ambientLfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    ambientLfo.type = 'sine';
    ambientLfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 8-second slow breath cycle
    lfoGain.gain.setValueAtTime(12, ctx.currentTime);

    ambientLfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    ambientOsc1.connect(filter);
    ambientOsc2.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
    ambientLfo.start();

    isAmbientActive = true;
  } catch {
    isAmbientActive = false;
  }
}

export function stopAmbientSoundscape() {
  try {
    if (ambientGain && audioCtx) {
      ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        try {
          ambientOsc1?.stop();
          ambientOsc2?.stop();
          ambientLfo?.stop();
          ambientOsc1?.disconnect();
          ambientOsc2?.disconnect();
          ambientLfo?.disconnect();
          ambientGain?.disconnect();
        } catch {
          // Ignored
        }
        isAmbientActive = false;
      }, 850);
    } else {
      isAmbientActive = false;
    }
  } catch {
    isAmbientActive = false;
  }
}
