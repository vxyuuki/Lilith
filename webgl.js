import * as THREE from 'three';
import gsap from 'gsap';

// --- WebGL Background Shader (Cyber-Fluid / Dark Smoke) ---
export function initWebGLBackground() {
  const canvas = document.getElementById('webgl-bg');
  if (!canvas) return;

  const scene = new THREE.Scene();
  // Using an orthographic camera since we are just drawing a flat 2D shader
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);

  // The Plane that covers the entire screen
  const geometry = new THREE.PlaneGeometry(2, 2);

  // Custom Shader Material for "Cyber Smoke / Fluid"
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScroll;
      
      varying vec2 vUv;

      // Pseudo-random noise function for film grain
      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float random1D(float n) {
          return fract(sin(n) * 43758.5453123);
      }

      void main() {
        vec2 uv = vUv;
        
        // --- 1. Glitch offset (Horizontal tearing) ---
        // Create blocky rows for glitches
        float glitchRow = floor(uv.y * uResolution.y / 20.0);
        // Randomly trigger a glitch on this row (only occasionally)
        float isGlitch = step(0.97, random1D(glitchRow + floor(uTime * 15.0))); 
        // Random horizontal shift amount for the glitch
        float glitchOffset = (random1D(glitchRow + 100.0) - 0.5) * 0.15 * isGlitch;
        
        uv.x += glitchOffset;

        // --- 2. TV Static Noise ---
        // Scale UV for slightly chunky pixels (classic TV static feel)
        vec2 fineUv = floor(uv * uResolution * 0.4); 
        // Fast changing random noise
        float n = random(fineUv + vec2(floor(uTime * 25.0), floor(uTime * 35.0)));
        
        // --- 3. Color Mapping (Black, White, Red) ---
        // Using step functions to map random noise to distinct colors
        // Keep it mostly dark (85%) so the website text remains readable!
        float isWhite = step(0.85, n) * (1.0 - step(0.95, n)); // 10% White
        float isRed   = step(0.95, n);                         // 5% Red
        float isBlack = 1.0 - step(0.85, n);                   // 85% Black
        
        vec3 colorBlack = vec3(0.04, 0.04, 0.05);
        vec3 colorWhite = vec3(0.85, 0.85, 0.9);
        vec3 colorRed   = vec3(0.9, 0.1, 0.2);
        
        vec3 finalColor = isBlack * colorBlack + isWhite * colorWhite + isRed * colorRed;
        
        // --- 4. Chromatic Glitch Aberration ---
        // If this row is glitching, intensify and shift the red channel
        if (isGlitch > 0.0) {
            float nRed = random(fineUv + vec2(floor(uTime * 30.0) + 10.0, 0.0));
            if (nRed > 0.3) finalColor = mix(finalColor, colorRed, 0.8);
        }

        // --- 5. Scanlines ---
        // High frequency horizontal lines
        float scanline = sin(vUv.y * uResolution.y * 1.5);
        finalColor *= (scanline * 0.15 + 0.85); // Darken gaps by 15%
        
        // --- 6. Scroll Banding & Mouse Glow ---
        // Gentle dark bands moving during scroll
        float band = sin(vUv.y * 10.0 + uScroll * 15.0 - uTime * 2.0);
        finalColor -= (band * 0.05);

        float distToMouse = distance(vUv, uMouse); 
        float glow = smoothstep(0.5, 0.0, distToMouse) * 0.6;
        
        // Mouse reveals intense red static
        if (n > 0.2 && n < 0.2 + glow) {
             finalColor = mix(finalColor, colorRed, glow);
        }

        // --- 7. Vignette ---
        float vignette = vUv.x * vUv.y * (1.0 - vUv.x) * (1.0 - vUv.y);
        vignette = clamp(pow(abs(vignette) * 15.0, 0.4), 0.0, 1.0);
        
        gl_FragColor = vec4(finalColor * vignette, 1.0);
      }
    `
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Mouse Tracking
  let targetMouse = { x: 0.5, y: 0.5 };
  window.addEventListener('mousemove', (e) => {
    targetMouse.x = e.clientX / window.innerWidth;
    // Invert Y for WebGL
    targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
  });

  // Scroll Tracking
  let currentScroll = 0;
  window.addEventListener('scroll', () => {
    currentScroll = window.scrollY / window.innerHeight;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsedTime;
    
    // Lerp mouse for smoothness
    material.uniforms.uMouse.value.x += (targetMouse.x - material.uniforms.uMouse.value.x) * 0.05;
    material.uniforms.uMouse.value.y += (targetMouse.y - material.uniforms.uMouse.value.y) * 0.05;
    
    // Lerp scroll
    material.uniforms.uScroll.value += (currentScroll - material.uniforms.uScroll.value) * 0.1;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.uResolution.value.set(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
  });
}
