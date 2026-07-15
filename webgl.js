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

      // Classic Perlin 2D Noise 
      // by Stefan Gustavson
      vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

      float cnoise(vec2 P) {
        vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
        vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
        Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
        vec4 ix = Pi.xzxz;
        vec4 iy = Pi.yyww;
        vec4 fx = Pf.xzxz;
        vec4 fy = Pf.yyww;
        vec4 i = permute(permute(ix) + iy);
        vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
        vec4 gy = abs(gx) - 0.5;
        vec4 tx = floor(gx + 0.5);
        gx = gx - tx;
        vec2 g00 = vec2(gx.x,gy.x);
        vec2 g10 = vec2(gx.y,gy.y);
        vec2 g01 = vec2(gx.z,gy.z);
        vec2 g11 = vec2(gx.w,gy.w);
        vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
        g00 *= norm.x;
        g01 *= norm.y;
        g10 *= norm.z;
        g11 *= norm.w;
        float n00 = dot(g00, vec2(fx.x, fy.x));
        float n10 = dot(g10, vec2(fx.y, fy.y));
        float n01 = dot(g01, vec2(fx.z, fy.z));
        float n11 = dot(g11, vec2(fx.w, fy.w));
        vec2 fade_xy = fade(Pf.xy);
        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
        return 2.3 * n_xy;
      }

      // Fractional Brownian Motion
      float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * cnoise(x);
          x = rot * x * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 normUv = gl_FragCoord.xy / uResolution.xy;
        vec2 st = normUv;
        st.x *= uResolution.x / uResolution.y; // Correct aspect ratio

        // Add slow movement and scroll influence
        vec2 q = vec2(0.);
        q.x = fbm(st + 0.00 * uTime);
        q.y = fbm(st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime + uScroll * 0.5);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);

        float f = fbm(st + r);

        // Mix colors: Deep void black to cyber red
        vec3 colorBlack = vec3(0.02, 0.02, 0.03); // base dark
        vec3 colorRed = vec3(0.6, 0.05, 0.1);     // subtle accent
        vec3 colorBrightRed = vec3(0.9, 0.1, 0.2); // high intensity

        // Mouse interaction ripple
        float distToMouse = distance(vUv, uMouse);
        float mouseGlow = smoothstep(0.4, 0.0, distToMouse) * 0.5;
        
        // Base smoke color
        vec3 finalColor = mix(colorBlack, colorRed, clamp((f*f)*4.0, 0.0, 1.0));
        
        // Add brighter red edges
        finalColor = mix(finalColor, colorBrightRed, clamp(length(q), 0.0, 1.0) * mouseGlow);
        
        // Vignette uses normalized UV to prevent NaN artifacts!
        float vignette = normUv.x * normUv.y * (1.0 - normUv.x) * (1.0 - normUv.y);
        vignette = clamp(pow(abs(vignette) * 15.0, 0.25), 0.0, 1.0);
        
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
