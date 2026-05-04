document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const modal = document.getElementById('code-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCode = document.getElementById('modal-code');
    const closeModalBtn = document.getElementById('close-modal');

    // Renderizar os cards
    function renderProjects() {
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <h3 class="card-title">${project.title}</h3>
                <p class="card-desc">${project.description}</p>
                <button class="card-btn" data-id="${project.id}">Ver Código Fonte</button>
            `;
            
            projectsGrid.appendChild(card);
        });

        // Adicionar event listeners aos botões recém-criados
        document.querySelectorAll('.card-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.target.getAttribute('data-id');
                openModal(projectId);
            });
        });
    }

    // Lógica do Modal
    function openModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (project) {
            modalTitle.textContent = project.title;
            modalCode.textContent = project.code;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll do body
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    closeModalBtn.addEventListener('click', closeModal);

    // Fechar modal clicando fora do conteúdo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Inicializar
    renderProjects();
});
