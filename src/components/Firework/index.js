import { useRef, useEffect } from 'react';

export default function FireworkComponent() {
  const canvasRef = useRef(null);

  function drawFirework() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const firework = {
      x: canvas.width / 2,
      y: canvas.height,
      radius: 2,
      color: 'red'
    };

    const particles = [];

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
      ctx.fillStyle = firework.color;
      ctx.fill();
      ctx.closePath();

      firework.y -= 5;

      if (firework.y < 0) {
        createParticles();
        firework.y = canvas.height;
      }

      drawParticles();
      requestAnimationFrame(animate);
    }

    function createParticles() {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: firework.x,
          y: firework.y,
          radius: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          vx: Math.random() * 6 - 3,
          vy: Math.random() * -6 + 3
        });
      }
    }

    function drawParticles() {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.1;
      }
    }

    animate();
  }

  useEffect(() => {
    drawFirework();
  }, []);

  return (
    <canvas ref={canvasRef} width="auto" height="auto"></canvas>
  );
}
