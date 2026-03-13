document.addEventListener('DOMContentLoaded', function () {
    initNavBurger();
    initTrustStats();
    initContactForm();
});

function initNavBurger() {
    const burger = document.querySelector('.nav-burger');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const overlay = document.querySelector('.nav-overlay');

    if (!burger || !nav || !header) return;

    function openMenu() {
        document.body.classList.add('nav-open');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Zavřít menu');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Otevřít menu');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        if (document.body.classList.contains('nav-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    burger.addEventListener('click', toggleMenu);

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
}

function initTrustStats() {
    const stats = document.querySelectorAll('.trust-stat[data-value]');
    if (!stats.length) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.dataset.animated === 'true') return;
                el.dataset.animated = 'true';

                const target = parseInt(el.dataset.value, 10);
                const suffix = el.dataset.suffix || '';
                const numberEl = el.querySelector('.trust-stat-number');
                const suffixEl = el.querySelector('.trust-stat-suffix');

                animateNumber(numberEl, 0, target, 1500);
                if (suffixEl && suffix) {
                    suffixEl.textContent = suffix;
                }
            }
        });
    }, { threshold: 0.3 });

    stats.forEach(function (stat) {
        observer.observe(stat);
    });
}

function animateNumber(el, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 1.5);
        const value = Math.floor(start + (end - start) * eased);
        el.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = end;
        }
    }

    requestAnimationFrame(update);
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const propertyType = document.getElementById('propertyType').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !phone || !propertyType) {
                alert('Vyplňte prosím všechna povinná pole.');
                return;
            }

            // Simulace odeslání – v produkci by zde byl AJAX request na backend
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Odesílám...';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.textContent = 'Odesláno ✓';
                submitBtn.style.background = '#22c55e';
                submitBtn.style.color = '#fff';
                contactForm.reset();

                setTimeout(function () {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 800);
        });
    }
}
