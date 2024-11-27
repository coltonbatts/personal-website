document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navOverlay.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navOverlay.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navOverlay.contains(e.target) && !menuBtn.contains(e.target)) {
            navOverlay.classList.remove('active');
        }
    });

    // Check for newsletter subscription success
    const urlParams = new URLSearchParams(window.location.search);
    const newsletterMessage = document.getElementById('newsletter-message');
    if (urlParams.get('subscribed') === 'true' && newsletterMessage) {
        newsletterMessage.textContent = 'Thanks for subscribing!';
        newsletterMessage.className = 'success';
        // Remove the query parameter
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Video overlay animation
    const videoOverlay = document.querySelector('.video-overlay');
    if (videoOverlay) {
        // Show overlay when page loads
        setTimeout(() => {
            videoOverlay.classList.add('show');
            
            // Hide overlay after 3 seconds
            setTimeout(() => {
                videoOverlay.classList.remove('show');
            }, 3000);
        }, 1000);
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Text Reveal Animation
    const revealText = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const textObserver = new IntersectionObserver(revealText, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    document.querySelectorAll('.reveal-text, .split-text, .header-line').forEach(element => {
        textObserver.observe(element);
    });

    // Rotating Text
    const rotatingTexts = [
        'DESIGNER & SOFTWARE DEVELOPER',
        'BASED IN FORT WORTH, TX',
        'CRAFTING DIGITAL EXPERIENCES'
    ];

    let currentIndex = 0;
    const rotatingElement = document.querySelector('.rotating-text');

    const updateRotatingText = () => {
        rotatingElement.classList.remove('active');
        
        setTimeout(() => {
            rotatingElement.textContent = rotatingTexts[currentIndex];
            rotatingElement.classList.add('active');
            currentIndex = (currentIndex + 1) % rotatingTexts.length;
        }, 300);
    };

    updateRotatingText();
    setInterval(updateRotatingText, 2000);

    // Project Hover Animation
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
        const image = item.querySelector('img');
        const info = item.querySelector('.project-info');
        
        item.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
            info.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            info.style.transform = 'translateY(100%)';
        });
    });

    // Scroll Animation
    const fadeInElements = document.querySelectorAll('.fade-in');

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeInObserver.observe(element);
    });

    // Cursor Animation
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Contact form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (!name || !email || !message) {
                alert('Please fill out all fields');
                return;
            }

            // TODO: Replace with actual form submission logic
            // This could be an AJAX call to a backend service or a third-party form submission API
            console.log('Form submitted:', { name, email, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Animate project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Optional: Add typing effect to hero subtitle
    const subtitleElement = document.querySelector('.subtitle');
    if (subtitleElement) {
        const text = subtitleElement.textContent;
        subtitleElement.textContent = '';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                subtitleElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        typeWriter();
    }

    // Custom VHS Cursor
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor');
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // VHS Counter
    const counter = document.querySelector('.vhs-counter');
    let seconds = 0;

    function updateCounter() {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        counter.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    setInterval(updateCounter, 1000);

    // Random Tracking Effect
    function addTrackingNoise() {
        const tracking = document.querySelector('.vhs-tracking');
        tracking.style.opacity = Math.random() * 0.5;
        tracking.style.transform = `translateY(${Math.random() * 10}px)`;
    }

    setInterval(addTrackingNoise, 100);

    // Add static noise to images on hover
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.filter = 'grayscale(100%) contrast(150%) brightness(120%)';
            img.style.animation = 'tracking 0.2s infinite';
        });
        
        img.addEventListener('mouseout', () => {
            img.style.filter = '';
            img.style.animation = '';
        });
    });

    // Random glitch effect on text
    function glitchText() {
        const texts = document.querySelectorAll('h1, h2, h3, p');
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        
        randomText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        randomText.style.opacity = Math.random() * 0.5 + 0.5;
        
        setTimeout(() => {
            randomText.style.transform = '';
            randomText.style.opacity = '';
        }, 50);
    }

    setInterval(glitchText, 2000);

    // VHS Rewind effect on navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            document.body.style.animation = 'tracking 0.5s infinite';
            
            setTimeout(() => {
                document.body.style.animation = '';
                window.location = link.href;
            }, 1000);
        });
    });

    // YouTube Player
    let player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('youtube-player', {
            // Replace VIDEO_ID with your actual YouTube video ID
            videoId: 'YOUR_VIDEO_ID_HERE',
            playerVars: {
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                loop: 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        // Player is ready
        document.querySelectorAll('.vcr-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.textContent;
                switch(action) {
                    case 'PLAY':
                        player.playVideo();
                        document.querySelector('.vcr-display').textContent = 'PLAY';
                        break;
                    case 'STOP':
                        player.stopVideo();
                        document.querySelector('.vcr-display').textContent = 'STOP';
                        break;
                    case 'REW':
                        player.seekTo(0);
                        document.querySelector('.vcr-display').textContent = 'REW';
                        break;
                    case 'FF':
                        player.seekTo(player.getDuration() - 5);
                        document.querySelector('.vcr-display').textContent = 'FF';
                        break;
                }
            });
        });
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            document.querySelector('.vcr-display').textContent = 'END';
        }
    }

    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('subscriber-email').value;
            
            try {
                const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        service_id: 'YOUR_SERVICE_ID',
                        template_id: 'YOUR_TEMPLATE_ID',
                        user_id: 'YOUR_PUBLIC_KEY',
                        template_params: {
                            to_email: 'colton@coltonbatts.com',
                            subscriber_email: email,
                            message: `New newsletter subscription from: ${email}`
                        }
                    })
                });

                if (response.ok) {
                    newsletterMessage.textContent = 'Thanks for subscribing!';
                    newsletterMessage.className = 'success';
                    newsletterForm.reset();
                } else {
                    throw new Error('Failed to subscribe');
                }
            } catch (error) {
                newsletterMessage.textContent = 'Something went wrong. Please try again.';
                newsletterMessage.className = 'error';
            }
        });
    }
});
