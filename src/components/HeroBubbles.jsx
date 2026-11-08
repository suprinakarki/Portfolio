import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const bubbles = [
  [2, 18, 27, '#bb7c21', true], [13, 9, 5, '#93619d'],
  [28, 6, 6, '#bb7c21', true], [43, 20, 4, '#93619d'],
  [60, 9, 4, '#a58f2c'], [77, 15, 7, '#b64058', true],
  [95, 5, 5, '#bb7c21'], [91, 45, 5, '#93619d'],
  [75, 60, 3, '#a58f2c'], [98, 76, 8, '#bb7c21', true],
  [4, 70, 5, '#bb7c21'], [15, 90, 6, '#b64058', true],
  [48, 88, 4, '#93619d'], [65, 81, 4, '#a58f2c'],
  [8, 36, 8, '#b64058', true], [20, 54, 4, '#bb7c21'],
  [34, 40, 10, '#93619d', true], [52, 49, 6, '#a58f2c'],
  [69, 32, 12, '#bb7c21', true], [86, 24, 5, '#b64058'],
  [11, 79, 14, '#93619d', true], [26, 74, 6, '#a58f2c'],
  [39, 62, 5, '#b64058'], [58, 69, 9, '#bb7c21', true],
  [82, 87, 7, '#93619d'], [93, 63, 11, '#a58f2c', true],
  [6, 50, 4, '#a58f2c'], [23, 25, 7, '#93619d'],
  [46, 35, 5, '#bb7c21'], [72, 94, 6, '#b64058', true],
];

export default function HeroBubbles() {
  const container = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const host = container.current;
    let width = host.clientWidth;
    let height = host.clientHeight;
    let frame;
    let previous;
    let elapsed = 0;
    const particles = bubbles.map(([x, y, radius], index) => {
      const angle = index * 2.399 + 0.4;
      const speed = 35 + index % 5 * 13;
      return { x: x / 100 * width, y: y / 100 * height, radius,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        element: host.children[index], pointer: null, offsetX: 0, offsetY: 0 };
    });
    const clamp = (value, limit, margin) => Math.max(Math.min(margin, limit / 2), Math.min(value, limit - Math.min(margin, limit / 2)));
    function draw(p, index) {
      const scale = reducedMotion ? 1 : 1.1 + Math.sin(elapsed * (5 + index % 4) + index) * 0.5;
      const margin = Math.max(14, p.radius * 1.6);
      p.x = clamp(p.x, width, margin);
      p.y = clamp(p.y, height, margin);
      p.element.style.transform = `translate3d(${p.x - 14}px,${p.y - 14}px,0)`;
      p.element.firstElementChild.style.transform = `scale(${scale})`;
    }
    const cleanups = particles.map((p, index) => {
      function down(event) {
        if (event.button !== 0 || p.pointer !== null) return;
        const bounds = host.getBoundingClientRect();
        p.pointer = event.pointerId;
        p.offsetX = event.clientX - bounds.left - p.x;
        p.offsetY = event.clientY - bounds.top - p.y;
        p.element.setPointerCapture(event.pointerId);
        p.element.classList.add('is-dragging');
        event.preventDefault();
      }
      function move(event) {
        if (p.pointer !== event.pointerId) return;
        const bounds = host.getBoundingClientRect();
        p.x = event.clientX - bounds.left - p.offsetX;
        p.y = event.clientY - bounds.top - p.offsetY;
        draw(p, index);
      }
      function release(event) {
        if (p.pointer !== event.pointerId) return;
        p.pointer = null;
        p.element.classList.remove('is-dragging');
        if (p.element.hasPointerCapture(event.pointerId)) p.element.releasePointerCapture(event.pointerId);
      }
      const events = { pointerdown: down, pointermove: move, pointerup: release, pointercancel: release, lostpointercapture: release };
      Object.entries(events).forEach(([type, handler]) => p.element.addEventListener(type, handler));
      draw(p, index);
      return () => Object.entries(events).forEach(([type, handler]) => p.element.removeEventListener(type, handler));
    });
    const observer = new ResizeObserver(() => {
      width = host.clientWidth;
      height = host.clientHeight;
      particles.forEach(draw);
    });
    observer.observe(host);
    function tick(now) {
      const dt = previous === undefined ? 0 : Math.min((now - previous) / 1000, 0.04);
      previous = now;
      elapsed += dt;
      particles.forEach((p, index) => {
        if (p.pointer === null) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          const margin = Math.max(14, p.radius * 1.6);
          if (p.x <= margin) p.vx = Math.abs(p.vx);
          if (p.x >= width - margin) p.vx = -Math.abs(p.vx);
          if (p.y <= margin) p.vy = Math.abs(p.vy);
          if (p.y >= height - margin) p.vy = -Math.abs(p.vy);
        }
        draw(p, index);
      });
      frame = requestAnimationFrame(tick);
    }
    if (!reducedMotion) frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); cleanups.forEach(cleanup => cleanup()); };
  }, [reducedMotion]);

  return <div ref={container} className="hero-bubbles" aria-hidden="true">
    {bubbles.map(([, , radius, color, outline], index) => <span key={index} className="hero-bubble"><span style={{
      width: radius * 2, height: radius * 2,
      background: outline ? 'transparent' : color,
      border: outline ? `1px solid ${color}` : 'none',
    }}/></span>)}
  </div>;
}
