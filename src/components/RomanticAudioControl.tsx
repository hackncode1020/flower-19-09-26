import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const RomanticAudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const active = romanticAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <div
      id="romantic-audio-wrapper"
      className="fixed top-4 left-4 z-50 flex items-center"
    >
      <button
        id="sound-toggle-btn"
        onClick={handleToggle}
        className="group relative flex items-center gap-2 rounded-full border border-rose-500/20 bg-black/60 px-3 py-1.5 text-xs text-rose-200/80 backdrop-blur-md transition-all duration-300 hover:border-rose-400/50 hover:bg-black/80 hover:text-white"
        title={isPlaying ? 'Mute romantic melody' : 'Play romantic music box'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
            <span className="font-['Plus_Jakarta_Sans',sans-serif] tracking-wider text-[11px]">
              Melody on
            </span>
          </>
        ) : (
          <>
            <VolumeX className="h-3.5 w-3.5 text-rose-400/60 transition-colors group-hover:text-rose-300" />
            <span className="font-['Plus_Jakarta_Sans',sans-serif] tracking-wider text-[11px] text-rose-200/60 group-hover:text-rose-200">
              Sound
            </span>
          </>
        )}
      </button>
    </div>
  );
};
