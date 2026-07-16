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

      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float random1D(float n) {
          return fract(sin(n) * 43758.5453123);
      }

      void main() {
        vec2 uv = vUv;
        
        // ==========================================
        // MACRO GLITCH & DISTORTION ENGINE
        // ==========================================
        
        // 1. WAVE TEARING (VHS Tracking Error)
        // Periodically the whole screen warps like a broken VHS tape
        float isTearing = step(0.9, random1D(floor(uTime * 4.0)));
        float tearingOffset = sin(uv.y * 15.0 + uTime * 30.0) * sin(uv.y * 3.0 - uTime * 10.0);
        uv.x += tearingOffset * 0.1 * isTearing;
        
        // 2. DATA MOSHING (Barcode Stretching)
        // Divide screen into large chunky blocks
        vec2 blockUv = floor(uv * vec2(4.0, 12.0)); 
        // 10% chance for a block to be completely destroyed
        float blockGlitch = step(0.9, random(blockUv + floor(uTime * 10.0)));
        
        if (blockGlitch > 0.0) {
            // Stretch the UV space horizontally massively, turning noise into horizontal barcodes
            uv.x *= 0.01; 
            // Make the barcode slide violently
            uv.x += uTime * 5.0 * (random1D(blockUv.y) > 0.5 ? 1.0 : -1.0);
        }
        
        // 3. VIOLENT ROW SHIFTS (Digital Artifacts)
        // Thin, sharp horizontal cuts
        float glitchRow = floor(uv.y * uResolution.y / 12.0);
        float rowShift = step(0.93, random1D(glitchRow + floor(uTime * 18.0)));
        uv.x += (random1D(glitchRow + 50.0) - 0.5) * 0.6 * rowShift;

        // ==========================================
        // NOISE & COLOR GENERATION
        // ==========================================
        
        // Base scale for fine TV static
        vec2 fineUv = floor(uv * uResolution * 0.35); 
        
        // Fast time evolution
        vec2 timeOff = vec2(floor(uTime * 30.0), floor(uTime * 40.0));
        float n = random(fineUv + timeOff);
        
        // Map noise to colors (Strictly Black, White, Red)
        // To make it look extremely distorted, we increase the Red and White during glitches!
        
        // Calculate dynamic thresholds. If a macro glitch is happening, explode the reds and whites!
        float glitchIntensity = max(blockGlitch, rowShift);
        float whiteThresh = mix(0.85, 0.70, glitchIntensity); // Normal: 15% white. Glitch: 30% white
        float redThresh = mix(0.95, 0.85, glitchIntensity);   // Normal: 5% red. Glitch: 15% red
        
        float isWhite = step(whiteThresh, n) * (1.0 - step(redThresh, n));
        float isRed   = step(redThresh, n);
        float isBlack = 1.0 - step(whiteThresh, n);
        
        vec3 colorBlack = vec3(0.04, 0.04, 0.05);
        vec3 colorWhite = vec3(0.9, 0.9, 0.9);
        vec3 colorRed   = vec3(1.0, 0.05, 0.1);
        
        vec3 finalColor = isBlack * colorBlack + isWhite * colorWhite + isRed * colorRed;

        // ==========================================
        // POST-PROCESSING (Scanlines, Banding, Vignette)
        // ==========================================
        
        // Scanlines
        float scanline = sin(vUv.y * uResolution.y * 1.5); // use vUv so scanlines don't warp!
        finalColor *= mix(1.0, (scanline * 0.5 + 0.5), 0.3); // 30% opacity scanlines
        
        // Dark scrolling band
        float band = sin(vUv.y * 8.0 + uScroll * 20.0 - uTime * 3.0);
        finalColor -= (band * 0.08);

        // Interactive Cursor (Lilith's Eye effect)
        float distToMouse = distance(vUv, uMouse); 
        float glow = smoothstep(0.4, 0.0, distToMouse) * 0.8;
        
        // Mouse locally tears the fabric of reality into pure red static
        if (n > 0.1 && n < 0.1 + glow) {
             finalColor = mix(finalColor, colorRed, glow);
        }

        // Vignette
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
