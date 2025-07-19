class AudioManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.sounds = new Map();
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.setValueAtTime(0.5, this.audioContext.currentTime);

      this.createSounds();
      this.isInitialized = true;
    } catch (error) {
      console.warn("Web Audio API not supported:", error);
    }
  }

  createSounds() {
    this.sounds.set("water", () => this.createWaterDropSound());
    this.sounds.set("stream", () => this.createStreamSound());
    this.sounds.set("droplet", () => this.createDropletSound());
    this.sounds.set("waterfall", () => this.createWaterfallSound());
    this.sounds.set("ripple", () => this.createRippleSound());

    this.sounds.set("wind", () => this.createWindSound());
    this.sounds.set("birds", () => this.createBirdSound());
    this.sounds.set("rustle", () => this.createRustleSound());
    this.sounds.set("forest", () => this.createForestSound());
  }

  createWaterDropSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      200,
      this.audioContext.currentTime + 0.1,
    );

    filterNode.type = "lowpass";
    filterNode.frequency.setValueAtTime(1200, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 0.3,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  createStreamSound() {
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(
      1,
      bufferSize,
      this.audioContext.sampleRate,
    );
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    source.buffer = buffer;
    source.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    filterNode.type = "highpass";
    filterNode.frequency.setValueAtTime(300, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 1.5,
    );

    source.start(this.audioContext.currentTime);
  }

  createDropletSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      100,
      this.audioContext.currentTime + 0.05,
    );

    gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 0.2,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  createWaterfallSound() {
    const bufferSize = this.audioContext.sampleRate * 3;
    const buffer = this.audioContext.createBuffer(
      1,
      bufferSize,
      this.audioContext.sampleRate,
    );
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] =
        (Math.random() * 2 - 1) * 0.3 * Math.exp(-i / (bufferSize * 0.2));
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    source.buffer = buffer;
    source.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    filterNode.type = "bandpass";
    filterNode.frequency.setValueAtTime(500, this.audioContext.currentTime);
    filterNode.Q.setValueAtTime(2, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 2,
    );

    source.start(this.audioContext.currentTime);
  }

  createRippleSound() {
    const oscillator1 = this.audioContext.createOscillator();
    const oscillator2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator1.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(
      200,
      this.audioContext.currentTime + 0.4,
    );

    oscillator2.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(
      300,
      this.audioContext.currentTime + 0.4,
    );

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 0.6,
    );

    oscillator1.start(this.audioContext.currentTime);
    oscillator1.stop(this.audioContext.currentTime + 0.6);
    oscillator2.start(this.audioContext.currentTime);
    oscillator2.stop(this.audioContext.currentTime + 0.6);
  }

  createWindSound() {
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(
      1,
      bufferSize,
      this.audioContext.sampleRate,
    );
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] =
        (Math.random() * 2 - 1) *
        0.1 *
        Math.sin(i * 0.001) *
        Math.exp(-i / (bufferSize * 0.3));
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    source.buffer = buffer;
    source.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    filterNode.type = "lowpass";
    filterNode.frequency.setValueAtTime(800, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 1.8,
    );

    source.start(this.audioContext.currentTime);
  }

  createBirdSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    const frequencies = [800, 1200, 1000, 1400, 900];
    const duration = 0.8;
    const noteLength = duration / frequencies.length;

    oscillator.frequency.setValueAtTime(
      frequencies[0],
      this.audioContext.currentTime,
    );

    for (let i = 1; i < frequencies.length; i++) {
      oscillator.frequency.setValueAtTime(
        frequencies[i],
        this.audioContext.currentTime + i * noteLength,
      );
    }

    filterNode.type = "bandpass";
    filterNode.frequency.setValueAtTime(1000, this.audioContext.currentTime);
    filterNode.Q.setValueAtTime(5, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + duration,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  createRustleSound() {
    const bufferSize = this.audioContext.sampleRate * 1;
    const buffer = this.audioContext.createBuffer(
      1,
      bufferSize,
      this.audioContext.sampleRate,
    );
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] =
        (Math.random() * 2 - 1) * 0.2 * Math.exp(-i / (bufferSize * 0.4));
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    source.buffer = buffer;
    source.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    filterNode.type = "highpass";
    filterNode.frequency.setValueAtTime(2000, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 0.8,
    );

    source.start(this.audioContext.currentTime);
  }

  createForestSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      100,
      this.audioContext.currentTime + 1.5,
    );

    filterNode.type = "lowpass";
    filterNode.frequency.setValueAtTime(400, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 2,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 2);
  }

  playSound(soundName) {
    if (!this.isInitialized || !this.sounds.has(soundName)) return;

    try {
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }

      const soundFunction = this.sounds.get(soundName);
      soundFunction();
    } catch (error) {
      console.warn("Error playing sound:", error);
    }
  }

  setVolume(volume) {
    if (!this.isInitialized) return;

    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.masterGain.gain.setValueAtTime(
      clampedVolume,
      this.audioContext.currentTime,
    );
  }
}

export const audioManager = new AudioManager();
