import './bootstrap';

import Alpine from 'alpinejs';

Alpine.data('homePageMotion', () => ({
    activeService: null,
    activeTestimonial: 0,
    cleanup: null,
    floatingJerseyStyle: '',
    frameRequested: false,
    menuOpen: false,
    shouldAnimateHeroJersey:
        typeof window !== 'undefined'
        && window.matchMedia('(min-width: 1024px)').matches
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    testimonials: [
        {
            avatar: '/images/testimonials/ajeng-febria.png',
            name: 'Ajeng Febria',
            quote: 'Bahan sangat bagus,\nnext akan beli lagi',
            rating: 5,
        },
        {
            avatar: '/images/testimonials/fahrul-kz.png',
            name: 'Fahrul Kz',
            quote: 'print sangat jelas\ndan tajam,\nLove U',
            rating: 4,
        },
        {
            avatar: 'https://i.pravatar.cc/96?img=44',
            name: 'Maudy Ayunda',
            quote: 'Wah bahannya bagus\nbanget, saya menjadi\nsangat cantik',
            rating: 5,
        },
        {
            avatar: 'https://i.pravatar.cc/96?img=15',
            name: 'Jefri Nichol',
            quote: 'Kaosnya keren saya\njadi tampan seperti\nfahrul',
            rating: 5,
        },
        {
            avatar: 'https://i.pravatar.cc/96?img=47',
            name: 'Pevita Pearce',
            quote: '"kpan" beli lagi deh\nsuka banget dengan\nplatfrom ini',
            rating: 4,
        },
    ],

    init() {
        const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
        const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const updateAnimationMode = () => {
            this.shouldAnimateHeroJersey = desktopMediaQuery.matches && !reducedMotionMediaQuery.matches;
            this.queueFloatingJerseyUpdate();
        };

        const queueUpdate = () => {
            this.queueFloatingJerseyUpdate();
        };

        desktopMediaQuery.addEventListener('change', updateAnimationMode);
        reducedMotionMediaQuery.addEventListener('change', updateAnimationMode);
        window.addEventListener('resize', queueUpdate);
        window.addEventListener('scroll', queueUpdate, { passive: true });

        this.cleanup = () => {
            desktopMediaQuery.removeEventListener('change', updateAnimationMode);
            reducedMotionMediaQuery.removeEventListener('change', updateAnimationMode);
            window.removeEventListener('resize', queueUpdate);
            window.removeEventListener('scroll', queueUpdate);
        };

        this.$nextTick(() => {
            updateAnimationMode();
        });
    },

    destroy() {
        this.cleanup?.();
    },

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    lerp(start, end, progress) {
        return start + ((end - start) * progress);
    },

    setActiveService(index) {
        this.activeService = index;
    },

    resetActiveService() {
        this.activeService = null;
    },

    previousTestimonial() {
        if (this.activeTestimonial <= 0) {
            return;
        }

        this.activeTestimonial -= 1;
    },

    nextTestimonial() {
        if (this.activeTestimonial >= this.testimonials.length - 1) {
            return;
        }

        this.activeTestimonial += 1;
    },

    setActiveTestimonial(index) {
        this.activeTestimonial = this.clamp(Number(index), 0, this.testimonials.length - 1);
    },

    currentTestimonial() {
        return this.testimonials[this.activeTestimonial] ?? null;
    },

    previousTestimonialData() {
        if (this.activeTestimonial <= 0) {
            return null;
        }

        return this.testimonials[this.activeTestimonial - 1] ?? null;
    },

    nextTestimonialData() {
        if (this.activeTestimonial >= this.testimonials.length - 1) {
            return null;
        }

        return this.testimonials[this.activeTestimonial + 1] ?? null;
    },

    queueFloatingJerseyUpdate() {
        if (this.frameRequested) {
            return;
        }

        this.frameRequested = true;

        requestAnimationFrame(() => {
            this.frameRequested = false;
            this.updateFloatingJersey();
        });
    },

    updateFloatingJersey() {
        if (!this.shouldAnimateHeroJersey) {
            this.floatingJerseyStyle = 'display: none;';

            return;
        }

        const heroAnchor = this.$refs.heroJerseyStart?.getBoundingClientRect();
        const aboutAnchor = this.$refs.aboutJerseyEnd?.getBoundingClientRect();

        if (!heroAnchor || !aboutAnchor) {
            this.floatingJerseyStyle = 'display: none;';

            return;
        }

        if (heroAnchor.height < 10 || aboutAnchor.height < 10) {
            this.floatingJerseyStyle = 'display: none;';

            return;
        }

        const heroAnchorTop = window.scrollY + heroAnchor.top;
        const aboutAnchorTop = window.scrollY + aboutAnchor.top;
        const scrollStart = heroAnchorTop - (window.innerHeight * 0.18);
        const scrollEnd = aboutAnchorTop - (window.innerHeight * 0.46);
        const progress = this.clamp((window.scrollY - scrollStart) / Math.max(scrollEnd - scrollStart, 1), 0, 1);

        const left = this.lerp(heroAnchor.left, aboutAnchor.left, progress);
        const top = this.lerp(heroAnchor.top, aboutAnchor.top, progress);
        const width = this.lerp(heroAnchor.width, aboutAnchor.width, progress);

        this.floatingJerseyStyle = [
            'display: block',
            `left: ${left}px`,
            `top: ${top}px`,
            `width: ${width}px`,
            'transform: translate3d(0, 0, 0)',
        ].join('; ');
    },
}));

window.Alpine = Alpine;

Alpine.start();
