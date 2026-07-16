import gsap from 'gsap';

// ============================================================
// WebGL Gallery Hover — Liquid Ripple + Pixel Sort + Chromatic
// ============================================================
// Strategy: Keep original <img> visible. Overlay a <canvas>
// on top that only becomes visible on hover. This way the user
// always sees the real image, and the WebGL effect is purely
// additive.

const VERT = `
attribute vec2 a_pos;
attribute vec2 a_uv;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_uv = a_uv;
}`;

const FRAG = `
precision mediump float;
uniform sampler2D u_tex;
uniform float u_time;
uniform float u_hover;
uniform vec2 u_canvasRes;
uniform vec2 u_imgRes;
varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // --- object-fit: cover math ---
  float canvasAspect = u_canvasRes.x / u_canvasRes.y;
  float imgAspect    = u_imgRes.x   / u_imgRes.y;

  vec2 uv = v_uv;

  // flip Y so texture isn't upside-down
  uv.y = 1.0 - uv.y;

  if (canvasAspect > imgAspect) {
    // canvas wider → crop top/bottom
    float scale = imgAspect / canvasAspect;
    uv.y = uv.y * scale + (1.0 - scale) * 0.5;
  } else {
    // canvas taller → crop left/right
    float scale = canvasAspect / imgAspect;
    uv.x = uv.x * scale + (1.0 - scale) * 0.5;
  }

  // --- hover distortions (only when u_hover > 0) ---
  float h = u_hover;

  // 1. Liquid wave
  float wave = sin(uv.y * 20.0 + u_time * 3.0) * 0.015 * h;
  // Vertical wave for extra liquid feel
  float wave2 = sin(uv.x * 12.0 + u_time * 2.5) * 0.008 * h;

  // 2. Block-based pixel sort noise
  float blockSize = mix(80.0, 20.0, h);
  vec2 blockUv = floor(uv * blockSize) / blockSize;
  float sortNoise = hash(vec2(blockUv.y, floor(u_time * 8.0))) * 0.06 * h;

  vec2 distUv = uv;
  distUv.x += wave + sortNoise;
  distUv.y += wave2;

  // 3. Chromatic aberration
  float aberration = h * 0.012;
  float r = texture2D(u_tex, distUv + vec2(aberration, 0.0)).r;
  float g = texture2D(u_tex, distUv).g;
  float b = texture2D(u_tex, distUv - vec2(aberration, 0.0)).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}`;

function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

function buildProgram(gl) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

function setupQuad(gl, program) {
  // positions: full-screen quad
  const posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1
  ]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // UVs
  const uvBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0, 0, 1, 0, 0, 1,
    0, 1, 1, 0, 1, 1
  ]), gl.STATIC_DRAW);
  const aUv = gl.getAttribLocation(program, 'a_uv');
  gl.enableVertexAttribArray(aUv);
  gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
}

function loadTexture(gl, imgElement) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  // Set params first
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  // Upload directly from the <img> element (already loaded by browser)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgElement);
  return tex;
}

// ============================================================
// Public init — called from main.js
// ============================================================
export function initGalleryHovers(container) {
  const allImgWrappers = container.querySelectorAll('.quote-hover-item .img-wrapper');

  allImgWrappers.forEach(wrapper => {
    const img = wrapper.querySelector('img');
    if (!img || img.dataset.webglHover) return;
    img.dataset.webglHover = 'true';

    // --- create canvas overlay ---
    const canvas = document.createElement('canvas');
    canvas.className = 'webgl-hover-canvas';
    canvas.style.cssText = `
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: inherit;
    `;
    wrapper.appendChild(canvas);

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    const program = buildProgram(gl);
    if (!program) return;

    gl.useProgram(program);
    setupQuad(gl, program);

    // uniform locations
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uHover = gl.getUniformLocation(program, 'u_hover');
    const uCanvasRes = gl.getUniformLocation(program, 'u_canvasRes');
    const uImgRes = gl.getUniformLocation(program, 'u_imgRes');

    // --- Load texture from the <img> ---
    // The browser has already loaded the image for us.
    // But we need to wait if it hasn't finished yet.
    let textureReady = false;
    let texture = null;

    const uploadTexture = () => {
      try {
        texture = loadTexture(gl, img);
        textureReady = true;
      } catch (e) {
        console.warn('Texture upload failed, will retry', e);
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      uploadTexture();
    } else {
      img.addEventListener('load', uploadTexture, { once: true });
    }

    // --- Sizing ---
    const syncSize = () => {
      const w = wrapper.offsetWidth;
      const h = wrapper.offsetHeight;
      if (w < 1 || h < 1) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.useProgram(program);
      gl.uniform2f(uCanvasRes, w, h);
      const iw = img.naturalWidth || 1;
      const ih = img.naturalHeight || 1;
      gl.uniform2f(uImgRes, iw, ih);
    };
    // Resize on window change
    window.addEventListener('resize', syncSize);
    // Initial + delayed fallback
    syncSize();
    setTimeout(syncSize, 200);
    setTimeout(syncSize, 1000);

    // --- Hover state ---
    let hoverVal = { v: 0 };
    let isHovering = false;
    let animFrameId = null;
    const startT = performance.now();

    const galleryItem = wrapper.closest('.gallery-item');

    // --- Typewriter setup ---
    let quoteSpans = null;
    if (galleryItem) {
      const qw = galleryItem.querySelector('.quote-wrapper');
      if (qw) {
        const p = qw.querySelector('p');
        if (p) {
          const text = p.textContent;
          p.innerHTML = '';
          p.style.opacity = '0';
          [...text].forEach(ch => {
            const span = document.createElement('span');
            span.textContent = ch;
            span.style.opacity = '0';
            p.appendChild(span);
          });
          quoteSpans = { p, spans: p.querySelectorAll('span') };
        }
      }
    }

    // --- Render loop ---
    const render = () => {
      if (!textureReady) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      const t = (performance.now() - startT) * 0.001;

      gl.useProgram(program);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uHover, hoverVal.v);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameId = requestAnimationFrame(render);
    };

    // --- Mouse events on the gallery-item ---
    const onEnter = () => {
      isHovering = true;
      syncSize(); // ensure fresh dimensions
      // Re-upload texture in case it failed before
      if (!textureReady && img.complete) uploadTexture();

      canvas.style.opacity = '1';

      // Start render loop if not running
      if (!animFrameId) render();

      gsap.to(hoverVal, {
        v: 1.0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Typewriter in
      if (quoteSpans) {
        quoteSpans.p.style.opacity = '1';
        gsap.to(quoteSpans.spans, {
          opacity: 1,
          stagger: 0.02,
          duration: 0.05,
          ease: 'none',
          overwrite: true
        });
      }
    };

    const onLeave = () => {
      isHovering = false;

      gsap.to(hoverVal, {
        v: 0.0,
        duration: 1.0,
        ease: 'power3.out',
        onComplete: () => {
          if (!isHovering) {
            canvas.style.opacity = '0';
            // Stop render loop when not hovering to save GPU
            if (animFrameId) {
              cancelAnimationFrame(animFrameId);
              animFrameId = null;
            }
          }
        }
      });

      // Typewriter out
      if (quoteSpans) {
        gsap.to(quoteSpans.spans, {
          opacity: 0,
          stagger: 0.005,
          duration: 0.05,
          ease: 'none',
          overwrite: true,
          onComplete: () => {
            if (!isHovering) quoteSpans.p.style.opacity = '0';
          }
        });
      }
    };

    if (galleryItem) {
      galleryItem.addEventListener('mouseenter', onEnter);
      galleryItem.addEventListener('mouseleave', onLeave);
    }

    // --- Cleanup for Barba.js transitions ---
    img.cleanupWebGL = () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', syncSize);
      if (galleryItem) {
        galleryItem.removeEventListener('mouseenter', onEnter);
        galleryItem.removeEventListener('mouseleave', onLeave);
      }
    };
  });
}
