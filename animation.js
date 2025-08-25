// Enhanced star creation for the cosmic background
function createStar() {
    const star = document.createElement('div');
    star.className = 'cosmic-star';
    star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: twinkle ${Math.random() * 4 + 2}s ease-in-out infinite alternate;
    `;

    const starField = document.querySelector('.star-field');
    if (starField) {
        starField.appendChild(star);
        
        // Remove star after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, 6000);
    }
}

// Add CSS animation for twinkling
if (!document.querySelector('#star-animations')) {
    const style = document.createElement('style');
    style.id = 'star-animations';
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
    `;
    document.head.appendChild(style);
}

// Create initial star field
function initializeStarField() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createStar(), Math.random() * 2000);
    }
}

// Continuous star creation
function startStarAnimation() {
    setInterval(createStar, 300);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeStarField();
        startStarAnimation();
    });
} else {
    initializeStarField();
    startStarAnimation();
}

// Dynamic configuration loading (if needed)
if (typeof profileConfig !== 'undefined') {
    console.log('Profile configuration loaded:', profileConfig.displayName);
}
