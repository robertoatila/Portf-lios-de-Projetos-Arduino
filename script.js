/**
 * Portfólio Arduino - Script Principal
 * Arquitetura Vanilla JS (ES6+) baseada em módulos lógicos (IIFEs e Closures)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ════════════════════════════════════════════════
    // 1. UTILITÁRIOS E ESTADO GLOBAL
    // ════════════════════════════════════════════════
    
    // Utilitário de formatação de código Arduino C++
    const highlightCode = (code) => {
        // Escapar HTML
        let escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        // Comentários (// ou /* */)
        escaped = escaped.replace(/(\/\/.*$)/gm, '<span class="token-comment">$1</span>');
        escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token-comment">$1</span>');
        
        // Diretivas do pre-processador (#include, #define)
        escaped = escaped.replace(/^(#\w+.*)$/gm, '<span class="token-directive">$1</span>');
        
        // Palavras-chave
        const keywords = ['void', 'int', 'float', 'bool', 'char', 'long', 'if', 'else', 'for', 'while', 'return', 'const'];
        const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
        escaped = escaped.replace(keywordRegex, '<span class="token-keyword">$1</span>');
        
        // Constantes do Arduino
        const constants = ['HIGH', 'LOW', 'INPUT', 'OUTPUT', 'INPUT_PULLUP', 'true', 'false'];
        const constRegex = new RegExp(`\\b(${constants.join('|')})\\b`, 'g');
        escaped = escaped.replace(constRegex, '<span class="token-keyword">$1</span>');
        
        // Funções do Arduino (pinMode, digitalWrite, etc)
        const functions = ['setup', 'loop', 'pinMode', 'digitalWrite', 'digitalRead', 'analogRead', 'analogWrite', 'delay', 'Serial', 'begin', 'print', 'println', 'tone', 'noTone', 'pulseIn'];
        const funcRegex = new RegExp(`\\b(${functions.join('|')})(?=\\s*\\()`, 'g');
        escaped = escaped.replace(funcRegex, '<span class="token-function">$1</span>');
        
        // Strings ("texto")
        escaped = escaped.replace(/("[^"]*")/g, '<span class="token-string">$1</span>');
        
        // Números
        escaped = escaped.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token-number">$1</span>');
        
        return escaped;
    };

    // ════════════════════════════════════════════════
    // 2. SISTEMA DE LOADING (BOOT SCREEN)
    // ════════════════════════════════════════════════
    const initLoadingScreen = () => {
        const loadingScreen = document.getElementById('boot-screen');
        const lines = document.querySelectorAll('.loading-lines .line');
        const progressBar = document.getElementById('loading-bar');
        
        if (!loadingScreen) return;
        
        // Animação das linhas do terminal
        lines.forEach(line => {
            const delay = parseInt(line.getAttribute('data-delay') || '0');
            setTimeout(() => {
                line.classList.add('show');
            }, delay);
        });
        
        // Barra de progresso (aumenta o delay para simular um processo mais longo e visível)
        setTimeout(() => {
            if(progressBar) progressBar.style.width = '100%';
        }, 300);
        
        // Ocultar overlay após a sequência (aproximadamente 2s a 2.5s)
        setTimeout(() => {
            loadingScreen.classList.add('done');
            document.body.style.overflow = 'auto'; // Reativar scroll
            
            // Iniciar animações iniciais de scroll reveal
            setTimeout(() => {
                const reveals = document.querySelectorAll('[data-reveal]');
                reveals.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                });
            }, 300);
            
        }, 2200);
    };

    // Bloquear scroll durante o loading
    document.body.style.overflow = 'hidden';
    initLoadingScreen();

    // ════════════════════════════════════════════════
    // 3. CURSOR CUSTOMIZADO
    // ════════════════════════════════════════════════
    const initCursor = () => {
        const cursor = document.getElementById('cursor');
        if (!cursor) return;

        // Desativar em telas pequenas (touch)
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            return;
        }

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        // Suavização do cursor
        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.classList.remove('hidden');
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.add('hidden');
        });

        document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
        document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

        // Efeitos de hover
        const hoverElements = document.querySelectorAll('a, button, .card, .step-card, .comp-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    };
    initCursor();

    // ════════════════════════════════════════════════
    // 4. RENDERIZAÇÃO DOS PROJETOS
    // ════════════════════════════════════════════════
    const renderProjects = () => {
        const grid = document.getElementById('projects-grid');
        if (!grid || typeof projectsData === 'undefined') return;

        grid.innerHTML = projectsData.map((project, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            const delay = (index % 3) * 100;
            
            // Usando conceitos em vez de componentes para a tag principal do card se disponíveis
            const conceptsHtml = (project.concepts || project.components.slice(0,3)).map(concept => 
                `<span class="concept-tag">${concept}</span>`
            ).join('');

            return `
                <article class="card" data-reveal="scale" style="--reveal-delay: ${delay}ms">
                    <span class="project-number">${indexStr}</span>
                    <div class="card-header">
                        <h3 class="card-title">${project.title}</h3>
                    </div>
                    <div class="card-concepts">${conceptsHtml}</div>
                    <p class="card-desc">${project.description}</p>
                    <button class="card-btn view-code-btn" data-id="${project.id}" aria-label="Visualizar código do projeto ${project.title}">
                        Ver Código-fonte
                    </button>
                </article>
            `;
        }).join('');
    };
    renderProjects();

    // ════════════════════════════════════════════════
    // 5. SISTEMA MODAL
    // ════════════════════════════════════════════════
    const initModal = () => {
        const modal = document.getElementById('code-modal');
        const closeBtn = document.getElementById('close-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalCode = document.getElementById('modal-code');
        const modalDifficulty = document.getElementById('modal-difficulty');
        const modalComponents = document.getElementById('modal-components');
        const copyBtn = document.getElementById('copy-code-btn');
        const copyBtnText = document.getElementById('copy-btn-text');
        
        let currentCode = '';

        if (!modal) return;

        const openModal = (projectId) => {
            const project = projectsData.find(p => p.id === projectId);
            if (!project) return;

            currentCode = project.code;
            modalTitle.textContent = project.title;
            modalCode.innerHTML = highlightCode(project.code);
            
            // Setup meta data
            modalDifficulty.textContent = project.difficulty === 1 ? 'Iniciante' : project.difficulty === 2 ? 'Intermediário' : 'Avançado';
            modalDifficulty.setAttribute('data-level', project.difficulty);
            
            modalComponents.innerHTML = project.components.map(comp => `<li>${comp}</li>`).join('');

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // block scroll
            
            // Reset copy button
            copyBtn.classList.remove('copied');
            copyBtnText.textContent = 'Copiar';
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // restore scroll
        };

        // Event Listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-code-btn')) {
                const btn = e.target.closest('.view-code-btn');
                openModal(btn.getAttribute('data-id'));
            }
        });

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });

        // Copiar código
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(currentCode).then(() => {
                copyBtn.classList.add('copied');
                copyBtnText.textContent = 'Copiado!';
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtnText.textContent = 'Copiar';
                }, 2000);
            });
        });
    };
    initModal();

    // ════════════════════════════════════════════════
    // 6. SCROLL E NAVEGAÇÃO
    // ════════════════════════════════════════════════
    const initScrollFeatures = () => {
        const nav = document.getElementById('site-nav');
        const progressBar = document.getElementById('scroll-progress');
        const backToTop = document.getElementById('back-to-top');
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links .nav-link');
        const circuitDividers = document.querySelectorAll('.circuit-divider');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Navbar glassmorphism
            if (scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Barra de progresso
            if (progressBar && docHeight > 0) {
                const progress = (scrollY / docHeight) * 100;
                progressBar.style.width = `${progress}%`;
            }

            // Back to top
            if (backToTop) {
                if (scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }

            // Active links
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            // Desenhar SVG do circuit divider
            circuitDividers.forEach(divider => {
                const rect = divider.getBoundingClientRect();
                if(rect.top < window.innerHeight && rect.bottom > 0) {
                    divider.classList.add('drawn');
                }
            });
        });

        // Voltar ao topo click
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Menu mobile
        const menuBtn = document.getElementById('nav-menu-btn');
        const navLinksContainer = document.getElementById('nav-links');
        
        if (menuBtn && navLinksContainer) {
            menuBtn.addEventListener('click', () => {
                const isOpen = navLinksContainer.classList.contains('open');
                navLinksContainer.classList.toggle('open');
                menuBtn.setAttribute('aria-expanded', !isOpen);
                menuBtn.textContent = isOpen ? '☰' : '✕';
            });
            
            // Fechar ao clicar num link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navLinksContainer.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    menuBtn.textContent = '☰';
                });
            });
        }
    };
    initScrollFeatures();

    // ════════════════════════════════════════════════
    // 7. OBSERVER DE REVEAL (Animações de entrada)
    // ════════════════════════════════════════════════
    const initScrollReveal = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: observer.unobserve(entry.target) para animar só uma vez
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    };
    initScrollReveal();

    // ════════════════════════════════════════════════
    // 8. EFEITO TYPEWRITER
    // ════════════════════════════════════════════════
    const initTypewriter = () => {
        const textElement = document.getElementById('typewriter-text');
        if (!textElement) return;

        const words = ['Criar.', 'Automatizar.', 'Inovar.', 'Conectar.', 'Controlar.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        // Delay inicial para dar tempo da loading screen sair
        setTimeout(() => {
            type();
        }, 2500);

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 120;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pausa no final da palavra
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pausa antes da próxima palavra
            }

            setTimeout(type, typeSpeed);
        }
    };
    initTypewriter();

    // ════════════════════════════════════════════════
    // 9. BACKGROUND DE CONSTELAÇÃO
    // ════════════════════════════════════════════════
    const initConstellation = () => {
        const canvas = document.getElementById('constellation-bg');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        // Usar prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            canvas.style.display = 'none';
            return;
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 212, 255, 0.4)';
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(Math.floor((width * height) / 15000), 100);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 - (dist / 120) * 0.1})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();
    };
    initConstellation();
    
    // ════════════════════════════════════════════════
    // 10. DIGITAL RAIN (MATRIX) PARA SEÇÃO FUTURO
    // ════════════════════════════════════════════════
    const initDigitalRain = () => {
        const canvas = document.getElementById('digital-rain');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const section = canvas.parentElement;
        
        // Usar prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            canvas.style.display = 'none';
            return;
        }

        let width, height;
        let columns;
        let drops = [];
        const chars = "01".split("");

        const resize = () => {
            const rect = section.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width;
            canvas.height = height;
            
            const fontSize = 14;
            columns = width / fontSize;
            drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
        };

        const draw = () => {
            // Fundo translúcido para criar rastro
            ctx.fillStyle = "rgba(5, 5, 9, 0.05)";
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = "rgba(0, 212, 255, 0.3)";
            ctx.font = "14px monospace";
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 14, drops[i] * 14);
                
                if (drops[i] * 14 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        window.addEventListener('resize', resize);
        resize();
        
        // Só animar quando visível
        let rainInterval;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    if(!rainInterval) rainInterval = setInterval(draw, 50);
                } else {
                    clearInterval(rainInterval);
                    rainInterval = null;
                }
            });
        });
        observer.observe(section);
    };
    initDigitalRain();

    // ════════════════════════════════════════════════
    // 11. SIMULAÇÃO DOS LEDS
    // ════════════════════════════════════════════════
    const initSimulation = () => {
        const startBtn = document.getElementById('sim-start');
        const stopBtn = document.getElementById('sim-stop');
        const statusEl = document.getElementById('sim-status');
        const speedRange = document.getElementById('sim-speed-range');
        const speedValue = document.getElementById('sim-speed-value');
        const codeDisplay = document.getElementById('sim-code-display');
        
        let simInterval;
        let currentLed = 1;
        let isRunning = false;
        
        // Encontrar o código do PISCANTE no data.js, fallback se não achar
        let piscanteCode = `void setup() {
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
}
void loop() {
  digitalWrite(8, HIGH); delay(500);
  digitalWrite(8, LOW);
  digitalWrite(9, HIGH); delay(500);
  digitalWrite(9, LOW);
  digitalWrite(10, HIGH); delay(500);
  digitalWrite(10, LOW);
  digitalWrite(11, HIGH); delay(500);
  digitalWrite(11, LOW);
}`;
        if(typeof projectsData !== 'undefined') {
            const p = projectsData.find(p => p.title.toLowerCase().includes('piscante'));
            if(p) piscanteCode = p.code;
        }
        
        if (codeDisplay) {
            codeDisplay.innerHTML = highlightCode(piscanteCode);
        }

        const leds = [
            document.getElementById('sim-led-1'),
            document.getElementById('sim-led-2'),
            document.getElementById('sim-led-3'),
            document.getElementById('sim-led-4')
        ].filter(Boolean); // Remover nulos caso existam

        const resetLeds = () => {
            leds.forEach(led => {
                led.classList.remove('sim-led--on');
                led.style.setProperty('--led-glow', 'transparent');
            });
        };

        const step = () => {
            resetLeds();
            const activeLed = leds[currentLed - 1];
            if(activeLed) {
                const color = activeLed.getAttribute('data-color');
                activeLed.classList.add('sim-led--on');
                activeLed.style.setProperty('--led-glow', color);
                statusEl.innerHTML = `LIGADO: <span style="color:${color}">LED A${currentLed}</span>`;
            }
            currentLed = currentLed >= leds.length ? 1 : currentLed + 1;
        };

        const startSim = () => {
            if (isRunning) return;
            isRunning = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            
            const speed = parseInt(speedRange.value);
            step(); // executa imediato
            simInterval = setInterval(step, speed);
        };

        const stopSim = () => {
            if (!isRunning) return;
            isRunning = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            
            clearInterval(simInterval);
            resetLeds();
            statusEl.textContent = 'Simulação pausada';
            currentLed = 1;
        };

        const updateSpeed = () => {
            speedValue.textContent = `${speedRange.value}ms`;
            if (isRunning) {
                clearInterval(simInterval);
                simInterval = setInterval(step, parseInt(speedRange.value));
            }
        };

        if (startBtn && stopBtn && speedRange) {
            startBtn.addEventListener('click', startSim);
            stopBtn.addEventListener('click', stopSim);
            speedRange.addEventListener('input', updateSpeed);
        }
        
        // Destacar código pre-carregado
        const preElements = document.querySelectorAll('.lang-code-block code');
        preElements.forEach(block => {
            const code = block.textContent;
            block.innerHTML = highlightCode(code);
        });
    };
    initSimulation();
    
    // ════════════════════════════════════════════════
    // 12. PARALLAX NA HERO (Tilt 3D)
    // ════════════════════════════════════════════════
    const initParallax = () => {
        const visual = document.getElementById('hero-visual-wrapper');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!visual || prefersReducedMotion || window.innerWidth <= 768) return;
        
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 25;
            const y = (window.innerHeight / 2 - e.clientY) / 25;
            
            visual.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
            visual.style.transition = 'transform 0.1s ease-out';
        });
        
        document.addEventListener('mouseleave', () => {
            visual.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            visual.style.transition = 'transform 0.5s ease-out';
        });
    };
    initParallax();
});
