import Sound from 'react-native-sound';

Sound.setCategory('Playback', true);

export class AudioManager {
  private static instance: AudioManager;

  private sounds: Record<string, Sound> = {};
  private music?: Sound;
  private musicEnabled = true;
  private isMusicPlaying = false;

  private constructor() {}

  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  loadEffect(key: string, file: string) {
    if (this.sounds[key]) return;

    this.sounds[key] = new Sound(`${file}.mp3`, Sound.MAIN_BUNDLE, (err) => {
      if (err) console.log('FAILED TO LOAD SFX', err);
      else console.log('SFX LODED')
    });
  }

  playEffect(key: string) {
    const sfx = this.sounds[key];
    if (!sfx) return;
    sfx.stop(() => {
      sfx.play();
    });
  }

  loadMusic(file: string) {
    this.music = new Sound(`${file}.mp3`, Sound.MAIN_BUNDLE, (err) => {
      if (err) console.log('FAILED TO LOAD MUSIC', err);
      else console.log('MUSIC LODED')
    });
  }

  playMusic(loop = true) {
    if (!this.musicEnabled || !this.music) return;

    this.music.setNumberOfLoops(loop ? -1 : 0);
    this.music.play();
    this.isMusicPlaying = true;
  }

  pauseMusic() {
    if (!this.music) return;
    this.music.pause();
    this.isMusicPlaying = false;
  }

  stopMusic() {
    if (!this.music) return;
    this.music.stop();
    this.isMusicPlaying = false;
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled) this.pauseMusic();
    else this.playMusic();
  }

  getMusicState() {
    return this.isMusicPlaying;
  }
}
