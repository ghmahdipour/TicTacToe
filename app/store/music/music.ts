import { AudioManager } from '../audio/AudioManager';

const audio = AudioManager.getInstance();

export function initMusic() {
  audio.loadMusic('play');
}

export function playBackgroundMusic() {
  audio.playMusic(true);
}

export function pauseBackgroundMusic() {
  audio.pauseMusic();
}

export function stopBackgroundMusic() {
  audio.stopMusic();
}

export function setMusicEnabled(enabled: boolean) {
  audio.setMusicEnabled(enabled);
}
