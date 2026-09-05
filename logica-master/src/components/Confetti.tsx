import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  opacity: number;
}

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'];

function createParticle(i: number, width: number, height: number): Particle {
  return {
    id: i,
    x: width * 0.5 + (Math.random() - 0.5) * width * 0.5,
    y: height * 0.3,
    vx: (Math.random() - 0.5) * 10,
    vy: -(Math.random() * 10 + 3),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    gravity: 0.15,
    opacity: 1,
  };
}

export function Confetti({ fim, onFim }: { fim: boolean; onFim: () => void }) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (fim && !startAnimation) {
      setStartAnimation(true);
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;';
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d')!;
      const particles = Array.from({ length: 80 }, (_, i) => createParticle(i, canvas.width, canvas.height));

      let frame = 0;
      const maxFrames = 150;

      const animate = () => {
        if (frame >= maxFrames) {
          document.body.removeChild(canvas);
          setStartAnimation(false);
          onFim();
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          p.vy += p.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;
          p.opacity = Math.max(0, 1 - frame / maxFrames);

          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        });

        frame++;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [fim, startAnimation, onFim]);

  return null;
}