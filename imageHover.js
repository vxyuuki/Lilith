import gsap from \'gsap\';

const vsSource =   attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = vec2(a_texCoord.x, 1.0 - a_texCoord.y); // Flip Y for WebGL texture
  }
\;

const fsSource =   precision mediump float;
  uniform sampler2D u_image;
  uniform float u_time;
  uniform float u_hover; // 0.0 to 1.0
  varying vec2 v_texCoord;

  // Pseudo-random noise
  float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = v_texCoord;

    // Liquid + Pixel Sort Glitch
    // 1. Divide UV into blocks based on hover intensity
    float blocks = 40.0 - (u_hover * 20.0);
    vec2 blockUv = floor(uv * blocks) / blocks;
    
    // 2. Liquid wave
    float wave = sin(uv.y * 15.0 + u_time * 4.0) * 0.03 * u_hover;
    
    // 3. Pixel noise for sort effect
    float noise = rand(vec2(blockUv.y, u_time * 0.1)) * u_hover * 0.1;

    // Apply distortion
    vec2 distortedUv = uv;
    distortedUv.x += wave + noise;

    // Chromatic Aberration
    float r = texture2D(u_image, distortedUv + vec2(u_hover * 0.02, 0.0)).r;
    float g = texture2D(u_image, distortedUv).g;
    float b = texture2D(u_image, distortedUv - vec2(u_hover * 0.02, 0.0)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
\;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function initGalleryHovers(container) {
  const items = container.querySelectorAll('.gallery-item .img-wrapper img');
  
  items.forEach(img => {
    if (img.dataset.webglInit) return;
    img.dataset.webglInit = 'true';

    const wrapper = img.parentElement;
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';

    // Hide original image
    img.style.opacity = '0';
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    wrapper.appendChild(canvas);

    const gl = canvas.getContext('webgl', { alpha: true });
    if (!gl) return;

    // Setup WebGL Program
    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Geometry (Quad)
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0
    ]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoords = new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      0.0, 1.0,
      1.0, 0.0,
      1.0, 1.0
    ]);
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const hoverLocation = gl.getUniformLocation(program, 'u_hover');
    gl.uniform1f(hoverLocation, 0.0);

    // Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Load image into texture
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    };
    image.src = img.src; // Wait until loaded

    // Resize handling
    const resize = () => {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize(); // Initial

    // Hover logic
    let hoverValue = 0;
    const galleryItem = wrapper.closest('.gallery-item');
    
    // Setup quote typing container
    let quoteP = null;
    if (galleryItem) {
      const quoteWrapper = galleryItem.querySelector('.quote-wrapper');
      if (quoteWrapper) {
        quoteP = quoteWrapper.querySelector('p');
        if (quoteP) {
           quoteP.style.opacity = '0';
           // Split the text for typing effect
           const text = quoteP.innerText;
           quoteP.innerHTML = '';
           text.split('').forEach(char => {
              const span = document.createElement('span');
              span.innerText = char;
              span.style.opacity = '0';
              quoteP.appendChild(span);
           });
        }
      }

      galleryItem.addEventListener('mouseenter', () => {
        gsap.to(galleryItem, { hoverValue: 1.0, duration: 0.8, ease: 'power2.out', onUpdate: () => {
          hoverValue = galleryItem.hoverValue;
        }});
        gsap.to(canvas, { scale: 1.05, duration: 0.8, ease: 'power2.out' });
        
        // Typing effect
        if (quoteP) {
           quoteP.style.opacity = '1';
           gsap.to(quoteP.querySelectorAll('span'), {
              opacity: 1,
              stagger: 0.02,
              duration: 0.1,
              ease: 'none',
              overwrite: true
           });
        }
      });

      galleryItem.addEventListener('mouseleave', () => {
        gsap.to(galleryItem, { hoverValue: 0.0, duration: 1.2, ease: 'power3.out', onUpdate: () => {
          hoverValue = galleryItem.hoverValue;
        }});
        gsap.to(canvas, { scale: 1.0, duration: 1.2, ease: 'power3.out' });
        
        // Hide typing
        if (quoteP) {
           gsap.to(quoteP.querySelectorAll('span'), {
              opacity: 0,
              stagger: 0.005,
              duration: 0.1,
              ease: 'none',
              overwrite: true
           });
        }
      });
    }

    // Render loop
    let startTime = performance.now();
    let animationFrameId;

    const render = () => {
      const time = (performance.now() - startTime) * 0.001;
      
      gl.useProgram(program);
      gl.uniform1f(timeLocation, time);
      gl.uniform1f(hoverLocation, hoverValue);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Cleanup on Barba leave (if needed)
    img.cleanupWebGL = () => {
       cancelAnimationFrame(animationFrameId);
       window.removeEventListener('resize', resize);
    };
  });
}
