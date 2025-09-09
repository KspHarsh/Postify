


let isLiked = false;
let isSaved = false;
let likeCount = 245;


const likeBtn = document.querySelector('.action-btn:has(.fa-thumbs-up)');
const saveBtn = document.querySelector('.action-btn:has(.fa-bookmark)');
const likeCountElement = document.querySelector('.like-count');


document.addEventListener('DOMContentLoaded', function() {
    console.log('Postify Article Page Loaded');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    

});


function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.querySelector('.article-main-title').textContent);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
    openShareWindow(shareUrl, 'Facebook');
}

function shareToTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.querySelector('.article-main-title').textContent);
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=Postify`;
    openShareWindow(shareUrl, 'Twitter');
}

function shareToLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.querySelector('.article-main-title').textContent);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;
    openShareWindow(shareUrl, 'LinkedIn');
}

function shareArticle() {
    if (navigator.share) {
      
        navigator.share({
            title: document.querySelector('.article-main-title').textContent,
            text: 'Check out this article on Postify',
            url: window.location.href
        }).then(() => {
            console.log('Thanks for sharing!');
            showNotification('Article shared successfully!', 'success');
        }).catch((err) => {
            console.log('Error sharing:', err);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to copy link', 'error');
        });
    } else {
     
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Link copied to clipboard!', 'success');
        } catch (err) {
            showNotification('Unable to copy link', 'error');
        }
        document.body.removeChild(textArea);
    }
}

function openShareWindow(url, platform) {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
        url,
        `share${platform}`,
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
}


function likeArticle() {
    isLiked = !isLiked;
    
    if (isLiked) {
        likeCount++;
        likeBtn.style.color = '#6366f1';
        likeBtn.querySelector('i').style.transform = 'scale(1.2)';
        showNotification('Article liked!', 'success');
    } else {
        likeCount--;
        likeBtn.style.color = '#6b7280';
        likeBtn.querySelector('i').style.transform = 'scale(1)';
        showNotification('Like removed', 'info');
    }
    
    likeCountElement.textContent = likeCount;
    
  
    likeBtn.querySelector('i').style.transition = 'transform 0.2s ease';
    setTimeout(() => {
        likeBtn.querySelector('i').style.transform = 'scale(1)';
    }, 200);
}

function saveArticle() {
    isSaved = !isSaved;
    
    if (isSaved) {
        saveBtn.style.color = '#6366f1';
        saveBtn.querySelector('i').classList.remove('far');
        saveBtn.querySelector('i').classList.add('fas');
        showNotification('Article saved!', 'success');
    } else {
        saveBtn.style.color = '#6b7280';
        saveBtn.querySelector('i').classList.remove('fas');
        saveBtn.querySelector('i').classList.add('far');
        showNotification('Article removed from saved', 'info');
    }
    
 
    saveBtn.querySelector('i').style.transition = 'transform 0.2s ease';
    saveBtn.querySelector('i').style.transform = 'scale(1.2)';
    setTimeout(() => {
        saveBtn.querySelector('i').style.transform = 'scale(1)';
    }, 200);
}

function openComments() {
    showNotification('Comments feature coming soon!', 'info');
    
}


function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
   
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu-dropdown');
    if (mobileMenu) {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    }
}

// Topic tag interaction
document.addEventListener('DOMContentLoaded', function() {
    const topicTags = document.querySelectorAll('.topic-tag');
    topicTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const topic = this.textContent;
            showNotification(`Exploring ${topic} articles...`, 'info');
            // Here you would typically redirect to a topic page or filter articles
        });
    });
});

// Article item click tracking
document.addEventListener('DOMContentLoaded', function() {
    const articleItems = document.querySelectorAll('.article-item, .trending-item');
    articleItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.querySelector('.article-title, .trending-title').textContent;
            showNotification(`Loading article: ${title.substring(0, 30)}...`, 'info');
            // Here you would typically redirect to the article
        });
    });
});

// Scroll-based animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.sidebar-card, .article-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.sidebar-card, .article-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations);
});

// Reading progress indicator
function updateReadingProgress() {
    const article = document.querySelector('.article-content');
    if (!article) return;
    
    const articleTop = article.getBoundingClientRect().top + window.pageYOffset;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    const progress = Math.max(0, Math.min(100, 
        ((scrollTop + windowHeight - articleTop) / articleHeight) * 100
    ));
    
    // You could add a progress bar here
    // For now, we'll just log it
    if (progress > 0 && progress < 100) {
        console.log(`Reading progress: ${Math.round(progress)}%`);
    }
}

window.addEventListener('scroll', updateReadingProgress);

// Print functionality
function printArticle() {
    window.print();
}

// Font size adjustment
let fontSize = 16;
function adjustFontSize(change) {
    fontSize = Math.max(12, Math.min(24, fontSize + change));
    document.querySelector('.article-content').style.fontSize = fontSize + 'px';
    showNotification(`Font size: ${fontSize}px`, 'info');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save article
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveArticle();
    }
    
    // Ctrl/Cmd + L to like article
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        likeArticle();
    }
    
    // Escape to close any open modals (future feature)
    if (e.key === 'Escape') {
        // Close modals
    }
});

console.log('Postify Article Page JavaScript loaded successfully!');
