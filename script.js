// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupNavigation();
    setupScrollAnimations();
    setupFormHandlers();
    setupModalHandlers();
    setupSmoothScrolling();
    loadMessages();
    loadPosts();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.knowledge-card, .blog-card, .contact-item, .message-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Form handlers
function setupFormHandlers() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Message form
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', handleMessageForm);
    }

    // Post form
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', handlePostForm);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual email service)
    setTimeout(() => {
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Handle message form submission
function handleMessageForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Create message object
    const message = {
        id: Date.now(),
        title: data.title,
        content: data.content,
        type: data.type,
        timestamp: new Date().toISOString(),
        author: 'Karthikeyan Mayavan'
    };
    
    // Add message to feed
    addMessageToFeed(message);
    
    // Show success message
    showMessage('Message posted successfully!', 'success');
    
    // Reset form
    e.target.reset();
}

// Handle post form submission
function handlePostForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Create post object
    const post = {
        id: Date.now(),
        title: data.title,
        content: data.content,
        category: data.category,
        image: data.image,
        video: data.video,
        timestamp: new Date().toISOString(),
        author: 'Karthikeyan Mayavan'
    };
    
    // Add post to blog section
    addPostToBlog(post);
    
    // Show success message
    showMessage('Post published successfully!', 'success');
    
    // Close modal and reset form
    closePostModal();
    e.target.reset();
}

// Modal handlers
function setupModalHandlers() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('postModal');
        if (e.target === modal) {
            closePostModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePostModal();
        }
    });
}

// Show post modal
function showPostModal() {
    const modal = document.getElementById('postModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    const firstInput = modal.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

// Close post modal
function closePostModal() {
    const modal = document.getElementById('postModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add message to feed
function addMessageToFeed(message) {
    const messagesFeed = document.getElementById('messagesFeed');
    const messageElement = createMessageElement(message);
    messagesFeed.insertBefore(messageElement, messagesFeed.firstChild);
    
    // Add animation
    messageElement.classList.add('animate-on-scroll');
    setTimeout(() => {
        messageElement.classList.add('animated');
    }, 100);
}

// Create message element
function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-item';
    messageDiv.innerHTML = `
        <div class="message-header">
            <h4>${message.title}</h4>
            <span class="message-type ${message.type}">${message.type.charAt(0).toUpperCase() + message.type.slice(1)}</span>
            <span class="message-time">Just now</span>
        </div>
        <p>${message.content}</p>
        <div class="message-author">Posted by ${message.author}</div>
    `;
    return messageDiv;
}

// Add post to blog
function addPostToBlog(post) {
    const blogGrid = document.querySelector('.blog-grid');
    const postElement = createPostElement(post);
    
    // Insert as first post (after featured if exists)
    const firstCard = blogGrid.querySelector('.blog-card:not(.featured)');
    if (firstCard) {
        blogGrid.insertBefore(postElement, firstCard);
    } else {
        blogGrid.appendChild(postElement);
    }
    
    // Add animation
    postElement.classList.add('animate-on-scroll');
    setTimeout(() => {
        postElement.classList.add('animated');
    }, 100);
}

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('article');
    postDiv.className = 'blog-card';
    
    const imageHtml = post.image ? 
        `<img src="${post.image}" alt="${post.title}">` : 
        `<img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="${post.title}">`;
    
    const videoHtml = post.video ? 
        `<div class="video-container" style="margin-top: 1rem;">
            <iframe src="${post.video}" frameborder="0" allowfullscreen style="width: 100%; height: 200px; border-radius: 8px;"></iframe>
        </div>` : '';
    
    postDiv.innerHTML = `
        <div class="blog-image">
            ${imageHtml}
            <div class="blog-category">${post.category}</div>
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-date"><i class="fas fa-calendar"></i> ${formatDate(post.timestamp)}</span>
                <span class="blog-author"><i class="fas fa-user"></i> ${post.author}</span>
            </div>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${videoHtml}
            <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
    `;
    return postDiv;
}

// Load initial messages
function loadMessages() {
    // This would typically load from a database or API
    // For now, we'll use the existing static messages
}

// Load initial posts
function loadPosts() {
    // This would typically load from a database or API
    // For now, we'll use the existing static posts
}

// Utility functions
function showMessage(text, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-${type}`;
    messageDiv.textContent = text;
    
    // Insert at the top of the page
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Search functionality (for future enhancement)
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            filterContent(query);
        });
    }
}

function filterContent(query) {
    const blogCards = document.querySelectorAll('.blog-card');
    const knowledgeCards = document.querySelectorAll('.knowledge-card');
    
    [...blogCards, ...knowledgeCards].forEach(card => {
        const text = card.textContent.toLowerCase();
        const isVisible = text.includes(query);
        card.style.display = isVisible ? 'block' : 'none';
    });
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Tab navigation for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
}

function handleScroll() {
    // Handle scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}

// Initialize performance optimizations
optimizePerformance();
setupKeyboardNavigation();
setupLazyLoading();
setupSearch();