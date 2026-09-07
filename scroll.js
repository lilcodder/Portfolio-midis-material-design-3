// scroll.js
const primary = document.querySelector('.primary_text');
const secondary = document.querySelector('.secondary_text');
const tretiary = document.querySelector('.tretiary_text');
const bottomElements = document.querySelector('.bottom_elements');
const md3Deco = document.querySelector('.md3__deco');

// Находим сами кляксы, чтобы управлять их вращением
const sh5 = document.querySelector('.sh5');
const sh12 = document.querySelector('.sh12');

const SCROLL_DISTANCE = 350; 

let targetScroll = 0;  
let currentScroll = 0; 

window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
});

function render() {
    currentScroll += (targetScroll - currentScroll) * 0.08;
    let progress = Math.min(currentScroll / SCROLL_DISTANCE, 1);

    // === 1. ФИО ===
    let scale1 = 1 - (0.55 * progress); 
    let moveX1 = -190 * progress; 
    let moveY1 = -310 * progress; 

    // === 2. ГРУППА ===
    let scale2 = 1 - (0.45 * progress); 
    let moveX2 = 220 * progress;  
    let moveY2 = -395 * progress; 

    // === 3. ПОРТФОЛИО СТУДЕНТА ===
    let scale3 = 1 - (0.45 * progress);
    let moveX3 = 0; 
    let moveY3 = -430 * progress; 

    // Применяем математику
    if (primary) primary.style.transform = `translate(${moveX1}px, ${moveY1}px) scale(${scale1})`;
    if (secondary) secondary.style.transform = `translate(${moveX2}px, ${moveY2}px) scale(${scale2})`;
    if (tretiary) tretiary.style.transform = `translate(${moveX3}px, ${moveY3}px) scale(${scale3})`;
    
    // Прозрачность элементов
    if (bottomElements) {
        bottomElements.style.opacity = Math.max(1 - progress * 3, 0);
    }
    if (md3Deco) {
        md3Deco.style.opacity = 1 - (0.5 * progress);
    }

    // === ПЛАВНАЯ ОСТАНОВКА КЛЯКС ===
    // Высчитываем скорость: 1 - это нормальная скорость, 0 - полная остановка
    let currentPlaybackRate = Math.max(0, 1 - progress);
    
    // Применяем скорость ко всем запущенным анимациям на элементах
    if (sh5) {
        sh5.getAnimations().forEach(anim => anim.playbackRate = currentPlaybackRate);
    }
    if (sh12) {
        sh12.getAnimations().forEach(anim => anim.playbackRate = currentPlaybackRate);
    }

    requestAnimationFrame(render);
}

render();