import React, { useEffect, useState, useCallback } from 'react';
import type { BurstHeart } from '../types';
import { romanticAudio } from '../utils/audio';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

export const InteractiveHeartBursts: React.FC = () => {
  const [bursts, setBursts] = useState<BurstHeart[]>([]);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  const handlePointerDown = useCallback((e: MouseEvent | TouchEvent) => {
    // Avoid triggering burst if clicking a button or link
    const target = e.target as HTMLElement | null;
    if (target && (target.closest('button') || target.closest('a') || target.closest('input'))) {
      return;
    }

    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;

    if (clientX === undefined || clientY === undefined) return;

    // Soft chime if music is running
    if (romanticAudio.getIsPlaying()) {
      romanticAudio.playSoftTapChime();
    }

    const colors = [
      'rgba(244, 63, 94, 0.95)', // Rose
      'rgba(251, 113, 133, 0.95)', // Light pink
      'rgba(225, 29, 72, 0.9)', // Crimson
      'rgba(255, 228, 230, 0.95)', // Pearl shimmer
    ];

    const newHearts: BurstHeart[] = [];
    const count = 7;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 2.5 + 1.2;
      newHearts.push({
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        size: Math.random() * 8 + 12,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.8,
        rotation: (Math.random() - 0.5) * 40,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const newSparkles: SparkleParticle[] = [];
    const sparkleColors = ['#ffd166', '#ffffff', '#ff9ebb', '#a7f3d0'];
    for (let j = 0; j < 5; j++) {
      const sAngle = Math.random() * Math.PI * 2;
      const sSpeed = Math.random() * 3 + 0.8;
      newSparkles.push({
        id: Date.now() + Math.random() + 100,
        x: clientX,
        y: clientY,
        size: Math.random() * 3 + 2,
        vx: Math.cos(sAngle) * sSpeed,
        vy: Math.sin(sAngle) * sSpeed - 1.0,
        opacity: 1,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      });
    }

    setBursts((prev) => [...prev.slice(-35), ...newHearts]);
    setSparkles((prev) => [...prev.slice(-25), ...newSparkles]);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [handlePointerDown]);

  useEffect(() => {
    if (bursts.length === 0 && sparkles.length === 0) return;

    const frameId = requestAnimationFrame(() => {
      setBursts((prev) =>
        prev
          .map((h) => ({
            ...h,
            x: h.x + h.vx,
            y: h.y + h.vy,
            vy: h.vy - 0.05, // gentle buoyant lift
            opacity: h.opacity - 0.018,
            rotation: h.rotation + (h.vx > 0 ? 0.8 : -0.8),
          }))
          .filter((h) => h.opacity > 0)
      );

      setSparkles((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            vy: s.vy + 0.04,
            opacity: s.opacity - 0.025,
          }))
          .filter((s) => s.opacity > 0)
      );
    });

    return () => cancelAnimationFrame(frameId);
  }, [bursts, sparkles]);

  return (
    <div
      id="interactive-heart-bursts"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {/* Golden & Rose Sparkle dust */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            opacity: s.opacity,
            boxShadow: `0 0 8px ${s.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Floating Hearts */}
      {bursts.map((h) => (
        <div
          key={h.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
            opacity: h.opacity,
            transform: `translate(-50%, -50%) rotate(${h.rotation}deg)`,
            filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.6))',
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            stroke="none"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
