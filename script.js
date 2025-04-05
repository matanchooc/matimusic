document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll for CTA button
    const contactForm = document.getElementById('contact-form');
    const ctaButton = document.querySelector('.cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    return response.text().then(errorMessage => {
                        alert(`Oops! There was a problem submitting your form: ${errorMessage}`);
                    });
                }
            }).catch(error => {
                console.error('Error:', error);
                alert('Oops! There was a problem submitting your form. Please try again later.');
            });
        });
    }

    // Intersection Observer for triggering fade-in when sections are in view
    const contentSections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once it's faded in
            }
        });
    }, { threshold: 0.1 });

    contentSections.forEach(section => {
        observer.observe(section);
    });

    // Applying fade-in effect to lower elements (e.g., within .content-section)
    const lowerElements = document.querySelectorAll('.fade-in-on-scroll');

    const lowerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                lowerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    lowerElements.forEach(element => {
        lowerObserver.observe(element);
    });
    const bannerImage = document.querySelector('.banner-image');
    if (bannerImage) {
        setTimeout(() => {
            bannerImage.classList.add('fade-in');
        }, 100);
    }

    // Updated code for fixed icon positioning until copyright/footer
    const bottomRightIcons = document.querySelector('.bottom-right-icons');
    const copyright = document.querySelector('.copyright');

    function updateIconsPosition() {
        const copyrightRect = copyright.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const iconHeight = bottomRightIcons.getBoundingClientRect().height;

        if (copyrightRect.top <= viewportHeight - iconHeight) {
            // Adjust the icon position based on copyright section visibility
            bottomRightIcons.style.position = 'absolute';
            bottomRightIcons.style.bottom = `${viewportHeight - copyrightRect.top + 20}px`; // 20px for spacing
        } else {
            // Keep the icons fixed when the copyright section is not in view
            bottomRightIcons.style.position = 'fixed';
            bottomRightIcons.style.bottom = '20px';
        }
    }

    // Initial position update
    updateIconsPosition();

    // Add scroll and resize event listeners
    window.addEventListener('scroll', updateIconsPosition);
    window.addEventListener('resize', updateIconsPosition);
});
document.addEventListener('DOMContentLoaded', () => {
    const audios = [
        document.getElementById('audio1'),
        document.getElementById('audio2'),
        document.getElementById('audio3')
    ];
    
    let current = 0;
    let next = 1;
    const fadeDuration = 2000; // 2-second crossfade

    // Initialize first track
    audios[current].volume = 0;
    audios[current].play();
    fadeIn(audios[current]);

    function fadeIn(audio) {
        let volume = 0;
        audio.volume = volume;
        
        const fadeInInterval = setInterval(() => {
            if (volume < 1) {
                volume += 0.1;
                audio.volume = volume.toFixed(1);
            } else {
                clearInterval(fadeInInterval);
            }
        }, 200);
    }

    function fadeOut(audio) {
        let volume = 1;
        
        const fadeOutInterval = setInterval(() => {
            if (volume > 0) {
                volume -= 0.1;
                audio.volume = volume.toFixed(1);
            } else {
                audio.pause();
                clearInterval(fadeOutInterval);
            }
        }, 200);
    }

    function playNext() {
        fadeOut(audios[current]);
        current = next;
        next = (current + 1) % audios.length;
        fadeIn(audios[current]);
    }

    // Schedule track changes
    setInterval(playNext, 15000); // Change every 15 seconds
});
// Replace your existing script.js content with this
document.addEventListener('DOMContentLoaded', () => {
    const image = document.querySelector('.hero-image');
    const video = document.querySelector('.hero-video');
    let timer;

    // Function to switch to video
    function showVideo() {
        clearTimeout(timer);
        image.style.opacity = 0;
        video.style.opacity = 1;
        video.play();
        video.loop = true;
    }
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
    // Show video after 2 seconds
    timer = setTimeout(showVideo, 2000);

    // Or show video on interaction
    document.querySelector('.hero').addEventListener('mousemove', showVideo);
    document.querySelector('.hero').addEventListener('click', showVideo);
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('mobile-active');
    });
});
function isInstagram() {
    return navigator.userAgent.match(/Instagram/i);
}

if(isInstagram()) {
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        el.classList.add('fade-in');
    });
}
