/**
 * Starfield + twinkle + shooting stars
 * Keeps performance lean, respects prefers-reduced-motion.
 */

const STAR_COUNT = 160;            // total stars
const TWINKLE_RATIO = 0.38;        // fraction twinkling
const SHOOTING_INTERVAL_MIN = 6000;
const SHOOTING_INTERVAL_MAX = 12000;
const MAX_CONCURRENT_SHOOTERS = 2;

const root = document.getElementById('starfield');
if (!root) {
    console.warn('[starfield] Root container not found.');
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function createStars() {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() < 0.15 ? rand(2.2,3.4) : rand(1.2,2.1);
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = x + 'vw';
        star.style.top = y + 'vh';

        // Depth parallax slight movement: assign a transform origin offset
        const depth = rand(0.2, 1);
        star.style.opacity = (0.25 + 0.55 * Math.random()).toFixed(2);
        star.dataset.depth = depth.toFixed(2);

        if (!prefersReducedMotion && Math.random() < TWINKLE_RATIO) {
            star.classList.add('twinkle');
            star.style.setProperty('--twinkle-delay', rand(-8, 8).toFixed(2) + 's');
            star.style.setProperty('--twinkle-duration', rand(4, 9).toFixed(2) + 's');
        }
        frag.appendChild(star);
    }
    root.appendChild(frag);
}

let activeShooters = 0;
let shootingEnabled = !prefersReducedMotion;
let destroyed = false;

function spawnShootingStar() {
    if (destroyed || !shootingEnabled) return;
    if (activeShooters >= MAX_CONCURRENT_SHOOTERS) return;

    activeShooters++;
    const el = document.createElement('div');
    el.className = 'shooting-star';
    document.body.appendChild(el);

    // Random start
    const startX = rand(5, 85);      // viewport width %
    const startY = rand(5, 35);      // viewport height %
    const angle = rand(-40, -20);    // negative to go upward-right or upward-left
    const distance = rand(450, 760); // px travel
    const duration = rand(900, 1200); // ms

    el.style.top = startY + 'vh';
    el.style.left = startX + 'vw';
    el.style.transform = `rotate(${angle}deg) translate3d(0,0,0)`;
    el.style.opacity = '0';

    const startTime = performance.now();
    function animate(now) {
        if (destroyed) return;
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const ease = t < 0.5 ? (2 * t * t) : (-1 + (4 - 2 * t) * t); // easeInOutQuad
        const dx = distance * ease;
        el.style.transform = `rotate(${angle}deg) translate3d(${dx}px,${dx * 0.15}px,0)`;
        el.style.opacity = t < 0.1 ? (t / 0.1).toFixed(2) : (1 - (t - 0.1) * 1.1).toFixed(2);
        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            el.remove();
            activeShooters--;
        }
    }
    requestAnimationFrame(animate);
}

function scheduleNextShooter() {
    if (destroyed || !shootingEnabled) return;
    const delay = rand(SHOOTING_INTERVAL_MIN, SHOOTING_INTERVAL_MAX);
    setTimeout(() => {
        spawnShootingStar();
        scheduleNextShooter();
    }, delay);
}

function init() {
    if (!root) return;
    createStars();
    if (!prefersReducedMotion) {
        scheduleNextShooter();
    }
    // Optionally parallax on mouse move (very subtle)
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
}

let pointerRAF = null;
function handlePointerMove(e) {
    if (prefersReducedMotion) return;
    if (pointerRAF) return;
    const { innerWidth: w, innerHeight: h } = window;
    const rx = (e.clientX / w - 0.5);
    const ry = (e.clientY / h - 0.5);
    pointerRAF = requestAnimationFrame(() => {
        pointerRAF = null;
        if (!root) return;
        const stars = root.children;
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            const depth = parseFloat(s.dataset.depth || '0.5');
            s.style.transform = `translate(${(-rx * depth * 8).toFixed(2)}px, ${(ry * depth * 8).toFixed(2)}px)`;
        }
    });
}

function destroyStarfield() {
    destroyed = true;
    shootingEnabled = false;
    window.removeEventListener('pointermove', handlePointerMove);
    if (root) root.innerHTML = '';
    document.querySelectorAll('.shooting-star').forEach(n => n.remove());
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
} else {
    init();
}

// Expose optional control (debug)
window.NebulaStarfield = {
    destroy: destroyStarfield,
    spawn: spawnShootingStar,
    stats: () => ({ activeShooters, shootingEnabled, stars: root ? root.children.length : 0 })
};