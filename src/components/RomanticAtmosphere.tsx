import React from 'react';
import { motion } from 'motion/react';

interface RomanticAtmosphereProps {
  recipientName?: string;
  isVisible: boolean;
}

interface FloatingHeartItem {
  id: string;
  left: string;
  top: string;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  color?: string;
}

interface FairyRingItem {
  id: string;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  hasHeart?: boolean;
}

export const RomanticAtmosphere: React.FC<RomanticAtmosphereProps> = ({
  recipientName,
  isVisible,
}) => {
  // Floating hearts positioned exactly matching the video layout
  const hearts: FloatingHeartItem[] = [
    { id: 'h-tl', left: '14%', top: '16%', size: 26, rotation: -12, delay: 0.2, duration: 4.2 },
    { id: 'h-tr', left: '88%', top: '15%', size: 28, rotation: 16, delay: 0.8, duration: 4.6 },
    { id: 'h-ml', left: '16%', top: '25%', size: 30, rotation: -18, delay: 0.5, duration: 5.0 },
    { id: 'h-mr', left: '86%', top: '26%', size: 26, rotation: 14, delay: 1.1, duration: 4.4 },
    { id: 'h-cm', left: '48%', top: '26%', size: 16, rotation: -8, delay: 0.3, duration: 4.8 },
    { id: 'h-c2', left: '52%', top: '38%', size: 15, rotation: 10, delay: 1.4, duration: 5.2 },
    { id: 'h-c3', left: '38%', top: '50%', size: 16, rotation: -14, delay: 0.7, duration: 4.5 },
    { id: 'h-flower', left: '52%', top: '63%', size: 20, rotation: 8, delay: 1.2, duration: 3.8 },
    { id: 'h-bl', left: '13%', top: '78%', size: 24, rotation: -10, delay: 0.4, duration: 4.6 },
    { id: 'h-br', left: '89%', top: '78%', size: 16, rotation: 15, delay: 1.6, duration: 5.4 },
  ];

  // Glowing fairy rings (emerald/green-cyan circles circled in video)
  const rings: FairyRingItem[] = [
    { id: 'r-tr', left: '91%', top: '18%', size: 32, delay: 0.3, duration: 4.0, hasHeart: true },
    { id: 'r-ml', left: '17%', top: '28%', size: 26, delay: 0.9, duration: 4.5, hasHeart: true },
    { id: 'r-c', left: '68%', top: '40%', size: 26, delay: 0.6, duration: 5.0, hasHeart: false },
    { id: 'r-c2', left: '53%', top: '53%', size: 24, delay: 1.2, duration: 4.2, hasHeart: false },
    { id: 'r-flower', left: '54%', top: '63%', size: 30, delay: 0.4, duration: 3.6, hasHeart: true },
    { id: 'r-bl', left: '14%', top: '78%', size: 36, delay: 1.0, duration: 4.8, hasHeart: true },
  ];

  // Warm firefly sparks hovering over the blooming flowers
  const fireflies = Array.from({ length: 18 }, (_, i) => ({
    id: `ff-${i}`,
    left: `${35 + (i * 17) % 32}%`,
    bottom: `${30 + (i * 9) % 25}%`,
    size: 2.5 + (i % 3),
    dx: `${((i % 5) - 2) * 15}px`,
    delay: (i * 0.45) % 3.5,
    duration: 3 + (i % 3) * 0.8,
  }));

  if (!isVisible) return null;

  return (
    <motion.div
      id="romantic-atmosphere-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: 'easeOut' }}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none"
    >
      {/* Top Header & Script Message matching user video */}
      <div className="absolute top-0 left-0 right-0 pt-7 sm:pt-9 px-4 flex flex-col items-center justify-center text-center">
        {/* "F O R   Y O U" */}
        <motion.p
          id="header-for-you"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-['Cinzel',serif] text-[11px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] text-rose-200/85 uppercase"
          style={{
            textShadow: '0 0 10px rgba(244, 63, 94, 0.7), 0 0 20px rgba(225, 29, 72, 0.4)',
          }}
        >
          {recipientName ? `F O R   ${recipientName.toUpperCase()}` : 'F O R   Y O U'}
        </motion.p>

        {/* "Every flower here is a moment with you" */}
        <motion.div
          id="romantic-headline-script"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-1 flex flex-col items-center leading-[1.15] text-white"
        >
          <span
            className="font-['Great_Vibes',cursive] text-3xl sm:text-4xl md:text-5xl tracking-wide text-rose-50"
            style={{
              textShadow:
                '0 0 12px rgba(255, 192, 203, 0.9), 0 0 24px rgba(244, 63, 94, 0.8), 0 0 40px rgba(190, 18, 60, 0.5)',
            }}
          >
            Every flower here
          </span>

          <span
            className="font-['Great_Vibes',cursive] text-3xl sm:text-4xl md:text-5xl tracking-wide text-rose-50 inline-flex items-center gap-2"
            style={{
              textShadow:
                '0 0 12px rgba(255, 192, 203, 0.9), 0 0 24px rgba(244, 63, 94, 0.8), 0 0 40px rgba(190, 18, 60, 0.5)',
            }}
          >
            is a moment with you
            {/* Cute Glowing Heart on "with you" as in the video */}
            <span
              className="inline-block transform -rotate-12 animate-pulse"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 51, 102, 0.9))',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff3366">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
          </span>
        </motion.div>
      </div>

      {/* Floating Hearts in Night Sky */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-float-heart"
          style={{
            left: h.left,
            top: h.top,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            ['--rot' as string]: `${h.rotation}deg`,
            filter: 'drop-shadow(0 0 10px rgba(255, 51, 102, 0.85))',
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color || '#ff3b6c'}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Glowing Fairy Rings (emerald/cyan circle orbs as highlighted in video) */}
      {rings.map((r) => (
        <div
          key={r.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 animate-pulse-ring flex items-center justify-center"
          style={{
            left: r.left,
            top: r.top,
            width: `${r.size}px`,
            height: `${r.size}px`,
            animationDelay: `${r.delay}s`,
            animationDuration: `${r.duration}s`,
            borderColor: 'rgba(52, 211, 153, 0.85)',
          }}
        >
          {r.hasHeart ? (
            <svg
              width={r.size * 0.45}
              height={r.size * 0.45}
              viewBox="0 0 24 24"
              fill="#ff4071"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255, 64, 113, 0.8))' }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <div
              className="rounded-full bg-emerald-300"
              style={{
                width: `${r.size * 0.2}px`,
                height: `${r.size * 0.2}px`,
                boxShadow: '0 0 6px rgba(110, 231, 183, 1)',
              }}
            />
          )}
        </div>
      ))}

      {/* Firefly Sparks floating upward around the flowers */}
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: f.left,
            bottom: f.bottom,
            width: `${f.size}px`,
            height: `${f.size}px`,
            backgroundColor: '#ffb3c6',
            boxShadow: '0 0 8px #ff6699, 0 0 14px #ff3366',
            animation: `riseFirefly ${f.duration}s ease-in-out infinite`,
            animationDelay: `${f.delay}s`,
            ['--dx' as string]: f.dx,
          }}
        />
      ))}
    </motion.div>
  );
};
