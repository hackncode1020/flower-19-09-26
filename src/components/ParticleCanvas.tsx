import React, { useEffect, useRef } from 'react';
import type { HeartParticle } from '../types';

interface ParticleCanvasProps {
  opacity?: number;
  interactive?: boolean;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  opacity = 1,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate floating romantic hearts and starlight particles
    const particleCount = Math.min(width < 768 ? 25 : 45, 50);
    const particles: HeartParticle[] = [];

    const createParticle = (initialY?: number): HeartParticle => ({
      x: Math.random() * width,
      y: initialY !== undefined ? initialY : Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: -(Math.random() * 0.6 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 0.6 + 0.4,
      rotation: (Math.random() - 0.5) * 0.5,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      hue: 340 + Math.random() * 25, // Soft roses to warm crimson
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // Interactive mouse / touch particles
    const pointerParticles: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      vx: number;
      vy: number;
      life: number;
    }> = [];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;

      if (clientX === undefined || clientY === undefined) return;

      for (let i = 0; i < 2; i++) {
        pointerParticles.push({
          x: clientX + (Math.random() - 0.5) * 15,
          y: clientY + (Math.random() - 0.5) * 15,
          size: Math.random() * 5 + 3,
          opacity: 0.8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
        });
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Draw heart shape path helper
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rot: number,
      alpha: number,
      hue: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rot);
      context.scale(size / 15, size / 15);
      context.beginPath();

      // Parametric heart formula
      context.moveTo(0, 0);
      context.bezierCurveTo(-7.5, -7.5, -15, 3, 0, 15);
      context.bezierCurveTo(15, 3, 7.5, -7.5, 0, 0);

      context.fillStyle = `hsla(${hue}, 85%, 65%, ${alpha})`;
      context.shadowColor = `hsla(${hue}, 90%, 65%, ${alpha * 0.8})`;
      context.shadowBlur = size * 1.2;
      context.fill();
      context.restore();
    };

    // Draw small ambient star spark
    const drawStar = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number
    ) => {
      context.save();
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 230, 240, ${alpha})`;
      context.shadowColor = `rgba(255, 180, 200, ${alpha * 0.9})`;
      context.shadowBlur = size * 3;
      context.fill();
      context.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render floating hearts
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + i) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.y < -30) {
          particles[i] = createParticle(height + 20);
        }

        const isHeart = i % 3 === 0;
        const currentAlpha = p.opacity * opacity * (0.8 + Math.sin(time * 2 + i) * 0.2);

        if (isHeart) {
          drawHeart(ctx, p.x, p.y, p.size, p.rotation, currentAlpha, p.hue);
        } else {
          drawStar(ctx, p.x, p.y, p.size * 0.35, currentAlpha);
        }
      }

      // Render interactive sparkles
      for (let i = pointerParticles.length - 1; i >= 0; i--) {
        const pp = pointerParticles[i];
        pp.x += pp.vx;
        pp.y += pp.vy;
        pp.life -= 0.025;
        pp.opacity = pp.life * 0.8 * opacity;

        if (pp.life <= 0) {
          pointerParticles.splice(i, 1);
          continue;
        }

        drawStar(ctx, pp.x, pp.y, pp.size * pp.life, pp.opacity);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [opacity, interactive]);

  return (
    <canvas
      id="particle-canvas"
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 block h-full w-full"
      style={{ opacity }}
    />
  );
};
