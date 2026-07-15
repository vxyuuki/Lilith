import { animate } from 'animejs';

const trailImages = [
  './Image/125966425_p0.png',
  './Image/135330897_p0.jpg',
  './Image/137053802_p2.png',
  './Image/140460103_p0.jpg',
  './Image/146911000_p0.png',
  './Image/Lilith(2).png',
  './Image/Lilith(5).png',
  './Image/Lilith(6).png',
  './Image/Lilith5.png'
];

const trailContainer = document.querySelector('.image-trail-container');
let globalIndex = 0;
let lastMousePos = { x: 0, y: 0 };

if (trailContainer) {
  window.addEventListener('mousemove', (e) => {
    const mousePos = { x: e.clientX, y: e.clientY };
    const distance = Math.hypot(mousePos.x - lastMousePos.x, mousePos.y - lastMousePos.y);
    
    if (distance > 30) {
      lastMousePos = mousePos;
      
      const img = document.createElement('img');
      img.classList.add('trail-img');
      img.src = trailImages[globalIndex % trailImages.length];
      
      const scaleBase = (Math.random() * 0.6) + 0.5; 
      const width = 150 * scaleBase;
      const height = 200 * scaleBase;
      
      img.style.width = `${width}px`;
      img.style.height = `${height}px`;
      img.style.left = `${mousePos.x - (width / 2)}px`;
      img.style.top = `${mousePos.y - (height / 2)}px`;
      
      // Fallback display in case Anime.js fails
      img.style.opacity = '1'; 
      img.style.backgroundColor = '#e11d48'; // red fallback
      
      trailContainer.appendChild(img);
      
      const rotation = (Math.random() * 60) - 30;
      
      try {
        img.style.opacity = '0'; // reset for animation
        animate(img, {
          opacity: [0, 1],
          scale: [0.5, 1],
          rotate: [rotation - 15, rotation],
          duration: 400,
          complete: () => {
            // Using setTimeout instead of Anime.js delay to isolate bugs
            setTimeout(() => {
              animate(img, {
                opacity: 0,
                scale: 0.8,
                duration: 800,
                complete: () => {
                  if (img.parentNode) img.remove();
                }
              });
            }, 1500);
          }
        });
      } catch (err) {
        console.error("Anime.js Animation Error:", err);
        // Pure JS fallback if animate() fails
        img.style.opacity = '1';
        img.style.transform = `scale(1) rotate(${rotation}deg)`;
        img.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
          img.style.opacity = '0';
          setTimeout(() => img.remove(), 800);
        }, 1500);
      }
      
      globalIndex++;
    }
  });
}
