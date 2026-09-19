/**
 * Romantic Music Box Synthesizer using Web Audio API
 * Zero external assets needed, high quality ambient tone.
 */

class RomanticMusicSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private feedbackNode: GainNode | null = null;
  private timerId: number | null = null;
  private noteIndex = 0;

  // Gentle, romantic arpeggio notes in D major / B minor pentatonic
  // Frequency in Hz for musical notes (D4, F#4, A4, B4, C#5, D5, E5, F#5, A5)
  private melodyNotes = [
    // Phrase 1
    293.66, 369.99, 440.0, 587.33,
    440.0, 369.99, 587.33, 739.99,
    // Phrase 2
    246.94, 369.99, 440.0, 554.37,
    440.0, 369.99, 440.0, 587.33,
    // Phrase 3
    220.0, 329.63, 440.0, 659.25,
    587.33, 440.0, 329.63, 440.0,
    // Phrase 4
    196.0, 293.66, 369.99, 587.33,
    440.0, 369.99, 293.66, 369.99,
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Master gain for smooth volume transitions
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      // Stereo ambient delay for dreamy music box space
      this.delayNode = this.ctx.createDelay();
      this.delayNode.delayTime.value = 0.38;

      this.feedbackNode = this.ctx.createGain();
      this.feedbackNode.gain.value = 0.35;

      // Connect delay feedback loop
      this.delayNode.connect(this.feedbackNode);
      this.feedbackNode.connect(this.delayNode);
      this.delayNode.connect(this.masterGain);

      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single bell / chime note
  private playChime(freq: number) {
    if (!this.ctx || !this.masterGain || !this.delayNode) return;

    const now = this.ctx.currentTime;

    // Fundamental oscillator (bell tone)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Harmonics oscillator for shimmer
    const oscHarmonic = this.ctx.createOscillator();
    const gainHarmonic = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2.01, now); // Slightly detuned octave

    // Soft chime envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    gainHarmonic.gain.setValueAtTime(0, now);
    gainHarmonic.gain.linearRampToValueAtTime(0.08, now + 0.01);
    gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    // Route audio
    osc.connect(gain);
    oscHarmonic.connect(gainHarmonic);

    gain.connect(this.masterGain);
    gain.connect(this.delayNode);
    gainHarmonic.connect(this.masterGain);

    osc.start(now);
    oscHarmonic.start(now);

    osc.stop(now + 2.0);
    oscHarmonic.stop(now + 1.5);
  }

  public playSoftTapChime() {
    this.initContext();
    const chimePitches = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66];
    const freq = chimePitches[Math.floor(Math.random() * chimePitches.length)];
    this.playChime(freq);
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const step = () => {
      if (!this.isPlaying) return;

      const freq = this.melodyNotes[this.noteIndex];
      this.playChime(freq);

      // Play an occasional bass counterpoint every 4 notes
      if (this.noteIndex % 4 === 0) {
        this.playChime(freq / 2);
      }

      this.noteIndex = (this.noteIndex + 1) % this.melodyNotes.length;

      // Note duration (approx 420ms for gentle calm tempo)
      this.timerId = window.setTimeout(step, 420);
    };

    step();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticMusicSynth();
