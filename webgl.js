import * as THREE from 'three';
import gsap from 'gsap';

let material;

function getThemeColor() {
  let root = document.querySelector('style'); // Injected styles or use body computed style
  let compStyles = getComputedStyle(document.body);
  let rawColor = compStyles.getPropertyValue('--accent').trim();
  
  // If the color isn't ready yet or missing, default to Red (Lilith)
  if(!rawColor || rawColor === '') {
      rawColor = '#ff003c';
  }

  if(rawColor.startsWith('#')) {
    let hex = parseInt(rawColor.replace('#', ''), 16);
    let r = ((hex >> 16) & 255) / 255;
    let g = ((hex >> 8) & 255) / 255;
    let b = (hex & 255) / 255;
    // Dim the color slightly so the noise isn't too bright
    return new THREE.Vector3(r * 0.8, g * 0.8, b * 0.8);
  }
  return new THREE.Vector3(0.7, 0.1, 0.15); // Fallback
}

export function updateWebGLTheme() {
  if (material && material.uniforms) {
    const newColor = getThemeColor();
    gsap.to(material.uniforms.uAccentColor.value, {
      x: newColor.x,
      y: newColor.y,
      z: newColor.z,
      duration: 1.5,
      ease: 'power2.out'
    });
  }
}

export function initWebGLBackground() {
  const canvas = document.getElementById('webgl-bg');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);

  const geometry = new THREE.PlaneGeometry(2, 2);

  material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0.0 },
      uAccentColor: { value: getThemeColor() }
    },
    vertexShader: \
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    \,
    fragmentShader: \
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform vec3 uAccentColor;
      
      varying vec2 vUv;

      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float random1D(float n) {
          return fract(sin(n) * 43758.5453123);
      }

      void main() {
        vec2 uv = vUv;
        
        float isTearing = step(0.9, random1D(floor(uTime * 4.0)));
        float tearingOffset = sin(uv.y * 15.0 + uTime * 30.0) * sin(uv.y * 3.0 - uTime * 10.0);
        uv.x += tearingOffset * 0.1 * isTearing;
        
        vec2 blockUv = floor(uv * vec2(4.0, 12.0)); 
        float blockGlitch = step(0.9, random(blockUv + floor(uTime * 10.0)));
        
        if (blockGlitch > 0.0) {
            uv.x *= 0.01; 
            uv.x += uTime * 5.0 * (random1D(blockUv.y) > 0.5 ? 1.0 : -1.0);
        }
        
        float glitchRow = floor(uv.y * uResolution.y / 12.0);
        float rowShift = step(0.93, random1D(glitchRow + floor(uTime * 18.0)));
        uv.x += (random1D(glitchRow + 50.0) - 0.5) * 0.6 * rowShift;

        vec2 fineUv = floor(uv * uResolution * 0.35); 
        vec2 timeOff = vec2(floor(uTime * 30.0), floor(uTime * 40.0));
        float n = random(fineUv + timeOff);
        
        float glitchIntensity = max(blockGlitch, rowShift);
        float whiteThresh = mix(0.93, 0.85, glitchIntensity); 
        float redThresh = mix(0.98, 0.90, glitchIntensity);   
        
        float isWhite = step(whiteThresh, n) * (1.0 - step(redThresh, n));
        float isRed   = step(redThresh, n);
        float isBlack = 1.0 - step(whiteThresh, n);
        
        vec3 colorBlack = vec3(0.04, 0.04, 0.05);
        vec3 colorWhite = vec3(0.45, 0.45, 0.5); 
        vec3 colorAccent = uAccentColor;  // Dynamically injected CSS color
        
        vec3 finalColor = isBlack * colorBlack + isWhite * colorWhite + isRed * colorAccent;

        float scanline = sin(vUv.y * uResolution.y * 1.5); 
        finalColor *= mix(1.0, (scanline * 0.5 + 0.5), 0.3); 
        
        float band = sin(vUv.y * 8.0 + uScroll * 20.0 - uTime * 3.0);
        finalColor -= (band * 0.08);

        float distToMouse = distance(vUv, uMouse); 
        float glow = smoothstep(0.4, 0.0, distToMouse) * 0.8;
        
        if (n > 0.1 && n < 0.1 + glow) {
             finalColor = mix(finalColor, colorAccent, glow);
        }

        float vignette = vUv.x * vUv.y * (1.0 - vUv.x) * (1.0 - vUv.y);
        vignette = clamp(pow(abs(vignette) * 15.0, 0.4), 0.0, 1.0);
        
        gl_FragColor = vec4(finalColor * vignette, 1.0);
      }
    \
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let targetMouse = { x: 0.5, y: 0.5 };
  window.addEventListener('mousemove', (e) => {
    targetMouse.x = e.clientX / window.innerWidth;
    targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
  });

  let currentScroll = 0;
  window.addEventListener('scroll', () => {
    currentScroll = window.scrollY / window.innerHeight;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    
    if (material && material.uniforms) {
      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value.x += (targetMouse.x - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetMouse.y - material.uniforms.uMouse.value.y) * 0.05;
      material.uniforms.uScroll.value += (currentScroll - material.uniforms.uScroll.value) * 0.1;
    }
    
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (material && material.uniforms) {
      material.uniforms.uResolution.value.set(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
    }
  });
}
