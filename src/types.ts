export type AnimationStage = 'intro' | 'transition' | 'flowers';

export interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
  hue: number;
}

export interface BurstHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  opacity: number;
  color: string;
}

