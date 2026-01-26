// src/Orb.tsx
import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';

interface OrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
  className?: string;
}

export default function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
  className = ""
}: OrbProps) {
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    // WebGL Initialization
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    // Clear the container just in case
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(gl.canvas);

    const vert = `
      precision highp float;
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const frag = `
      precision highp float;
      uniform float iTime;
      uniform vec3 iResolution;
      uniform float hue;
      uniform float hover;
      uniform float rot;
      uniform float hoverIntensity;
      varying vec2 vUv;

      vec3 rgb2yiq(vec3 c) {
        return vec3(dot(c, vec3(0.299, 0.587, 0.114)), dot(c, vec3(0.596, -0.274, -0.322)), dot(c, vec3(0.211, -0.523, 0.312)));
      }
      
      vec3 yiq2rgb(vec3 c) {
        return vec3(c.x + 0.956 * c.y + 0.621 * c.z, c.x - 0.272 * c.y - 0.647 * c.z, c.x - 1.106 * c.y + 1.703 * c.z);
      }
      
      vec3 adjustHue(vec3 color, float hueDeg) {
        float hueRad = hueDeg * 0.0174532925;
        vec3 yiq = rgb2yiq(color);
        float cosA = cos(hueRad), sinA = sin(hueRad);
        return yiq2rgb(vec3(yiq.x, yiq.y * cosA - yiq.z * sinA, yiq.y * sinA + yiq.z * cosA));
      }
      
      vec3 hash33(vec3 p3) {
        p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
        p3 += dot(p3, p3.yxz + 19.19);
        return -1.0 + 2.0 * fract(vec3(p3.x + p3.y, p3.x + p3.z, p3.y + p3.z) * p3.zyx);
      }
      
      float snoise3(vec3 p) {
        const float K1 = 0.333333333, K2 = 0.166666667;
        vec3 i = floor(p + (p.x + p.y + p.z) * K1);
        vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
        vec3 e = step(vec3(0.0), d0 - d0.yzx);
        vec3 i1 = e * (1.0 - e.zxy), i2 = 1.0 - e.zxy * (1.0 - e);
        vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d0 - (i1 - K2), d0 - (i1 - K2)), dot(d0 - (i2 - K1), d0 - (i2 - K1)), dot(d0 - 0.5, d0 - 0.5)), 0.0);
        return dot(vec4(31.316), h * h * h * h * vec4(dot(d0, hash33(i)), dot(d0 - (i1 - K2), hash33(i + i1)), dot(d0 - (i2 - K1), hash33(i + i2)), dot(d0 - 0.5, hash33(i + 1.0))));
      }
      
      vec4 extractAlpha(vec3 colorIn) {
        float a = max(max(colorIn.r, colorIn.g), colorIn.b);
        return vec4(colorIn.rgb / (a + 1e-5), a);
      }
      
      const vec3 baseColor1 = vec3(0.61, 0.26, 0.99), baseColor2 = vec3(0.3, 0.76, 0.91), baseColor3 = vec3(0.06, 0.08, 0.6);
      
      vec4 draw(vec2 uv, float time) {
        vec3 color1 = adjustHue(baseColor1, hue), color2 = adjustHue(baseColor2, hue), color3 = adjustHue(baseColor3, hue);
        float len = length(uv), n0 = snoise3(vec3(uv * 0.65, time * 0.5)) * 0.5 + 0.5;
        float r0 = mix(0.84, 0.76, n0), d0 = distance(uv, (r0 / (len + 1e-5)) * uv);
        float v0 = (1.0 / (1.0 + d0 * 10.0)) * smoothstep(r0 * 1.05, r0, len);
        float v1 = (1.5 / (1.0 + distance(uv, vec2(cos(-time), sin(-time)) * r0) * 5.0)) * (1.0 / (1.0 + d0 * 50.0));
        vec3 col = (mix(mix(color1, color2, cos(atan(uv.y, uv.x) + time * 2.0) * 0.5 + 0.5), color3, v0) + v1) * smoothstep(1.0, mix(0.6, 1.0, n0 * 0.5), len) * smoothstep(0.6, 0.8, len);
        return extractAlpha(clamp(col, 0.0, 1.0));
      }
      
      void main() {
        vec2 uv = (vUv * iResolution.xy - iResolution.xy * 0.5) / min(iResolution.x, iResolution.y) * 2.0;
        float s = sin(rot), c = cos(rot);
        uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
        uv += hover * hoverIntensity * 0.1 * sin(uv.yx * 10.0 + iTime);
        vec4 col = draw(uv, iTime);
        gl_FragColor = vec4(col.rgb * col.a, col.a);
      }
    `;

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3() },
        hue: { value: hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: hoverIntensity }
      }
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    // Resize handling with Debounce
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!container) return;
        // Performance: Force DPR to 1.0
        const dpr = 1.0;
        renderer.setSize(container.clientWidth * dpr, container.clientHeight * dpr);
        program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
      }, 100);
    };

    // Initial resize
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop Control
    let rafId: number;
    let isLooping = false;
    let lastTime = 0;
    let targetHover = 0, currentRot = 0;

    const update = (t: number) => {
      if (!isLooping) return;
      rafId = requestAnimationFrame(update);

      const dt = (t - lastTime) * 0.001;
      // Cap at ~30FPS for background element (33ms)
      if (dt < 0.033) return;

      lastTime = t;
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = hue;

      const effectiveHover = forceHoverState ? 1 : targetHover;
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

      if (rotateOnHover && effectiveHover > 0.5) {
        currentRot += dt * 0.3;
      }
      program.uniforms.rot.value = currentRot;

      renderer.render({ scene: mesh });
    };

    const startLoop = () => {
      if (!isLooping) {
        isLooping = true;
        lastTime = performance.now();
        rafId = requestAnimationFrame(update);
      }
    };

    const stopLoop = () => {
      isLooping = false;
      if (rafId) cancelAnimationFrame(rafId);
    };

    // Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    // Mouse Move Logic
    const handleMouseMove = (e: MouseEvent) => {
      // Use cached rect if possible, or accept overhead only when hovering. 
      // For precision, we usually need fresh rect, but we can check if it's costly.
      const rect = container.getBoundingClientRect();
      const uvX = ((e.clientX - rect.left - rect.width / 2) / Math.min(rect.width, rect.height)) * 2.0;
      const uvY = ((e.clientY - rect.top - rect.height / 2) / Math.min(rect.width, rect.height)) * 2.0;
      targetHover = (uvX * uvX + uvY * uvY) < 0.64 ? 1 : 0;
    };
    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resizeTimeout);

      // WebGL Cleanup
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

  return <div ref={ctnDom} className={`w-full h-full pointer-events-none ${className} will-change-transform`} />;
}