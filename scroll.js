const primary = document.querySelector('.primary_text');
const secondary = document.querySelector('.secondary_text');
const tretiary = document.querySelector('.tretiary_text');
const bottomElements = document.querySelector('.bottom_elements');
const md3Deco = document.querySelector('.md3__deco');

const sh5 = document.querySelector('.sh5');
const sh12 = document.querySelector('.sh12');

// Собираем все наши карточки
const allCards = document.querySelectorAll('.card');

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

    if (primary) primary.style.transform = `translate(${moveX1}px, ${moveY1}px) scale(${scale1})`;
    if (secondary) secondary.style.transform = `translate(${moveX2}px, ${moveY2}px) scale(${scale2})`;
    if (tretiary) tretiary.style.transform = `translate(${moveX3}px, ${moveY3}px) scale(${scale3})`;
    
    if (bottomElements) {
        bottomElements.style.opacity = Math.max(1 - progress * 3, 0);
    }
    if (md3Deco) {
        md3Deco.style.opacity = 1 - (0.5 * progress);
    }

    let currentPlaybackRate = Math.max(0, 1 - progress);
    
    if (sh5) {
        sh5.getAnimations().forEach(anim => anim.playbackRate = currentPlaybackRate);
    }
    if (sh12) {
        sh12.getAnimations().forEach(anim => anim.playbackRate = currentPlaybackRate);
    }

    // === 3D-ОТКИДЫВАНИЕ И ЗАТУХАНИЕ КАРТОЧЕК ===
    // Точка в пикселях от верхнего края окна, где карточка начинает исчезать
    const DISAPPEAR_START = 180; 
    // Точка, где карточка должна полностью раствориться и повернуться
    const DISAPPEAR_END = 50;   

    allCards.forEach(card => {
        // Получаем реальные координаты карточки на экране
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;

        if (cardTop < DISAPPEAR_START) {
            // Считаем прогресс затухания от 0 (еще нормальная) до 1 (полностью исчезла)
            let exitProgress = (DISAPPEAR_START - cardTop) / (DISAPPEAR_START - DISAPPEAR_END);
            exitProgress = Math.max(0, Math.min(exitProgress, 1));

            // Поворачиваем назад до 35 градусов и чуть отдаляем (scale 0.85)
            let rotateX = exitProgress * 35;
            let cardScale = 1 - (exitProgress * 0.15);
            let opacity = 1 - exitProgress;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) scale(${cardScale})`;
            card.style.opacity = opacity;
        } else {
            // Если карточка ниже критической отметки — она полностью видна и прямая
            card.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
            card.style.opacity = 1;
        }
    });

    requestAnimationFrame(render);
}

render();