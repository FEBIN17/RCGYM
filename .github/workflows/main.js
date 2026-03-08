document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    gsap.registerPlugin(ScrollTrigger);


    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = (open) => {
        mobileMenu.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
        document.body.style.overflow = open ? 'hidden' : 'auto';
    };

    menuToggle.addEventListener('click', () => toggleMenu(true));
    menuClose.addEventListener('click', () => toggleMenu(false));
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));


    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach(el => {
        const direction = el.dataset.reveal;
        const delay = el.dataset.delay || 0;
        
        let x = 0, y = 0;
        if (direction === 'left') x = -50;
        if (direction === 'right') x = 50;
        if (direction === 'up') y = 50;
        if (direction === 'down') y = -50;

        gsap.fromTo(el, 
            { opacity: 0, x, y },
            { 
                opacity: 1, 
                x: 0, 
                y: 0, 
                duration: 1, 
                delay: delay / 1000,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });


    const testimonials = [
        {
            text: '"Best gym in Brookefield. Trainers are very supportive and the equipment is excellent."',
            author: 'Member Review'
        },
        {
            text: '"Great environment and motivating trainers. Highly recommended."',
            author: 'Member Review'
        },
        {
            text: '"Clean gym, modern equipment, and professional trainers."',
            author: 'Member Review'
        }
    ];

    let currentTestimonial = 0;
    const testimonialEl = document.querySelector('.testimonial-slide p');
    
    setInterval(() => {
        gsap.to(testimonialEl, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonialEl.innerText = testimonials[currentTestimonial].text;
                gsap.to(testimonialEl, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                });
            }
        });
    }, 5000);


    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'SENDING...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'SUCCESS! WE WILL CALL YOU.';
                btn.style.backgroundColor = '#22c55e';
                form.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
