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

      void main() {
        vec2 uv = vUv;
        
        // Base dark background (Cyber-minimalist black)
        vec3 baseColor = vec3(0.04, 0.04, 0.05);
        
        // --- 1. Dynamic CRT Film Grain ---
        // Fast-moving, high-frequency noise
        vec2 grainUv = uv * uResolution * 0.8; 
        grainUv += vec2(uTime * 15.0, uTime * 25.0); 
        float noise = random(grainUv);
        
        // "Tipis" (subtle) grain: map noise (0 to 1) to a very small range (-0.03 to +0.03)
        float grainIntensity = 0.08;
        float grain = (noise - 0.5) * grainIntensity;
        
        // --- 2. Subtle Scanlines ---
        // Moving horizontal lines simulating old CRT monitors
        float scanline = sin(uv.y * uResolution.y * 0.4 - uTime * 3.0);
        float scanlineIntensity = 0.02;
        float scan = (scanline * 0.5 + 0.5) * scanlineIntensity;
        
        // --- 3. Interaction & Subtle Scroll Banding ---
        // Adding a very faint, slow-moving red band affected by scroll
        float band = sin(uv.y * 5.0 + uScroll * 10.0 + uTime * 0.5) * 0.015;
        baseColor.r += band;
        
        // Mouse glow for interactivity
        float distToMouse = distance(uv, uMouse);
        float glow = smoothstep(0.6, 0.0, distToMouse) * 0.04;
        baseColor += vec3(glow * 0.9, glow * 0.1, glow * 0.1); // Faint red glow
        
        // Combine layers
        vec3 finalColor = baseColor + vec3(grain) - vec3(scan);
        
        // --- 4. Soft Vignette ---
        // Darkens the corners to focus the center
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(abs(vignette) * 15.0, 0.3), 0.0, 1.0);
        
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
