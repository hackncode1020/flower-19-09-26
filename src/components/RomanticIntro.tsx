import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas';

interface RomanticIntroProps {
  isVisible: boolean;
  recipientName?: string;
  onComplete: () => void;
  onAdvance?: () => void;
}

export const RomanticIntro: React.FC<RomanticIntroProps> = ({
  isVisible,
  recipientName,
  onComplete,
  onAdvance,
}) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          id="romantic-intro-container"
          onClick={() => {
            if (onAdvance) onAdvance();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: 'blur(10px)',
            scale: 1.04,
            transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
          }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black select-none cursor-pointer"
        >
          {/* Ambient Romantic Backdrop Lighting */}
          <div
            id="ambient-romantic-glow"
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.85, 1.15, 0.95],
                opacity: [0.25, 0.45, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="h-[320px] w-[320px] rounded-full sm:h-[520px] sm:w-[520px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(244, 63, 94, 0.32) 0%, rgba(190, 18, 60, 0.15) 45%, rgba(0, 0, 0, 0) 70%)',
                filter: 'blur(45px)',
              }}
            />
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="h-[200px] w-[200px] rounded-full sm:h-[350px] sm:w-[350px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(251, 113, 133, 0.35) 0%, rgba(225, 29, 72, 0.1) 50%, rgba(0, 0, 0, 0) 75%)',
                filter: 'blur(30px)',
              }}
            />
          </div>

          {/* Interactive particles & floating hearts */}
          <ParticleCanvas opacity={1} interactive={true} />

          {/* Central Romantic Typography */}
          <div
            id="romantic-message-wrapper"
            className="relative z-20 flex flex-col items-center justify-center px-6 text-center"
          >
            {/* Dedicated recipient name if provided */}
            {recipientName && (
              <motion.div
                id="recipient-name-tag"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-950/30 px-4 py-1 text-xs sm:text-sm font-['Playfair_Display',serif] italic tracking-widest text-rose-200/90 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              >
                <span>For {recipientName}</span>
              </motion.div>
            )}

            {/* Soft pulsing heart icon above */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 flex items-center justify-center sm:mb-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.16, 1, 1.1, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative flex items-center justify-center"
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(244, 63, 94, 0.6) 0%, rgba(0, 0, 0, 0) 70%)',
                    filter: 'blur(12px)',
                  }}
                />
                <Heart
                  className="h-8 w-8 text-rose-400 fill-rose-500/80 drop-shadow-[0_0_15px_rgba(244,63,94,0.9)] sm:h-11 sm:w-11"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>

            {/* "I LOVE YOU" Main Text */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7">
              {['I', 'LOVE', 'YOU'].map((word, wordIndex) => (
                <motion.span
                  key={word}
                  id={`text-word-${word.toLowerCase()}`}
                  initial={{ opacity: 0, y: 24, filter: 'blur(12px)', scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  transition={{
                    duration: 1.4,
                    delay: 0.6 + wordIndex * 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block font-['Cinzel',serif] text-4xl font-bold uppercase tracking-[0.2em] sm:text-6xl md:text-7xl lg:text-8xl"
                  style={{
                    color: '#fff5f7',
                    textShadow:
                      '0 0 10px rgba(255, 180, 200, 0.8), 0 0 25px rgba(244, 63, 94, 0.7), 0 0 50px rgba(225, 29, 72, 0.5), 0 0 80px rgba(190, 18, 60, 0.3)',
                    letterSpacing: '0.22em',
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Elegant Whisper Subtitle */}
            <motion.p
              id="romantic-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: [0, 0.85, 0.75], y: 0 }}
              transition={{ duration: 1.6, delay: 2.1, ease: 'easeOut' }}
              className="mt-6 font-['Playfair_Display',serif] text-base italic text-rose-200/80 sm:mt-8 sm:text-xl md:text-2xl"
              style={{
                textShadow: '0 0 12px rgba(244, 63, 94, 0.5)',
              }}
            >
              every petal blooms for you
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
