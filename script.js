
document.addEventListener('DOMContentLoaded', function () {
    const myTypeItInstance = new TypeIt('#my-heading', {
        speed: 100,
        waitUntilVisible: true,
        loop: true, 
        afterComplete: async (instance) => {
           
            await new Promise(resolve => setTimeout(resolve, 5000));

           
            instance.reset();
            
            
            instance.go();
        }
    })
    .type('Write Your <span class="highlight">Article</span> here...')
    .go();

    
    const modal = document.getElementById("loginModal");
    const btn = document.getElementById("loginBtn");
    const span = document.getElementsByClassName("close")[0];
    const submitBtn = document.getElementById("submitLoginBtn");
    document.getElementById("submitLoginBtn").addEventListener("click", function() {
    window.location.href = "HomeAfterlogin.html"; 
  });

    
    btn.onclick = function(e) {
        e.preventDefault();
        modal.style.display = "block";
       
        const loginTypeIt = new TypeIt('#login-heading', {
            speed: 100,
            waitUntilVisible: true
        })
        .type('Welcome Back!')
        .go();
    }

     if (!email.includes("@")) {
            alert("Please enter a valid email address containing '@'.");
            return;
        }
        
    span.onclick = function() {
        modal.style.display = "none";
    }

    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        
        
        confetti({
            particleCount: 200,
            spread: 200,
            origin: { y: 0.6 }
        });

        
        setTimeout(() => {
            modal.style.display = "none";
        }, 1000);
    });
});







document.addEventListener('DOMContentLoaded', function () {
    const articlesContainer = document.querySelector('.articles-container');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollHint = document.querySelector('.scroll-hint');

    if (!articlesContainer || !scrollLeftBtn || !scrollRightBtn || !scrollProgress || !scrollHint) {
        return;
    }

    const scrollAmount = 350;

    function updateScrollProgress() {
        const currentLeft = articlesContainer.scrollLeft;
        const maxScroll = articlesContainer.scrollWidth - articlesContainer.clientWidth;
        const progress = maxScroll > 0 ? (currentLeft / maxScroll) * 100 : 0;

        scrollProgress.style.width = progress + '%';
        scrollLeftBtn.style.opacity = currentLeft > 0 ? '1' : '0.3';
        scrollRightBtn.style.opacity = currentLeft < maxScroll - 10 ? '1' : '0.3';

        if (currentLeft > 0) scrollHint.style.opacity = '0';
    }

    function smoothScroll(offset) {
        articlesContainer.scrollBy({ left: offset, behavior: 'smooth' });
        setTimeout(updateScrollProgress, 400);
    }

    scrollLeftBtn.addEventListener('click', () => smoothScroll(-scrollAmount));
    scrollRightBtn.addEventListener('click', () => smoothScroll(scrollAmount));

    articlesContainer.addEventListener('wheel', function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            const scrollStep = e.deltaY * 2.5;
            smoothScroll(scrollStep);
        }
    }, { passive: false });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            smoothScroll(-scrollAmount);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            smoothScroll(scrollAmount);
        }
    });

    let startX = 0, startY = 0;
    articlesContainer.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    articlesContainer.addEventListener('touchmove', e => {
        if (!startX || !startY) return;
        const deltaX = startX - e.touches[0].clientX;
        const deltaY = startY - e.touches[0].clientY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) e.preventDefault();
    });
    articlesContainer.addEventListener('touchend', e => {
        const deltaX = startX - e.changedTouches[0].clientX;
        const deltaY = startY - e.changedTouches[0].clientY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                smoothScroll(scrollAmount);
            } else {
                smoothScroll(-scrollAmount);
            }
        }
        startX = 0; startY = 0;
    });

    updateScrollProgress();
    setTimeout(() => { scrollHint.style.opacity = '0'; }, 5000);
});
