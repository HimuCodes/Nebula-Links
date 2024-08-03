function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;

    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        starsContainer.appendChild(star);
    }

    setTimeout(() => {
        star.remove();
    }, 5000);
}

setInterval(createStar, 100);
