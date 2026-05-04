document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const modal = document.getElementById('code-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCode = document.getElementById('modal-code');
    const modalDifficulty = document.getElementById('modal-difficulty');
    const modalComponents = document.getElementById('modal-components');
    const closeModalBtn = document.getElementById('close-modal');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const copyBtnText = document.getElementById('copy-btn-text');

    let activeTrigger = null;
    let currentRawCode = '';
    let focusTrapHandler = null;

    // ========== RENDER PROJECTS ==========
    function renderProjects() {
        projectsData.forEach(project => {
            const card = document.createElement('article');
            card.className = 'card';
            const conceptsHTML = (project.concepts || []).map(c => `<span class="concept-tag">${c}</span>`).join('');
            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${project.title}</h3>
                    <span class="badge-difficulty" data-level="${project.difficultyLevel || 1}">${project.difficulty || 'Iniciante'}</span>
                </div>
                <p class="card-desc">${project.description}</p>
                <div class="card-concepts">${conceptsHTML}</div>
                <button class="card-btn" data-id="${project.id}" aria-label="Ver código fonte de ${project.title}">Ver Código Fonte</button>
            `;
            projectsGrid.appendChild(card);
        });
        document.querySelectorAll('.card-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                openModal(e.currentTarget.getAttribute('data-id'), e.currentTarget);
            });
        });
    }

    // ========== MODAL ==========
    function openModal(projectId, triggerElement) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;
        activeTrigger = triggerElement;
        currentRawCode = project.code;
        modalTitle.textContent = project.title;
        modalDifficulty.textContent = project.difficulty || '';
        modalDifficulty.setAttribute('data-level', project.difficultyLevel || 1);
        modalComponents.innerHTML = '';
        (project.components || []).forEach(comp => {
            const li = document.createElement('li');
            li.textContent = comp;
            modalComponents.appendChild(li);
        });
        modalCode.innerHTML = highlightCode(project.code);
        copyBtnText.textContent = 'Copiar';
        copyCodeBtn.classList.remove('copied');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeModalBtn.focus();
        trapFocus(modal.querySelector('.modal-content'));
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (focusTrapHandler) {
            modal.querySelector('.modal-content').removeEventListener('keydown', focusTrapHandler);
            focusTrapHandler = null;
        }
        if (activeTrigger) { activeTrigger.focus(); activeTrigger = null; }
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

    // ========== COPY CODE ==========
    function copyCode() {
        navigator.clipboard.writeText(currentRawCode).then(() => {
            showCopied();
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = currentRawCode;
            ta.style.cssText = 'position:fixed;opacity:0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); showCopied(); } catch (_) {}
            document.body.removeChild(ta);
        });
    }
    function showCopied() {
        copyBtnText.textContent = 'Copiado! ✓';
        copyCodeBtn.classList.add('copied');
        setTimeout(() => { copyBtnText.textContent = 'Copiar'; copyCodeBtn.classList.remove('copied'); }, 2000);
    }
    copyCodeBtn.addEventListener('click', copyCode);

    // ========== FOCUS TRAP ==========
    function trapFocus(el) {
        const sel = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
        focusTrapHandler = function(e) {
            if (e.key !== 'Tab') return;
            const focusable = el.querySelectorAll(sel);
            if (!focusable.length) return;
            const first = focusable[0], last = focusable[focusable.length - 1];
            if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
            else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
        };
        el.addEventListener('keydown', focusTrapHandler);
    }

    // ========== SYNTAX HIGHLIGHTING ==========
    function highlightCode(raw) {
        let code = raw.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        const ph = [];
        function hold(m, cls) { const i = ph.length; ph.push(`<span class="${cls}">${m}</span>`); return `\x00PH${i}\x00`; }
        code = code.replace(/\/\*[\s\S]*?\*\//g, m => hold(m,'token-comment'));
        code = code.replace(/\/\/.*$/gm, m => hold(m,'token-comment'));
        code = code.replace(/"(?:[^"\\]|\\.)*"/g, m => hold(m,'token-string'));
        code = code.replace(/'(?:[^'\\]|\\.)*'/g, m => hold(m,'token-string'));
        code = code.replace(/(&lt;[A-Za-z_][\w.]*&gt;)/g, m => hold(m,'token-string'));
        code = code.replace(/^(\s*#\s*(?:define|include|ifdef|ifndef|endif|pragma|if|else|elif|undef))/gm, m => hold(m,'token-directive'));
        const kw = ['int','void','long','float','double','char','bool','byte','unsigned','signed','if','else','for','while','do','switch','case','break','continue','return','const','static','sizeof','struct','class','enum','typedef','true','false','HIGH','LOW','INPUT','OUTPUT','boolean','String'];
        code = code.replace(new RegExp('\\b('+kw.join('|')+')\\b','g'), '<span class="token-keyword">$1</span>');
        code = code.replace(/\b(0x[\da-fA-F]+|\d+\.?\d*[fFuUlL]*)\b/g, '<span class="token-number">$1</span>');
        code = code.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, (m, name) => kw.includes(name) ? m : `<span class="token-function">${name}</span>`);
        code = code.replace(/\x00PH(\d+)\x00/g, (_, i) => ph[parseInt(i)]);
        return code;
    }

    // ========== NAV ==========
    function initNav() {
        const btn = document.getElementById('nav-menu-btn');
        const links = document.getElementById('nav-links');
        btn.addEventListener('click', () => {
            const isOpen = links.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen);
            btn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu de navegação');
        });
        links.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => { links.classList.remove('open'); btn.setAttribute('aria-expanded','false'); });
        });
        // Active link via Intersection Observer
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (active) active.classList.add('active');
                }
            });
        }, { threshold: 0.3 });
        sections.forEach(s => observer.observe(s));
    }

    // ========== SIMULATION ==========
    function initSimulation() {
        const leds = [
            document.getElementById('sim-led-1'),
            document.getElementById('sim-led-2'),
            document.getElementById('sim-led-3'),
            document.getElementById('sim-led-4')
        ];
        const startBtn = document.getElementById('sim-start');
        const stopBtn = document.getElementById('sim-stop');
        const speedRange = document.getElementById('sim-speed-range');
        const speedLabel = document.getElementById('sim-speed-value');
        const status = document.getElementById('sim-status');
        const codeDisplay = document.getElementById('sim-code-display');

        let interval = null, currentStep = 0, speed = 500;

        const piscanteProject = projectsData.find(p => p.id === 'piscante');
        if (piscanteProject && codeDisplay) codeDisplay.textContent = piscanteProject.code;

        function turnOffAll() { leds.forEach(led => { led.classList.remove('sim-led--on'); led.style.removeProperty('--led-glow'); }); }
        function activateLed(i) {
            turnOffAll();
            const led = leds[i];
            led.classList.add('sim-led--on');
            led.style.setProperty('--led-glow', led.dataset.color);
            status.textContent = `LED ${i+1} (A${i+1}) ligado`;
        }
        function tick() { activateLed(currentStep); currentStep = (currentStep + 1) % leds.length; }
        function startSim() {
            if (interval) return;
            tick();
            interval = setInterval(tick, speed);
            startBtn.disabled = true; stopBtn.disabled = false;
            status.textContent = 'Simulação em execução...';
        }
        function stopSim() {
            clearInterval(interval); interval = null; turnOffAll(); currentStep = 0;
            startBtn.disabled = false; stopBtn.disabled = true;
            status.textContent = 'Simulação pausada';
        }
        startBtn.addEventListener('click', startSim);
        stopBtn.addEventListener('click', stopSim);
        speedRange.addEventListener('input', () => {
            speed = parseInt(speedRange.value);
            speedLabel.textContent = `${speed}ms`;
            if (interval) { clearInterval(interval); interval = setInterval(tick, speed); }
        });
    }

    // ========== STEP CARDS ANIMATION ==========
    function initStepAnimations() {
        const cards = document.querySelectorAll('.step-card');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        cards.forEach((card, i) => { card.style.animationDelay = `${i * 100}ms`; observer.observe(card); });
    }

    // ========== DIGITAL RAIN (FUTURE SECTION BG) ==========
    function initDigitalRain() {
        const canvas = document.getElementById('digital-rain');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const section = canvas.closest('.section-future');
        let animId = null;
        let columns = [];
        const chars = '01アイウエオカキクケコ{}[]<>/=+;:';
        const fontSize = 13;
        let isVisible = false;

        function resize() {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
            const cols = Math.floor(canvas.width / fontSize);
            columns = Array.from({ length: cols }, () => Math.random() * canvas.height / fontSize | 0);
        }
        resize();
        window.addEventListener('resize', resize);

        function draw() {
            ctx.fillStyle = 'rgba(13, 17, 23, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < columns.length; i++) {
                const char = chars[Math.random() * chars.length | 0];
                const x = i * fontSize;
                const y = columns[i] * fontSize;
                ctx.fillStyle = `rgba(0, 229, 255, ${0.3 + Math.random() * 0.5})`;
                ctx.fillText(char, x, y);
                if (y > canvas.height && Math.random() > 0.975) columns[i] = 0;
                columns[i]++;
            }
            if (isVisible) animId = requestAnimationFrame(draw);
        }

        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible && !animId) draw();
                else if (!isVisible && animId) { cancelAnimationFrame(animId); animId = null; }
            });
        }, { threshold: 0.1 });
        obs.observe(section);
    }

    // ========== INIT ==========
    renderProjects();
    initNav();
    initSimulation();
    initStepAnimations();
    initDigitalRain();
});

// ================================================================
// CONSTELLATION BACKGROUND — runs independently
// ================================================================
(function () {
    const canvas = document.getElementById('constellation-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ---------- CONFIG ----------
    const CFG = {
        particleCount: 120,
        linkDistance: 140,
        linkOpacity: 0.18,
        mouseRadius: 180,
        mouseLinkOpacity: 0.35,
        speed: 0.3,
        minSize: 1,
        maxSize: 2.8,
        colors: [
            'rgba(0,229,255,',   // cyan
            'rgba(100,200,255,', // light blue
            'rgba(200,220,255,', // white-blue
            'rgba(255,255,255,', // white
        ],
        glowColors: [
            'rgba(0,229,255,0.15)',
            'rgba(100,200,255,0.10)',
        ]
    };

    let W, H;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };
    let animId;

    // ---------- RESIZE ----------
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // ---------- MOUSE ----------
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    // Allow clicks to pass through
    canvas.style.pointerEvents = 'none';

    // ---------- PARTICLE ----------
    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * CFG.speed;
            this.vy = (Math.random() - 0.5) * CFG.speed;
            this.size = CFG.minSize + Math.random() * (CFG.maxSize - CFG.minSize);
            this.colorIdx = Math.random() * CFG.colors.length | 0;
            this.baseAlpha = 0.4 + Math.random() * 0.6;
            this.pulse = Math.random() * Math.PI * 2; // phase offset
        }
        update() {
            this.pulse += 0.015;
            const alpha = this.baseAlpha + Math.sin(this.pulse) * 0.15;
            this.currentAlpha = Math.max(0.2, Math.min(1, alpha));

            this.x += this.vx;
            this.y += this.vy;

            // Mouse repulsion
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CFG.mouseRadius && dist > 0) {
                const force = (CFG.mouseRadius - dist) / CFG.mouseRadius * 0.015;
                this.vx += (dx / dist) * force;
                this.vy += (dy / dist) * force;
            }

            // Speed damping
            this.vx *= 0.999;
            this.vy *= 0.999;

            // Wrap edges
            if (this.x < -10) this.x = W + 10;
            if (this.x > W + 10) this.x = -10;
            if (this.y < -10) this.y = H + 10;
            if (this.y > H + 10) this.y = -10;
        }
        draw() {
            const col = CFG.colors[this.colorIdx];

            // Glow
            if (this.size > 1.8) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = CFG.glowColors[this.colorIdx % CFG.glowColors.length];
                ctx.fill();
            }

            // Core dot
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = col + this.currentAlpha + ')';
            ctx.fill();
        }
    }

    // ---------- INIT PARTICLES ----------
    function initParticles() {
        particles = [];
        for (let i = 0; i < CFG.particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    // ---------- DRAW LINKS ----------
    function drawLinks() {
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];

            // Links between particles
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CFG.linkDistance) {
                    const opacity = (1 - dist / CFG.linkDistance) * CFG.linkOpacity;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(0,229,255,${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Links to mouse
            const mdx = a.x - mouse.x;
            const mdy = a.y - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < CFG.mouseRadius) {
                const opacity = (1 - mDist / CFG.mouseRadius) * CFG.mouseLinkOpacity;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(0,229,255,${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    // ---------- LOOP ----------
    function loop() {
        ctx.clearRect(0, 0, W, H);

        for (const p of particles) {
            p.update();
            p.draw();
        }

        drawLinks();

        // Mouse cursor glow
        if (mouse.x > 0 && mouse.y > 0) {
            const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, CFG.mouseRadius * 0.6);
            grad.addColorStop(0, 'rgba(0,229,255,0.06)');
            grad.addColorStop(1, 'rgba(0,229,255,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(mouse.x - CFG.mouseRadius, mouse.y - CFG.mouseRadius, CFG.mouseRadius * 2, CFG.mouseRadius * 2);
        }

        animId = requestAnimationFrame(loop);
    }
    loop();

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cancelAnimationFrame(animId);
        // Draw a single static frame
        for (const p of particles) { p.update(); p.draw(); }
        drawLinks();
    }
})();
