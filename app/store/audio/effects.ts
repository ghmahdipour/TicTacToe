import { AudioManager } from './AudioManager';

const audio = AudioManager.getInstance();

export const EFFECTS = {
  movex: 'movex', 
  moveo: 'moveo', 
  winner: 'winner',
  draw: 'draw', 
  button: 'click', 
  back: 'back'
};

export function loadEffects() {
  Object.entries(EFFECTS).forEach(([key, file]) => {
    audio.loadEffect(key, file);
  });
}

export function playEffect(key: keyof typeof EFFECTS) {
  audio.playEffect(key);
}
