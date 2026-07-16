import Lenis from 'lenis';
import { animate, createTimeline, stagger, splitText, utils } from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initWebGLBackground } from './webgl.js';
import barba from '@barba/core';

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

// --- Image Trail Effect Arrays ---
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

// --- PRELOADER LOGIC (Runs only on initial load) ---
let initialLoadComplete = false;
function initPreloader() {
  const loader = document.getElementById('lilith-loader');
  if (!loader) {
    initialLoadComplete = true;
    return;
  }
  
  lenis.stop();
  const eye = loader.querySelector('.loader-red-eye');
  const texts = loader.querySelectorAll('.loader-txt');
  const gif = loader.querySelector('.loader-gif');
  const percentageEl = loader.querySelector('.loader-percentage');
  
  const heroH1 = document.querySelector('.hero-main-title');
  const heroSub = document.querySelector('.hero-subtitle');
  if (heroH1) heroH1.style.opacity = '0';
  if (heroSub) heroSub.style.opacity = '0';

  const htmlImages = Array.from(document.querySelectorAll('img')).map(img => img.src);
  const allImagesToLoad = [...htmlImages, ...trailImages];
  const uniqueImages = [...new Set(allImagesToLoad)].filter(src => src);

  let loadedCount = 0;
  const totalImages = uniqueImages.length || 1;
  const progressObj = { value: 0 };
  let isExiting = false;

  const exitTl = gsap.timeline({ 
    paused: true, 
    onComplete: () => {
      loader.style.display = 'none';
      lenis.start();
      initialLoadComplete = true;
      
      // Awwards Hero Text Reveal
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
      
      const audio = document.getElementById('bg-audio');
      const soundBtn = document.querySelector('.sound-toggle');
      if (audio && soundBtn) {
        audio.play().then(() => {
          soundBtn.classList.add('playing');
          soundBtn.querySelector('.sound-text').textContent = 'SOUND ON';
        }).catch(() => {});
      }
    }
  });

  exitTl.to(percentageEl, { opacity: 0, scale: 1.5, filter: 'blur(10px)', duration: 0.4 })
        .to(texts[2], { opacity: 1, scale: 1.2, duration: 0.6, ease: 'back.out(2)' })
        .to(texts[2], { x: () => Math.random()*20-10, y: () => Math.random()*20-10, color: '#ffffff', duration: 0.05, yoyo: true, repeat: 10 }) 
        .to(gif, { opacity: 1, filter: 'contrast(300%) hue-rotate(90deg)', duration: 0.05, yoyo: true, repeat: 10 }, '<')
        .to(eye, { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' })
        .to(eye, { scale: 200, duration: 1.0, ease: 'power4.in' }, '-=0.1')
        .to(loader, { opacity: 0, filter: 'blur(20px)', duration: 0.6, ease: 'power2.out' });

  function updateProgress() {
    loadedCount++;
    const targetPercent = Math.round((loadedCount / totalImages) * 100);
    const dynamicDuration = ((targetPercent - progressObj.value) / 100) * 3.5;
    
    gsap.to(progressObj, {
      value: targetPercent,
      duration: Math.max(0.1, dynamicDuration),
      ease: 'power1.out',
      overwrite: true,
      onUpdate: () => {
        percentageEl.textContent = Math.round(progressObj.value) + '%';
      },
      onComplete: () => {
        if (Math.round(progressObj.value) === 100 && !isExiting) {
          isExiting = true;
          setTimeout(() => {
            gsap.killTweensOf(gif);
            gsap.killTweensOf(texts[0]);
            gsap.set(texts[0], { opacity: 0 });
            exitTl.play();
          }, 400);
        }
      }
    });
  }

  if (uniqueImages.length === 0) {
    updateProgress();
  } else {
    gsap.to(gif, { opacity: 0.2, duration: 0.1, yoyo: true, repeat: -1 });
    gsap.to(texts[0], { opacity: 1, duration: 0.1, yoyo: true, repeat: -1 }); 
    uniqueImages.forEach(src => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.src = src;
    });
  }
}
initPreloader();

// --- GLOBALS ---
const cursor = document.querySelector('.cursor');
const cursorText = document.querySelector('.cursor-text');
window.addEventListener('mousemove', (e) => {
  if(cursor) cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

const bgAudio = document.getElementById('bg-audio');
const soundToggle = document.querySelector('.sound-toggle');
const soundText = document.querySelector('.sound-text');
if (bgAudio && soundToggle && soundText) {
  bgAudio.volume = 0.4;
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

// --- STATE FOR CURRENT PAGE ---
let scatterIntervalId = null;
let currentScrollHandler = null;
let pageObserver = null;

function cleanupPageAnimations() {
  if (pageObserver) {
    pageObserver.disconnect();
    pageObserver = null;
  }
  if (currentScrollHandler) {
    lenis.off('scroll', currentScrollHandler);
    currentScrollHandler = null;
  }
  
  if (window.extremeIntervals) {
    window.extremeIntervals.forEach(id => clearInterval(id));
    window.extremeIntervals = [];
  }

  if (scatterIntervalId) {
    clearInterval(scatterIntervalId);
    scatterIntervalId = null;
  }
  ScrollTrigger.getAll().forEach(t => t.kill());
}

function initPageAnimations(container) {
  // 1. Hover effects
  container.querySelectorAll('a, button, h1, h2, h3').forEach(el => {
    el.addEventListener('mouseenter', () => cursor && cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('active'));
  });

  container.querySelectorAll('.hover-explore').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if(cursor) { cursor.classList.add('explore'); cursorText.innerText = 'EXPLORE'; }
    });
    el.addEventListener('mouseleave', () => {
      if(cursor) cursor.classList.remove('explore');
    });
  });

  container.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      const inner = btn.querySelector('.magnetic-inner');
      if (inner) inner.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      if(cursor) cursor.classList.add('magnetic-active');
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      const inner = btn.querySelector('.magnetic-inner');
      if (inner) inner.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.5s ease-out';
      if (inner) inner.style.transition = 'transform 0.5s ease-out';
      if(cursor) cursor.classList.remove('magnetic-active');
      setTimeout(() => {
        btn.style.transition = '';
        if (inner) inner.style.transition = '';
      }, 500);
    });
  });

  // 2. Image Trail Effect
  const trailContainer = container.querySelector('.image-trail-container');
  if (trailContainer) {
    const totalImages = 40;
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
      img.style.filter = 'brightness(0.5) sepia(0.3)';
      img.style.pointerEvents = 'auto'; 
      img.style.cursor = 'crosshair'; 
      img.style.left = `${Math.random() * 90}vw`; 
      img.style.top = `${Math.random() * 90}vh`;
      const rotation = (Math.random() * 50) - 25;
      img.dataset.rotation = rotation;
      img.style.transform = `scale(0.8) rotate(${rotation}deg)`;
      img.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      
      img.addEventListener('mouseenter', () => {
        img.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        img.style.opacity = '0.25';
        img.style.transform = `scale(1) rotate(${rotation}deg)`;
        clearTimeout(img.hideTimeout);
        img.hideTimeout = setTimeout(() => {
          img.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-in';
          img.style.opacity = '0';
          img.style.transform = `scale(0.8) rotate(${rotation}deg)`;
        }, 400);
      });
      trailContainer.appendChild(img);
    }
  }

  // 3. Scroll Tracking
  const heroSection = container.querySelector('#hero');
  const mysterySection = container.querySelector('#mystery');
  const revealImg = container.querySelector('.reveal-img');

  currentScrollHandler = () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    if (heroSection) {
      const heroProgress = Math.max(0, Math.min(1, scrollY / (heroSection.offsetHeight - vh)));
      if (heroProgress >= 0 && heroProgress <= 1) {
        const heroTitle = heroSection.querySelector('.hero-titles');
        if (heroTitle) {
          heroTitle.style.transform = `translate(-50%, -50%) scale(${1 + heroProgress * 0.5}) translateY(${heroProgress * 100}px)`;
          heroTitle.style.opacity = 1 - (heroProgress * 1.5);
        }
      }
    }
    if (mysterySection && revealImg) {
      const mysteryOffset = mysterySection.offsetTop;
      if (scrollY > mysteryOffset - vh) {
        const mystProgress = Math.max(0, Math.min(1, (scrollY - mysteryOffset + vh / 2) / vh));
        revealImg.style.transform = `scale(${1.2 - mystProgress * 0.2})`;
        revealImg.style.filter = `sepia(${0.8 - mystProgress*0.8}) hue-rotate(${-30 + mystProgress*30}deg) saturate(${2 - mystProgress})`;
      }
    }
  };
  lenis.on('scroll', currentScrollHandler);

  // 4. GSAP Horizontal Scroll Gallery
  const gallerySection = container.querySelector('#gallery');
  const galleryTrack = container.querySelector('.gallery-track');
  if (galleryTrack && gallerySection) {
    gsap.to(galleryTrack, {
      x: () => -(galleryTrack.scrollWidth - window.innerWidth) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: gallerySection,
        start: "top top",
        end: () => "+=" + (galleryTrack.scrollWidth - window.innerWidth),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }

  // 5. Text Animation Character
  const charTextContainer = container.querySelector('.gsap-text-container');
  if (charTextContainer) {
    const title = charTextContainer.querySelector('.gsap-title');
    const desc = charTextContainer.querySelector('.gsap-desc');
    if (title && desc) {
      const text = title.textContent;
      title.innerHTML = text.split('').map(char => char === ' ' ? '&nbsp;' : `<span class="gsap-char" style="display:inline-block;">${char}</span>`).join('');
      const descText = desc.textContent.trim().split(' ');
      desc.innerHTML = descText.map(word => `<span class="gsap-word" style="display:inline-block; margin-right:5px;">${word}</span>`).join('');
      const chars = title.querySelectorAll('.gsap-char');
      const words = desc.querySelectorAll('.gsap-word');
      gsap.set(chars, { opacity: 0, y: 50, rotationX: -90, z: -100 });
      gsap.set(words, { opacity: 0, y: 20, filter: 'blur(5px)' });
      
      const textTl = gsap.timeline({ repeat: -1, repeatDelay: 3, yoyo: true });
      textTl.to(chars, { opacity: 1, y: 0, rotationX: 0, z: 0, duration: 1, stagger: { amount: 0.8, from: 'random' }, ease: 'back.out(2)' })
            .to(chars, { color: '#ffffff', textShadow: '0 0 30px #ffffff, 0 0 60px #ffffff', duration: 0.15, yoyo: true, repeat: 1, stagger: 0.05 }, '-=0.5')
            .to(words, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.05, ease: 'power2.out' }, '-=0.8');
    }
  }

  // 6. Init Scattered Text (YES / NO Loop)
  const mysteryContent = container.querySelector('.mystery-content');
  if (mysteryContent) {
    const numTexts = 8; 
    const texts = [];
    const shapes = [];
    function attachLinesToText(textElement, count) {
      for (let i = 0; i < count; i++) {
        const line = document.createElement('div');
        const type = Math.random();
        if (type > 0.6) line.className = 'glitch-line red flicker-text';
        else if (type > 0.3) line.className = 'glitch-line dark flicker-text';
        else line.className = 'glitch-line flicker-text';
        line.style.animationDelay = (Math.random() * 3) + 's';
        line.style.top = Math.random() * 100 + '%';
        textElement.appendChild(line);
        shapes.push(line);
      }
    }
    for (let i = 0; i < numTexts; i++) {
      const el = document.createElement('div');
      const word = i % 2 === 0 ? 'YES' : 'NO';
      el.className = 'scatter-text glitch-core flicker-text';
      el.textContent = word;
      el.setAttribute('data-text', word);
      el.style.top = Math.random() * 80 + 10 + '%';
      el.style.left = Math.random() * 80 + 10 + '%';
      el.style.animationDelay = (Math.random() * 3) + 's';
      attachLinesToText(el, 3);
      mysteryContent.appendChild(el);
      texts.push(el);
    }
    const giantText = mysteryContent.querySelector('.giant-text');
    if (giantText) attachLinesToText(giantText, 8);
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('div');
      const type = Math.random();
      if (type > 0.6) el.className = 'glitch-square red flicker-text';
      else if (type > 0.3) el.className = 'glitch-square dark flicker-text';
      else el.className = 'glitch-square flicker-text';
      el.style.animationDelay = (Math.random() * 3) + 's';
      mysteryContent.appendChild(el);
      shapes.push(el);
    }
    const giantTextToDistort = mysteryContent.querySelector('.giant-text');
    scatterIntervalId = setInterval(() => {
      if (giantTextToDistort) {
        const skew = Math.random() * 30 - 15;
        const scale = 0.9 + Math.random() * 0.2;
        const xOffset = Math.random() * 10 - 5;
        giantTextToDistort.style.transform = `skewX(${skew}deg) scale(${scale}) translateX(${xOffset}px)`;
      }
      texts.forEach(el => {
        el.style.left = Math.random() * 80 + 10 + '%';
        el.style.top = Math.random() * 80 + 10 + '%';
        const rot = Math.random() * 40 - 20;
        const skew = Math.random() * 20 - 10;
        el.style.transform = `rotate(${rot}deg) skewX(${skew}deg) scale(${0.8 + Math.random() * 0.5})`;
      });
      shapes.forEach(el => {
        if (el.classList.contains('glitch-square')) {
          el.style.top = Math.random() * 100 + '%';
          el.style.left = Math.random() * 100 + '%';
          el.style.transform = `rotate(45deg) scale(${0.5 + Math.random() * 1.5})`;
        } else {
          el.style.top = Math.random() * 100 + '%'; 
          el.style.left = (Math.random() * 40 - 20) + '%'; 
          el.style.width = (Math.random() * 80 + 40) + '%'; 
          el.style.transform = `scaleY(${Math.random() * 3})`; 
        }
      });
    }, 1000);
  }

  
  // --- EXTREME GLITCH LOGIC (Generic) ---
  const extremeGlitches = document.querySelectorAll('.extreme-glitch');
  extremeGlitches.forEach(el => {
    if (el.dataset.glitched) return; // Prevent duplicate lines on Barba transition
    el.dataset.glitched = 'true';
    
    // Attach lines
    for (let i = 0; i < 8; i++) {
      const line = document.createElement('div');
      const type = Math.random();
      if (type > 0.6) line.className = 'glitch-line red flicker-text';
      else if (type > 0.3) line.className = 'glitch-line dark flicker-text';
      else line.className = 'glitch-line flicker-text';
      line.style.animationDelay = (Math.random() * 3) + 's';
      line.style.top = Math.random() * 100 + '%';
      el.appendChild(line);
    }
  });

  if (extremeGlitches.length > 0) {
    const extremeIntervalId = setInterval(() => {
      extremeGlitches.forEach(el => {
        const skew = Math.random() * 40 - 20; // -20 to 20
        const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
        const xOffset = Math.random() * 20 - 10;
        const yOffset = Math.random() * 10 - 5;
        el.style.transform = `skewX(${skew}deg) scale(${scale}) translate(${xOffset}px, ${yOffset}px)`;
        
        // Randomize the lines inside to make them messy!
        const lines = el.querySelectorAll('.glitch-line');
        lines.forEach(line => {
          line.style.top = Math.random() * 100 + '%'; 
          line.style.left = (Math.random() * 40 - 20) + '%'; 
          line.style.width = (Math.random() * 80 + 40) + '%'; 
          line.style.transform = `scaleY(${Math.random() * 3})`; 
        });
      });
    }, 150); // very fast aggressive glitch!
    
    // Store it so we can clear it on transition
    if (!window.extremeIntervals) window.extremeIntervals = [];
    window.extremeIntervals.push(extremeIntervalId);
  }

  // 7. Monologue Animation
  const monoLines = container.querySelectorAll('.mono-line');
  const monoAuthor = container.querySelector('.mono-author');
  if (monoLines.length > 0) {
    const monoTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.querySelector('.monologue'),
        start: 'top 50%',
        end: 'bottom 80%',
        scrub: 1
      }
    });
    monoTl.to(monoLines, { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.5 });
    if (monoAuthor) {
      gsap.to(monoAuthor, {
        opacity: 1, x: 0, filter: 'blur(0px)',
        scrollTrigger: {
          trigger: container.querySelector('.monologue'),
          start: 'bottom 90%',
          end: 'bottom 70%',
          scrub: 1
        }
      });
    }
  }

  // 8. Flashlight Secret Section
  const secretSection = container.querySelector('.secret');
  if (secretSection) {
    secretSection.addEventListener('mousemove', (e) => {
      const rect = secretSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      secretSection.style.setProperty('--mouse-x', `${x}px`);
      secretSection.style.setProperty('--mouse-y', `${y}px`);
    });
    secretSection.addEventListener('mouseenter', () => { if (cursor) cursor.classList.add('hidden'); });
    secretSection.addEventListener('mouseleave', () => { if (cursor) cursor.classList.remove('hidden'); });
  }

  // 9. Text Splitting Preparation
  container.querySelectorAll('.split-target').forEach(el => {
    splitText(el, { words: false, chars: true });
    const chars = el.querySelectorAll('span');
    chars.forEach(char => {
      char.style.opacity = '0';
      char.style.transform = 'translateY(100px) rotate(10deg)';
    });
  });

  container.querySelectorAll('.game-title .border-frame, .game-title .word-the, .game-title .red-slash, .game-title .glitch-text, .game-title .word-of, .game-title .red-and').forEach(el => {
    el.style.opacity = '0';
  });

  // 10. Intersection Observer
  pageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        if (target.classList.contains('split-target')) {
           const chars = target.querySelectorAll('span');
           animate(chars, { y: [100, 0], rotate: [10, 0], opacity: [0, 1], delay: stagger(30, { start: 100 }), duration: 1200, ease: 'outExpo' });
           pageObserver.unobserve(target);
        }
        if (target.classList.contains('game-title') && !target.dataset.animated) {
           target.dataset.animated = 'true';
           const tl = createTimeline({ loop: false }); 
           tl.add('.border-frame', { scale: [0.9, 1], opacity: [0, 1], duration: 800, ease: 'easeOutElastic(1, .8)' })
             .add('.word-the', { opacity: [0, 1], translateX: ['-50%', '-50%'], translateY: [-20, 0], duration: 400, ease: 'outExpo' }, '-=400')
             .add('.red-slash', { opacity: [0, 1], scale: [1.5, 1], duration: 600, ease: 'outExpo', delay: stagger(200) }, '-=200')
             .add('.glitch-text', { opacity: [0, 1], skewX: [20, 0], duration: 500, ease: 'outExpo', delay: stagger(100) }, '-=400')
             .add('.word-of, .red-and', { opacity: [0, 1], scale: [0.5, 1], duration: 400, ease: 'outBack', delay: stagger(100) }, '-=200');
           pageObserver.unobserve(target);
        }
        if (target.classList.contains('fade-target')) {
           target.style.opacity = '0'; 
           animate(target, { opacity: [0, 1], y: [40, 0], duration: 1200, delay: 200, ease: 'outCirc' });
           pageObserver.unobserve(target);
        }
      }
    });
  }, { threshold: 0.1 });
  
  container.querySelectorAll('.split-target, .fade-target, .game-title').forEach(el => pageObserver.observe(el));
}

// --- BARBA TRANSITIONS ---
barba.init({
  transitions: [{
    name: 'glitch-transition',
    leave(data) {
      cleanupPageAnimations();
      return new Promise(resolve => {
        const tl = gsap.timeline({ onComplete: resolve });
        tl.to('.page-transition-layer', { y: '0%', duration: 0.5, ease: 'power3.inOut' })
          .to('.transition-glitch-text', { opacity: 1, duration: 0.1, yoyo: true, repeat: 3 }, '+=0');
      });
    },
    enter(data) {
      lenis.scrollTo(0, { immediate: true });
      initPageAnimations(data.next.container);
      
      gsap.to('.page-transition-layer', { 
         y: '-100%', 
         duration: 0.5, 
         delay: 0.3, // Brief pause for suspense
         ease: 'power3.inOut',
         onComplete: () => {
            gsap.set('.page-transition-layer', { y: '100%' });
            gsap.set('.transition-glitch-text', { opacity: 0 });
         }
      });
    }
  }]
});

// Initial run
initPageAnimations(document.body);
