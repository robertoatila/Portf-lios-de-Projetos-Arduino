document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Forçar rolagem pro topo no F5 (reload)
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Utilitários de Performance e Acessibilidade
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Debounce Helper
    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Syntax Highlight C++
    const highlightSyntax = (code) => {
        if (!code) return '';
        
        let htmlEscaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        const strings = [];
        htmlEscaped = htmlEscaped.replace(/(".*?")/g, (match) => {
            strings.push(match);
            return `__STR_${strings.length - 1}__`;
        });
        
        const comments = [];
        htmlEscaped = htmlEscaped.replace(/(\/\/.*)/g, (match) => {
            comments.push(match);
            return `__COM_${comments.length - 1}__`;
        });
        
        htmlEscaped = htmlEscaped
            .replace(/\b(int|void|const|char|float|bool|long|String)\b/g, '<span class="token-keyword">$1</span>')
            .replace(/\b(HIGH|LOW|OUTPUT|INPUT|INPUT_PULLUP|true|false)\b/g, '<span class="token-keyword">$1</span>')
            .replace(/\b(digitalWrite|digitalRead|pinMode|delay|setup|loop|analogRead|analogWrite|Serial|begin|print|println|tone|noTone|pulseIn)\b/g, '<span class="token-function">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
            
        htmlEscaped = htmlEscaped.replace(/__COM_(\d+)__/g, (match, p1) => {
            return `<span class="token-comment">${comments[p1]}</span>`;
        });
        
        htmlEscaped = htmlEscaped.replace(/__STR_(\d+)__/g, (match, p1) => {
            return `<span style="color: #ce9178;">${strings[p1]}</span>`;
        });
            
        // Separar em linhas
        const lines = htmlEscaped.split('\n');
        return lines.map(line => `<span class="code-line">${line || ' '}</span>`).join('\n');
    };

    // 1. BOOT SCREEN & TYPEWRITER
    const initBootAndTypewriter = () => {
        const bootScreen = document.getElementById('boot-screen');
        const bootLines = document.getElementById('boot-lines');
        const bootBar = document.getElementById('boot-bar');
        const bootPct = document.getElementById('boot-pct');
        const typeText = document.getElementById('typewriter-text');
        const subtitle = document.getElementById('hero-subtitle');

        let typewriterStarted = false;
        
        const startTypewriter = () => {
            if (typewriterStarted || !typeText) return;
            typewriterStarted = true;
            
            const text = "A imaginação ganha vida com código.";
            let i = 0;
            
            if (subtitle) {
                subtitle.style.opacity = '0';
                subtitle.style.transition = 'opacity 1s ease';
            }
            
            const type = () => {
                if (i < text.length) {
                    typeText.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, Math.random() * 50 + 50);
                } else {
                    if (subtitle) subtitle.style.opacity = '1';
                }
            };
            type();
        };

        if (bootScreen && bootLines && bootBar && bootPct) {
            if (sessionStorage.getItem('booted') === 'true') {
                bootScreen.style.display = 'none';
                if (typeText) typeText.textContent = "A imaginação ganha vida com código.";
                if (subtitle) {
                    subtitle.style.opacity = '1';
                    subtitle.style.transition = 'none';
                }
                return;
            }

            const messages = [
                "avr-gcc: compiling sketch...",
                "avr-g++: compiling core...",
                "avr-gcc: linking objects...",
                "avr-objcopy: generating hex...",
                "avrdude: uploading to /dev/ttyUSB0...",
                "avrdude: verify successful.",
                "BOOT COMPLETE."
            ];
            
            let progress = 0;
            let msgIndex = 0;
            
            // Preparar bootLines para múltiplas linhas
            bootLines.innerHTML = '';
            
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 15) + 5;
                if (progress >= 100) progress = 100;
                
                bootPct.textContent = `${progress}%`;
                bootBar.style.setProperty('--progress', `${progress}%`);
                
                // Adicionar linhas dependendo do progresso
                const targetMsgIndex = Math.floor((progress / 100) * messages.length);
                const frag = document.createDocumentFragment();
                while (msgIndex < targetMsgIndex && msgIndex < messages.length) {
                    const p = document.createElement('div');
                    p.textContent = `> ${messages[msgIndex]}`;
                    frag.appendChild(p);
                    msgIndex++;
                }
                if (frag.childNodes.length > 0) bootLines.appendChild(frag);
                
                if (progress === 100) {
                    sessionStorage.setItem('booted', 'true');
                    clearInterval(interval);
                    setTimeout(() => {
                        bootScreen.style.opacity = '0';
                        bootScreen.style.visibility = 'hidden';
                        bootScreen.addEventListener('transitionend', () => {
                            bootScreen.style.display = 'none';
                            startTypewriter();
                        }, { once: true });
                    }, 600);
                }
            }, 100);

            // Fallback de segurança
            setTimeout(() => {
                if (bootScreen.style.display !== 'none') {
                    sessionStorage.setItem('booted', 'true');
                    bootScreen.style.display = 'none';
                    startTypewriter();
                }
            }, 2500);
        } else {
            startTypewriter();
        }
    };

    // 2. CUSTOM CURSOR
    const initCustomCursor = () => {
        if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
        
        const cursor = document.getElementById('cursor');
        if (!cursor) return;
        
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(updateCursor);
        };
        updateCursor();
        
        const addCursorHover = () => {
            const interactables = document.querySelectorAll('a, button, .project-card, .comp-card, .future-card, .board-figure, .step-card, input[type="range"]');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
                el.addEventListener('mousedown', () => cursor.classList.add('clicking'));
                el.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
            });
        };
        addCursorHover();
        window.addCursorHover = addCursorHover;
    };

    // 3. NAVIGATION & SCROLL
    const initNavigation = () => {
        const nav = document.getElementById('site-nav');
        const menuBtn = document.getElementById('nav-menu-btn');
        const navLinks = document.getElementById('nav-links');
        const links = document.querySelectorAll('.nav-link');
        const progress = document.getElementById('scroll-progress');
        const backToTop = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Navbar Glassmorphism
            if (nav) {
                if (scrollY > 50) nav.classList.add('scrolled');
                else nav.classList.remove('scrolled');
            }
            
            // Scroll Progress & Back to Top
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (progress && height > 0) {
                const scrolled = (winScroll / height) * 100;
                progress.style.width = scrolled + "%";
            }
            
            if (backToTop) {
                if (scrollY > 500) backToTop.classList.add('visible');
                else backToTop.classList.remove('visible');
            }
        }, { passive: true });
        
        // Mobile Menu
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
                menuBtn.setAttribute('aria-expanded', !expanded);
                navLinks.classList.toggle('active');
            });
            
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                });
            });
        }
        
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Active Nav Link via IntersectionObserver
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    links.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });
        
        sections.forEach(sec => observer.observe(sec));
    };

    // 4. SCROLL REVEAL & CIRCUIT DIVIDERS
    const initScrollReveal = () => {
        if (prefersReducedMotion) {
            document.querySelectorAll('[data-reveal], h2, .circuit-divider').forEach(el => el.classList.add('is-visible'));
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        window.observeElements = (elements) => {
            elements.forEach(el => observer.observe(el));
        };
        
        window.observeElements(document.querySelectorAll('[data-reveal], h2, .circuit-divider'));
    };

    // 5. HERO PARALLAX & 3D TILT CARDS
    const initInteractions = () => {
        if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
        
        const heroBadge = document.getElementById('hero-badge');
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.getElementById('hero-visual-wrapper') || document.getElementById('hero-visual');
        const tiltCards = document.querySelectorAll('.future-card');
        
        let heroVisible = true;
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const observer = new IntersectionObserver((entries) => {
                heroVisible = entries[0].isIntersecting;
            });
            observer.observe(heroSection);
        }

        window.addEventListener('mousemove', (e) => {
            if (!heroVisible) return;
            
            // Hero Parallax
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            requestAnimationFrame(() => {
                if (heroBadge) heroBadge.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
                if (heroContent) heroContent.style.transform = `translate(${x * -0.5}px, ${y * -0.5}px)`;
                if (heroVisual) heroVisual.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px) rotate(${x * 0.1}deg)`;
            });
        });

        // 3D Tilt Future Cards
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    };

    // 6. CANVAS: CONSTELAÇÃO
    const initConstellation = () => {
        const canvas = document.getElementById('constellation-bg');
        if (!canvas || prefersReducedMotion) return;
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let particles = [];
        const numParticles = 120;
        const mouse = { x: null, y: null, radius: 150 };
        
        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', debounce(resize, 200));
        resize();
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.density = (Math.random() * 30) + 1;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;
                    
                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
        
        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance/100})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
            animationId = requestAnimationFrame(animate);
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!animationId) animate();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
        observer.observe(canvas.parentElement);
    };

    // 7. CANVAS: DIGITAL RAIN
    const initDigitalRain = () => {
        const canvas = document.getElementById('digital-rain');
        if (!canvas || prefersReducedMotion) return;
        const ctx = canvas.getContext('2d');
        
        let width, height;
        const resize = () => {
            const parent = canvas.parentElement;
            width = canvas.width = parent.offsetWidth;
            height = canvas.height = parent.offsetHeight;
        };
        window.addEventListener('resize', debounce(resize, 200));
        resize();
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン'.split('');
        const fontSize = 14;
        let columns = Math.floor(width / fontSize);
        const drops = [];
        for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100; // random start offset
        
        let animationId;
        const draw = () => {
            ctx.fillStyle = 'rgba(5, 5, 9, 0.1)';
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = 'rgba(0, 212, 255, 0.5)'; // neon cyan rain
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                if (drops[i] * fontSize >= 0) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                }
                
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationId = requestAnimationFrame(draw);
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!animationId) draw();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
        observer.observe(canvas.parentElement);
    };

    // 8. SIMULAÇÃO LEDs
    const initSimulation = () => {
        const startBtn = document.getElementById('sim-start');
        const stopBtn = document.getElementById('sim-stop');
        const speedRange = document.getElementById('sim-speed-range');
        const speedValue = document.getElementById('sim-speed-value');
        const statusEl = document.getElementById('sim-status');
        const codeDisplay = document.getElementById('sim-code-display');
        const leds = [
            document.getElementById('sim-led-1'),
            document.getElementById('sim-led-2'),
            document.getElementById('sim-led-3'),
            document.getElementById('sim-led-4')
        ];
        
        if (!startBtn || !stopBtn || !speedRange) return;
        
        // Preview do código
        let currentSimCode = '';
        if (window.projects && codeDisplay) {
            const projPiscante = window.projects.find(p => p.id === "piscante" || p.id === 1);
            if (projPiscante) {
                currentSimCode = projPiscante.code;
                codeDisplay.innerHTML = highlightSyntax(currentSimCode);
            }
        }
        
        // Copiar código da simulação
        const simCopyBtn = document.getElementById('sim-copy-btn');
        const simCopyText = document.getElementById('sim-copy-text');
        if (simCopyBtn && currentSimCode) {
            simCopyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(currentSimCode).then(() => {
                    const originalText = simCopyText.textContent;
                    simCopyText.textContent = 'Copiado!';
                    simCopyBtn.style.color = '#44ff88';
                    setTimeout(() => {
                        simCopyText.textContent = originalText;
                        simCopyBtn.style.color = '';
                    }, 2000);
                }).catch(err => console.error('Erro ao copiar código: ', err));
            });
        }
        
        let intervalId = null;
        let currentLed = 0;
        let speed = parseInt(speedRange.value);
        
        const updateLeds = () => {
            leds.forEach(led => led.classList.remove('active'));
            if (leds[currentLed]) {
                const color = leds[currentLed].dataset.color;
                leds[currentLed].style.setProperty('--color-active', color);
                leds[currentLed].classList.add('active');
            }
            currentLed = (currentLed + 1) % leds.length;
        };
        
        const play = () => {
            if (intervalId) clearInterval(intervalId);
            startBtn.disabled = true;
            stopBtn.disabled = false;
            statusEl.textContent = 'Simulação em execução...';
            statusEl.style.color = '#44ff88';
            updateLeds();
            intervalId = setInterval(updateLeds, speed);
        };
        
        const stop = () => {
            if (intervalId) clearInterval(intervalId);
            intervalId = null;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            statusEl.textContent = 'Simulação pausada';
            statusEl.style.color = 'var(--neon-cyan)';
            leds.forEach(led => led.classList.remove('active'));
            currentLed = 0;
        };
        
        startBtn.addEventListener('click', play);
        stopBtn.addEventListener('click', stop);
        
        speedRange.addEventListener('input', (e) => {
            speed = parseInt(e.target.value);
            speedValue.textContent = `${speed}ms`;
            if (intervalId) play(); // reinicia com a nova velocidade
        });
    };

    // 9. HARDWARE MONITOR LOGIC
    const initHardwareMonitor = () => {
        const cpuBar = document.getElementById('hw-cpu');
        const tempBar = document.getElementById('hw-temp');
        const cpuVal = cpuBar?.parentElement?.nextElementSibling;
        const tempVal = tempBar?.parentElement?.nextElementSibling;

        if (!cpuBar || !tempBar) return;

        const updateStats = () => {
            const cpu = Math.floor(Math.random() * 30) + 5;
            const temp = Math.floor(Math.random() * 15) + 35;

            cpuBar.style.width = `${cpu}%`;
            tempBar.style.width = `${temp}%`;

            if (cpuVal) cpuVal.textContent = `${cpu}%`;
            if (tempVal) tempVal.textContent = `${temp}°C`;

            setTimeout(updateStats, Math.random() * 2000 + 1000);
        };

        updateStats();
    };

    // 10. RENDER PROJECTS & MODAL
    const initProjectsAndModal = () => {
        const grid = document.getElementById('projects-grid');
        const modal = document.getElementById('code-modal');
        const closeModalBtn = document.getElementById('close-modal');
        const copyBtn = document.getElementById('copy-code-btn');
        const copyText = document.getElementById('copy-btn-text');
        const searchInput = document.getElementById('project-search');
        
        let currentFilter = 'all';
        let searchQuery = '';

        // Renderizar projetos
        const renderProjects = () => {
            if (!grid || !window.projects) return;
            
            const filtered = window.projects.filter(p => {
                const matchesFilter = currentFilter === 'all' || p.difficulty.toLowerCase() === currentFilter;
                const matchesSearch = p.title.toLowerCase().includes(searchQuery) || 
                                     p.description.toLowerCase().includes(searchQuery) ||
                                     p.components.some(c => c.toLowerCase().includes(searchQuery));
                return matchesFilter && matchesSearch;
            });
                
            if (filtered.length === 0) {
                grid.innerHTML = `<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: var(--text-muted); font-family: var(--font-mono);">
                    <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;">404</div>
                    &gt; ERRO: NENHUM PROJETO ENCONTRADO PARA "${searchQuery.toUpperCase()}"_<br>
                    Verifique os filtros ou tente outra busca.
                </div>`;
                return;
            }
                
            grid.innerHTML = filtered.map((proj, index) => {
                const delay = (index % 3) * 100;
                const diffClass = proj.difficulty.toLowerCase().replace(/[éáíóú]/g, (m) => ({ 'é':'e', 'á':'a', 'í':'i', 'ó':'o', 'ú':'u' }[m] || m));
                
                const chips = proj.components.map(c => `<span class="comp-chip">${c}</span>`).join('');
                
                // Highlight search term
                let title = proj.title;
                if (searchQuery) {
                    const regex = new RegExp(`(${searchQuery})`, 'gi');
                    title = title.replace(regex, '<mark class="search-highlight">$1</mark>');
                }

                return `
                <article class="project-card" data-reveal style="--reveal-delay: ${delay}ms">
                    <span class="project-number">#${String(proj.id).padStart(2, '0')}</span>
                    <h3 class="project-title">${title}</h3>
                    <p class="project-desc">${proj.description}</p>
                    <div class="project-components">
                        ${chips}
                    </div>
                    <div class="project-footer">
                        <span class="badge-difficulty badge-${diffClass}">${proj.difficulty}</span>
                        <button class="project-btn" data-id="${proj.id}">Ver Código</button>
                    </div>
                </article>`;
            }).join('');
            
            // Observar novos elementos
            if (window.observeElements) window.observeElements(grid.querySelectorAll('[data-reveal]'));
            if (window.addCursorHover) window.addCursorHover();
        };

        if (grid) {
            renderProjects();
            grid.style.transition = 'opacity 0.3s ease';
            
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.filter;
                    
                    grid.style.opacity = '0';
                    setTimeout(() => {
                        renderProjects();
                        grid.style.opacity = '1';
                    }, 300);
                });
            });

            if (searchInput) {
                searchInput.addEventListener('input', debounce((e) => {
                    searchQuery = e.target.value.toLowerCase().trim();
                    renderProjects();
                }, 300));
            }
        }

        if (!modal) return;

        let previousActiveElement = null;

        // Funções do Modal
        const openModal = (proj) => {
            previousActiveElement = document.activeElement;
            window.location.hash = `#projeto-${proj.id}`;
            document.getElementById('modal-title').textContent = proj.title;
            const diffClass = proj.difficulty.toLowerCase().replace(/[éáíóú]/g, (m) => ({ 'é':'e', 'á':'a', 'í':'i', 'ó':'o', 'ú':'u' }[m] || m));
            const diffBadge = document.getElementById('modal-difficulty');
            if (diffBadge) {
                diffBadge.textContent = proj.difficulty;
                diffBadge.className = `badge-difficulty badge-${diffClass}`;
            }
            
            const componentsList = document.getElementById('modal-components');
            if (componentsList) {
                componentsList.innerHTML = proj.components.map(c => `<li>${c}</li>`).join('');
            }
            
            const codeEl = document.getElementById('modal-code');
            if (codeEl) {
                codeEl.innerHTML = highlightSyntax(proj.code);
            }
            
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // block bg scroll
            
            // Focus trap completo
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            
            if (firstElement) {
                setTimeout(() => firstElement.focus(), 100);
            }
        };

        const closeModal = () => {
            window.history.pushState('', document.title, window.location.pathname + window.location.search);
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            if (previousActiveElement) {
                previousActiveElement.focus();
            }
        };

        // Event Delegation para botões de projeto
        if (grid) {
            grid.addEventListener('click', (e) => {
                const btn = e.target.closest('.project-btn');
                if (!btn) return;
                const id = btn.dataset.id;
                const proj = window.projects.find(p => String(p.id) === String(id));
                if (proj) openModal(proj);
            });
        }

        // Fechar modal eventos
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        window.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeModal();
            }
            
            // Focus Trap Logic
            if (e.key === 'Tab') {
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusableElements.length === 0) return;
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement || !modal.contains(document.activeElement)) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement || !modal.contains(document.activeElement)) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });

        // Copy to clipboard
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const codeEl = document.getElementById('modal-code');
                if (!codeEl) return;
                
                navigator.clipboard.writeText(codeEl.textContent).then(() => {
                    copyBtn.classList.add('copied');
                    if (copyText) copyText.textContent = '✓ Copiado';
                    
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        if (copyText) copyText.textContent = 'Copiar';
                    }, 2200);
                }).catch(err => console.error('Erro ao copiar código: ', err));
            });
        }
        
        // Deep Linking (Hash On Load)
        if (window.location.hash && window.location.hash.startsWith('#projeto-')) {
            const hashId = window.location.hash.replace('#projeto-', '');
            const proj = window.projects.find(p => String(p.id) === String(hashId));
            if (proj) {
                setTimeout(() => openModal(proj), 500); // pequeno atraso para a página estabilizar
            }
        }
    };

    // Inicialização da Arquitetura
    initBootAndTypewriter();
    initCustomCursor();
    initNavigation();
    initScrollReveal();
    initInteractions();
    initConstellation();
    initDigitalRain();
    initSimulation();
    initHardwareMonitor();
    initProjectsAndModal();
});
