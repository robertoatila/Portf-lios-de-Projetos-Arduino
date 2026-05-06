document.addEventListener('DOMContentLoaded', () => {
    // ════════════════════════════════════════════════
    // CURSOR CUSTOMIZADO
    // ════════════════════════════════════════════════
    const initCursor = () => {
        // Checar se body tem id cursor, ou criar um dinamicamente se não existir
        let cursor = document.getElementById('cursor');
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.id = 'cursor';
            cursor.className = 'custom-cursor hidden';
            document.body.appendChild(cursor);
        }

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

        // Efeitos de hover dinâmicos (event delegation)
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .card, .step-card, .comp-card, .sim-led, input[type="range"]')) {
                cursor.classList.add('hovering');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .card, .step-card, .comp-card, .sim-led, input[type="range"]')) {
                cursor.classList.remove('hovering');
            }
        });
    };
    initCursor();
});
