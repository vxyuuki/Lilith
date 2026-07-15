import Lenis from 'lenis';
import { animate, createTimeline, stagger, splitText, utils } from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initWebGLBackground } from './webgl.js';

gsap.registerPlugin(ScrollTrigger);

// Initialize WebGL Background
initWebGLBackground();

// 1. Smooth Scroll Setup (Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- PRELOADER LOGIC ---
// Prevent scrolling during preload
lenis.stop();

const loader = document.getElementById('lilith-loader');
if (loader) {
  const eye = loader.querySelector('.loader-red-eye');
  const texts = loader.querySelectorAll('.loader-txt');
  const gif = loader.querySelector('.loader-gif');
  
  // Prepare hero text for after-load animation
  const heroH1 = document.querySelector('.hero-main-title');
  const heroSub = document.querySelector('.hero-subtitle');
  if (heroH1) heroH1.style.opacity = '0';
  if (heroSub) heroSub.style.opacity = '0';

  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = 'none';
      lenis.start(); // Allow scrolling
      
      // --- AWWARDS STYLE TEXT REVEAL (Hero) ---
        if (heroH1 && heroSub) {
          heroH1.style.opacity = '1';
          splitText(heroH1, { chars: true });
          const chars = heroH1.querySelectorAll('span');
          chars.forEach(c => { 
            c.style.display = 'inline-block'; 
            c.style.opacity = '0';
          });
          
          animate(chars, {
            translateY: [100, 0],
            translateZ: [400, 0],
            rotateX: [-90, 0],
            opacity: [0, 1],
            filter: ['blur(10px)', 'blur(0px)'],
            duration: 1200,
            delay: stagger(60),
            ease: 'outExpo'
          });
          
          animate(heroSub, {
            opacity: [0, 1],
            letterSpacing: ['1em', '0.5em'],
            filter: ['blur(10px)', 'blur(0px)'],
            duration: 1500,
            delay: 800,
            ease: 'outQuart'
          });
        }
        
        // Try autoplaying audio when loader finishes
        const audio = document.getElementById('bg-audio');
        const soundBtn = document.querySelector('.sound-toggle');
        if (audio && soundBtn) {
          audio.play().then(() => {
            soundBtn.classList.add('playing');
            soundBtn.querySelector('.sound-text').textContent = 'SOUND ON';
          }).catch(() => {
            console.log("Autoplay blocked. User needs to click SOUND OFF to play.");
          });
        }
    }
  });

  // --- LILITH PRELOADER ANIMATION SEQUENCE (5 Seconds) ---
  
  // 1. Rapid text flashes (MENCARI MEMORI...) - flashes 6 times total
  tl.to(texts[0], { opacity: 1, duration: 0.1, yoyo: true, repeat: 5 })
  // GIF starts flickering weakly here
  .to(gif, { opacity: 0.3, duration: 0.05, yoyo: true, repeat: 11 }, '<')
  
  // 2. (MENEMUKAN ENTITAS...) - flashes 6 times total
  .to(texts[1], { opacity: 1, duration: 0.1, yoyo: true, repeat: 5 })
  // GIF flickers harder and inverts colors!
  .to(gif, { opacity: 0.6, filter: 'invert(1) grayscale(100%)', duration: 0.05, yoyo: true, repeat: 11 }, '<')
  
  // 3. LILITH appears majestically then violently glitches
  .to(texts[2], { opacity: 1, scale: 1.2, duration: 0.6, ease: 'back.out(2)' })
  // Violent glitch shake + flashing white for ~0.5s
  .to(texts[2], { x: () => Math.random()*20-10, y: () => Math.random()*20-10, color: '#ffffff', duration: 0.05, yoyo: true, repeat: 10 }) 
  // GIF goes completely berserk with contrast and rotation
  .to(gif, { opacity: 1, filter: 'contrast(300%) hue-rotate(90deg)', duration: 0.05, yoyo: true, repeat: 10 }, '<')
  
  // 4. The red eye suddenly appears at the very end...
  .to(eye, { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' })
  // 5. ...and explodes massively to swallow the screen
  .to(eye, { scale: 200, duration: 1.0, ease: 'power4.in' }, '-=0.1')
  
  // 6. The red void elegantly dissolves into the website
  .to(loader, { opacity: 0, filter: 'blur(20px)', duration: 0.6, ease: 'power2.out' });
}

// --- Image Trail Effect ---
const trailImages = [
  '/Image/125966425_p0.png',
  '/Image/135330897_p0.jpg',
  '/Image/137053802_p2.png',
  '/Image/140460103_p0.jpg',
  '/Image/146911000_p0.png',
  '/Image/kosong.png',
  '/Image/Lilith(2).png',
  '/Image/Lilith(5).png',
  '/Image/Lilith(6).png'
];

const trailContainer = document.querySelector('.image-trail-container');

if (trailContainer) {
  // 1. Generate Hidden Interactive Collage
  const totalImages = 40; // Increased density so the screen is packed
  
  for (let i = 0; i < totalImages; i++) {
    const img = document.createElement('img');
    img.src = trailImages[i % trailImages.length];
    
    const width = 120 + (Math.random() * 180);
    const height = width * (1.1 + Math.random() * 0.4);
    
    img.style.position = 'absolute';
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
    img.style.objectFit = 'cover';
    img.style.borderRadius = '12px';
    img.style.boxShadow = '0 15px 40px rgba(0,0,0,0.6)';
    img.style.opacity = '0';
    img.style.filter = 'brightness(0.5) sepia(0.3)'; // Make images dark and moody
    
    // Make them detect mouse interactions
    img.style.pointerEvents = 'auto'; 
    img.style.cursor = 'crosshair'; // subtle interaction hint
    
    // Random positions covering the whole hero section
    img.style.left = `${Math.random() * 90}vw`; 
    img.style.top = `${Math.random() * 90}vh`;
    
    const rotation = (Math.random() * 50) - 25;
    img.dataset.rotation = rotation; // Store for animation
    
    img.style.transform = `scale(0.8) rotate(${rotation}deg)`;
    img.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    
    // 2. Interactive Hover Reveal Logic
    img.addEventListener('mouseenter', () => {
      // Reveal dark memory
      img.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
      img.style.opacity = '0.25';
      img.style.transform = `scale(1) rotate(${rotation}deg)`;
      
      // Auto-hide when mouse leaves or shortly after
      clearTimeout(img.hideTimeout);
      img.hideTimeout = setTimeout(() => {
        img.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-in';
        img.style.opacity = '0';
        img.style.transform = `scale(0.8) rotate(${rotation}deg)`;
      }, 400); // Wait 0.4s before fading back to darkness
    });
    
    trailContainer.appendChild(img);
  }
}

// 2. Custom Cursor (Interactive Element)
const cursor = document.querySelector('.cursor');
const cursorText = document.querySelector('.cursor-text');

window.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

// Hover effect for basic cursor
document.querySelectorAll('a, button, h1, h2, h3').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Advanced Cursor Logic (Explore Hover)
document.querySelectorAll('.hover-explore').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('explore');
    cursorText.innerText = 'EXPLORE';
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('explore');
  });
});

// Magnetic Buttons
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Move the button itself slightly
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    // Move the inner text slightly more for depth
    btn.querySelector('.magnetic-inner').style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    
    // Shrink cursor
    cursor.classList.add('magnetic-active');
  });
  
  btn.addEventListener('mouseleave', () => {
    // Reset positions smoothly
    btn.style.transform = 'translate(0px, 0px)';
    btn.querySelector('.magnetic-inner').style.transform = 'translate(0px, 0px)';
    btn.style.transition = 'transform 0.5s ease-out';
    btn.querySelector('.magnetic-inner').style.transition = 'transform 0.5s ease-out';
    
    cursor.classList.remove('magnetic-active');
    
    // Remove transition after it completes to allow instant tracking again
    setTimeout(() => {
      btn.style.transition = '';
      btn.querySelector('.magnetic-inner').style.transition = '';
    }, 500);
  });
});

// --- AUDIO CONTROL ---
const bgAudio = document.getElementById('bg-audio');
const soundToggle = document.querySelector('.sound-toggle');
const soundText = document.querySelector('.sound-text');

if (bgAudio && soundToggle && soundText) {
  bgAudio.volume = 0.4; // Soft background ambient volume
  
  soundToggle.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play();
      soundToggle.classList.add('playing');
      soundText.textContent = 'SOUND ON';
    } else {
      bgAudio.pause();
      soundToggle.classList.remove('playing');
      soundText.textContent = 'SOUND OFF';
    }
  });
}

// --- Flashlight Secret Section ---
const secretSection = document.querySelector('.secret');
if (secretSection) {
  secretSection.addEventListener('mousemove', (e) => {
    const rect = secretSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    secretSection.style.setProperty('--mouse-x', `${x}px`);
    secretSection.style.setProperty('--mouse-y', `${y}px`);
  });
}

// --- Monologue Animation ---
const monoLines = document.querySelectorAll('.mono-line');
const monoAuthor = document.querySelector('.mono-author');

if (monoLines.length > 0) {
  // Stagger fade up each line
  gsap.fromTo(monoLines, 
    { opacity: 0, y: 30, filter: 'blur(5px)' },
    { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      stagger: 1.5, // 1.5 multiplier on scrub time
      scrollTrigger: {
        trigger: '.monologue',
        start: 'top 50%',
        end: 'bottom 80%',
        scrub: 1 // smooth scrubbing
      }
    }
  );
  
  if (monoAuthor) {
    gsap.fromTo(monoAuthor,
      { opacity: 0, x: -20, filter: 'blur(5px)' },
      {
        opacity: 1, x: 0, filter: 'blur(0px)',
        scrollTrigger: {
          trigger: '.monologue',
          start: 'bottom 90%',
          end: 'bottom 70%',
          scrub: 1
        }
      }
    );
  }
}

// 3. Text Splitting Preparation (Original elements)
document.querySelectorAll('.split-target').forEach(el => {
  splitText(el, { words: false, chars: true });
  const chars = el.querySelectorAll('span');
  chars.forEach(char => {
    char.style.opacity = '0';
    char.style.transform = 'translateY(100px) rotate(10deg)';
  });
});

// Initialize Game Title Art
document.querySelectorAll('.game-title .border-frame, .game-title .word-the, .game-title .red-slash, .game-title .glitch-text, .game-title .word-of, .game-title .red-and').forEach(el => {
  el.style.opacity = '0';
});

// 4. Viewport Detection (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      
      // Animate split text
      if (target.classList.contains('split-target')) {
         const chars = target.querySelectorAll('span');
         animate(chars, {
           y: [100, 0],
           rotate: [10, 0],
           opacity: [0, 1],
           delay: stagger(30, { start: 100 }),
           duration: 1200,
           ease: 'outExpo'
         });
         observer.unobserve(target);
      }
      
      // Animate Game Title
      if (target.classList.contains('game-title') && !target.dataset.animated) {
         target.dataset.animated = 'true';
         
         const tl = createTimeline({ loop: false }); 
         
         tl.add('.border-frame', {
           scale: [0.9, 1],
           opacity: [0, 1],
           duration: 800,
           ease: 'easeOutElastic(1, .8)'
         })
         .add('.word-the', { opacity: [0, 1], translateX: ['-50%', '-50%'], translateY: [-20, 0], duration: 400, ease: 'outExpo' }, '-=400')
         .add('.red-slash', { opacity: [0, 1], scale: [1.5, 1], duration: 600, ease: 'outExpo', delay: stagger(200) }, '-=200')
         .add('.glitch-text', { opacity: [0, 1], skewX: [20, 0], duration: 500, ease: 'outExpo', delay: stagger(100) }, '-=400')
         .add('.word-of, .red-and', { opacity: [0, 1], scale: [0.5, 1], duration: 400, ease: 'outBack', delay: stagger(100) }, '-=200');
         
         observer.unobserve(target);
      }

      
      // Animate basic fade elements (like paragraphs)
      if (target.classList.contains('fade-target')) {
         target.style.opacity = '0'; 
         animate(target, {
           opacity: [0, 1],
           y: [40, 0],
           duration: 1200,
           delay: 200,
           ease: 'outCirc'
         });
         observer.unobserve(target);
      }
    }
  });
}, { threshold: 0.1 });

// Observe elements
document.querySelectorAll('.split-target, .fade-target, .game-title').forEach(el => observer.observe(el));


// 5. Scroll Tracking (Parallax, Transforms, & Horizontal Scroll)
const heroSection = document.getElementById('hero');
const charSection = document.getElementById('character');
const gallerySection = document.getElementById('gallery');
const mysterySection = document.getElementById('mystery');

const revealImg = document.querySelector('.reveal-img');
const galleryTrack = document.querySelector('.gallery-track');

lenis.on('scroll', () => {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  
  // -- Hero Section Scroll Tracking --
  const heroProgress = Math.max(0, Math.min(1, scrollY / (heroSection.offsetHeight - vh)));
  if (heroProgress >= 0 && heroProgress <= 1) {
    const heroTitle = heroSection.querySelector('.hero-titles');
    
    if (heroTitle) {
      heroTitle.style.transform = `translate(-50%, -50%) scale(${1 + heroProgress * 0.5}) translateY(${heroProgress * 100}px)`;
      heroTitle.style.opacity = 1 - (heroProgress * 1.5);
    }
  }
  
  // -- Character Section Scroll Tracking (GSAP handles Parallax Cards now) --
  // Removed old manual parallax logic
  
  // -- Gallery Horizontal Scroll Tracking --
  const galleryOffset = gallerySection.offsetTop;
  if (scrollY >= galleryOffset && scrollY <= galleryOffset + gallerySection.offsetHeight - vh) {
    const galleryProgress = (scrollY - galleryOffset) / (gallerySection.offsetHeight - vh);
    const maxTranslate = galleryTrack.scrollWidth - vw;
    galleryTrack.style.transform = `translateX(${-galleryProgress * maxTranslate}px)`;
  } else if (scrollY < galleryOffset) {
    galleryTrack.style.transform = `translateX(0px)`;
  } else if (scrollY > galleryOffset + gallerySection.offsetHeight - vh) {
    const maxTranslate = galleryTrack.scrollWidth - vw;
    galleryTrack.style.transform = `translateX(${-maxTranslate}px)`;
  }
  
  // -- Mystery Section Scroll Tracking (Image Reveal) --
  const mysteryOffset = mysterySection.offsetTop;
  if (scrollY > mysteryOffset - vh) {
    const mystProgress = Math.max(0, Math.min(1, (scrollY - mysteryOffset + vh / 2) / vh));
    revealImg.style.transform = `scale(${1.2 - mystProgress * 0.2})`;
    revealImg.style.filter = `sepia(${0.8 - mystProgress*0.8}) hue-rotate(${-30 + mystProgress*30}deg) saturate(${2 - mystProgress})`;
  }
});



// 6. GSAP Text Animation for Character Section
const charTextContainer = document.querySelector('.gsap-text-container');
if (charTextContainer) {
  const title = charTextContainer.querySelector('.gsap-title');
  const desc = charTextContainer.querySelector('.gsap-desc');
  
  if (title && desc) {
    // Split title into individual spans
    const text = title.textContent;
    title.innerHTML = text.split('').map(char => {
      return char === ' ' ? '&nbsp;' : `<span class="gsap-char" style="display:inline-block;">${char}</span>`;
    }).join('');
    
    // Split description into individual words for animation
    const descText = desc.textContent.trim().split(' ');
    desc.innerHTML = descText.map(word => {
      return `<span class="gsap-word" style="display:inline-block; margin-right:5px;">${word}</span>`;
    }).join('');
    
    const chars = title.querySelectorAll('.gsap-char');
    const words = desc.querySelectorAll('.gsap-word');
    
    // Initial states
    gsap.set(chars, { opacity: 0, y: 50, rotationX: -90, z: -100 });
    gsap.set(words, { opacity: 0, y: 20, filter: 'blur(5px)' });
    
    // Infinite looping timeline with a pause for readability
    const textTl = gsap.timeline({
      repeat: -1, // Loop infinitely
      repeatDelay: 3, // Readability pause before it reverses
      yoyo: true // Reverses smoothly before starting again
    });
    
    // 1. Chaotic/Random Title Reveal (Cyber Matrix Style)
    textTl.to(chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      z: 0,
      duration: 1,
      stagger: {
        amount: 0.8,
        from: 'random' // Random letter pop in
      },
      ease: 'back.out(2)'
    })
    // 2. White Neon Flash on Title
    .to(chars, {
      color: '#ffffff',
      textShadow: '0 0 30px #ffffff, 0 0 60px #ffffff',
      duration: 0.15,
      yoyo: true, // flash back to original red
      repeat: 1,
      stagger: 0.05
    }, '-=0.5')
    // 3. Stagger Word Reveal for Description
    .to(words, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out'
    }, '-=0.8');
  }
}




// --- Init Scattered Text (YES / NO Loop) ---
function initScatteredText() {
  const mysteryContent = document.querySelector('.mystery-content');
  if (!mysteryContent) return;

  const numTexts = 8; // 4 YES, 4 NO
  const texts = [];
  const shapes = [];

  // Helper to add glitch lines to a text element
  function attachLinesToText(textElement, count) {
    for (let i = 0; i < count; i++) {
      const line = document.createElement('div');
      const type = Math.random();
      if (type > 0.6) {
        line.className = 'glitch-line red flicker-text';
      } else if (type > 0.3) {
        line.className = 'glitch-line dark flicker-text';
      } else {
        line.className = 'glitch-line flicker-text';
      }
      line.style.animationDelay = (Math.random() * 3) + 's';
      line.style.top = Math.random() * 100 + '%'; // Random vertical pos inside text
      textElement.appendChild(line);
      shapes.push(line);
    }
  }

  // 1. Create Texts
  for (let i = 0; i < numTexts; i++) {
    const el = document.createElement('div');
    const word = i % 2 === 0 ? 'YES' : 'NO';
    el.className = 'scatter-text glitch-core flicker-text';
    el.textContent = word;
    el.setAttribute('data-text', word);
    
    // Initial random position
    el.style.top = Math.random() * 80 + 10 + '%';
    el.style.left = Math.random() * 80 + 10 + '%';
    el.style.animationDelay = (Math.random() * 3) + 's';
    
    attachLinesToText(el, 3); // Attach 3 lines directly to each YES/NO
    
    mysteryContent.appendChild(el);
    texts.push(el);
  }

  // Attach lines to the main giant text too!
  const giantText = mysteryContent.querySelector('.giant-text');
  if (giantText) {
    attachLinesToText(giantText, 8);
  }

  // 2. Create Glitch Geometric Shapes
  for (let i = 0; i < 6; i++) {
    const el = document.createElement('div');
    const type = Math.random();
    if (type > 0.6) {
      el.className = 'glitch-square red flicker-text';
    } else if (type > 0.3) {
      el.className = 'glitch-square dark flicker-text';
    } else {
      el.className = 'glitch-square flicker-text'; // Outline
    }
    
    el.style.animationDelay = (Math.random() * 3) + 's';
    mysteryContent.appendChild(el);
    shapes.push(el);
  }

  // Loop to change position every 1 second
  setInterval(() => {
    texts.forEach(el => {
      el.style.left = Math.random() * 80 + 10 + '%';
      el.style.top = Math.random() * 80 + 10 + '%';
      const rot = Math.random() * 20 - 10;
      el.style.transform = `rotate(${rot}deg) scale(${0.8 + Math.random() * 0.5})`;
    });

    shapes.forEach(el => {
      if (el.classList.contains('glitch-square')) {
        el.style.top = Math.random() * 100 + '%';
        el.style.left = Math.random() * 100 + '%';
        el.style.transform = `rotate(45deg) scale(${0.5 + Math.random() * 1.5})`;
      } else {
        // Horizontal tracking streak on text
        el.style.top = Math.random() * 100 + '%'; // move up and down on the text
        el.style.transform = `scaleY(${Math.random() * 2})`;
      }
    });
  }, 1000);
}

// Initialize the scatter text logic
initScatteredText();
