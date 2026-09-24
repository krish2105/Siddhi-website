/**
 * Sound Module (Completely disabled as per client request)
 * All audio operations are safe no-ops to ensure 100% silent, peaceful browsing.
 */

export function triggerHaptic(_duration: number | number[] = 14) {
  // Silent
}

export function playMechanicalClick() {
  // Silent
}

export function playSlideSound() {
  // Silent
}

export function playEjectSound() {
  // Silent
}

export function playBubblePop() {
  // Silent
}

export function playChime() {
  // Silent
}

export function toggleAmbientSoundscape(): boolean {
  return false;
}

export function isAmbientSoundscapeActive(): boolean {
  return false;
}

export function startAmbientSoundscape() {
  // Silent
}

export function stopAmbientSoundscape() {
  // Silent
}
