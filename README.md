<div align="center">

# ⚡ Portfólio & Plataforma Educativa Arduino

**Uma experiência web imersiva, interativa e educativa sobre o universo Arduino.**

Construído do zero com estética **Sci-Fi / High-Tech**, fundo de constelação interativo,
animações holográficas e Glassmorphism — tudo em **Vanilla JS puro**. Zero frameworks, zero npm.

[![Status](https://img.shields.io/badge/🟢_Status-Ativo-00e5ff?style=for-the-badge&labelColor=0d1117)](#)
[![Stack](https://img.shields.io/badge/Stack-HTML5_|_CSS3_|_JS_ES6+-58a6ff?style=for-the-badge&labelColor=0d1117)](#)
[![Licença](https://img.shields.io/badge/Licença-MIT-3fb950?style=for-the-badge&labelColor=0d1117)](#)
[![Responsivo](https://img.shields.io/badge/📱_Responsivo-Sim-d29922?style=for-the-badge&labelColor=0d1117)](#)

</div>

---

## 📸 Visão Geral

| Recurso | Descrição |
|---------|-----------|
| 🌌 **Fundo Constelação** | Canvas com 120 partículas flutuantes, linhas de rede neural conectando nós próximos e interação em tempo real com o mouse (repulsão + linhas ao cursor) |
| 🔮 **Glassmorphism Sci-Fi** | Cards da seção "Futuro" com vidro jateado (`backdrop-filter: blur`), bordas neon ciano e scan-lines animadas |
| 🤖 **Ícones SVG Animados** | Globo com órbitas rotativas, robô com feixe de escaneamento, engrenagens girando e chuva de código binário |
| 💻 **Digital Rain (Matrix)** | Canvas independente com chuva de caracteres katakana + binário, ativado apenas via `IntersectionObserver` |
| ⚙️ **Simulação de LEDs** | Widget interativo que simula hardware Arduino no navegador com controle de velocidade em tempo real |
| 📝 **Syntax Highlighter** | Colorização de código C++ via Regex puro — sem Prism.js, sem highlight.js |
| 🧠 **Micro-painéis Diagnósticos** | Labels como `NET::CONNECTED` e `AI::PROCESSING` com dots piscantes em cada card futurista |
| ♿ **Acessibilidade WCAG** | `aria-labels`, Focus Trap em modais, navegação via teclado, `prefers-reduced-motion` |

---

## 🛠️ Stack Tecnológica

> **Filosofia: 100% Vanilla.** Abrir no navegador e funcionar. Sem `node_modules`, sem build, sem dependências.

| Camada | Tecnologia | Destaques |
|--------|------------|-----------|
| **Estrutura** | HTML5 Semântico | `<section>`, `<article>`, `<nav>` com `aria-*`, SEO otimizado |
| **Estilo** | CSS3 Vanilla | Custom Properties, Grid, Flexbox, `@keyframes`, Glassmorphism, filtros SVG |
| **Lógica** | JavaScript ES6+ | Canvas API, `IntersectionObserver`, `requestAnimationFrame`, IIFE modular |
| **Dados** | `data.js` | Array de objetos com `id`, `title`, `description`, `code`, `difficulty`, `components` |
| **Hardware** | Arduino C/C++ | 9 projetos embarcados documentados com código completo |

**Fontes utilizadas:**
- [`Inter`](https://fonts.google.com/specimen/Inter) — Textos e UI (pesos 300, 400, 600, 800)
- [`JetBrains Mono`](https://fonts.google.com/specimen/JetBrains+Mono) — Blocos de código e terminais

---

## 📂 Estrutura do Projeto

```
📁 Portf-lios-de-Projetos-Arduino/
│
├── 📄 index.html        → Estrutura completa (9 seções + modal + canvas)
├── 🎨 styles.css        → Design System (variáveis, neon, glassmorphism, responsive)
├── ⚡ script.js          → Engine: Constelação, Digital Rain, Simulação, Nav, Modal
├── 📦 data.js           → Base de dados: 9 projetos Arduino com código-fonte
└── 📖 README.md         → Esta documentação
```

---

## 🤖 Projetos Inclusos

| # | Projeto | Conceito Principal | Dificuldade |
|---|---------|-------------------|-------------|
| 1 | **Piscante (Blink)** | Manipulação de portas digitais | 🟢 Iniciante |
| 2 | **Semáforo** | Temporizadores e controle de fluxo | 🟢 Iniciante |
| 3 | **Super Mario Theme** | Frequências PWM com Buzzer | 🟡 Intermediário |
| 4 | **Game of Thrones Theme** | Controle avançado de melodias | 🟡 Intermediário |
| 5 | **Marcha Imperial** | Temporização de notas musicais | 🟡 Intermediário |
| 6 | **LEDs Sequenciais** | Arrays e laços `for` | 🟢 Iniciante |
| 7 | **Sinal de S.O.S** | Código Morse com LEDs | 🟢 Iniciante |
| 8 | **APAC** | Automação com sensores e relés | 🔴 Avançado |
| 9 | **LDR (Sensor de Luz)** | Leitura de dados analógicos | 🟢 Iniciante |

---

## 🚀 Como Executar

```bash
# 1. Clone o repositório
git clone https://github.com/robertoatila/portfolio-arduino.git

# 2. Entre na pasta
cd portfolio-arduino

# 3. Abra no navegador (ou use Live Server no VS Code)
start index.html
```

> **Nenhuma instalação é necessária.** Basta abrir o `index.html` em qualquer navegador moderno.

---

## 💡 Sugestões de Melhorias Futuras

Abaixo estão ideias para levar o projeto ao próximo nível, organizadas por categoria:

### 🔤 Tipografia & Fontes

| Sugestão | Descrição | Referência |
|----------|-----------|------------|
| **Fonte display para títulos** | Substituir `Inter 800` nos `<h1>`/`<h2>` por uma fonte display como [`Space Grotesk`](https://fonts.google.com/specimen/Space+Grotesk) ou [`Orbitron`](https://fonts.google.com/specimen/Orbitron) para reforçar a estética sci-fi | Google Fonts |
| **Fonte monospace alternativa** | Experimentar [`Fira Code`](https://fonts.google.com/specimen/Fira+Code) com ligatures para os blocos de código, dando visual de IDE profissional | Google Fonts |
| **Texto com gradiente** | Aplicar `background-clip: text` nos títulos principais para criar texto com gradiente ciano→azul | CSS3 |

### 🎬 Animações de Scroll (estilo apresentação)

| Sugestão | Descrição | Implementação |
|----------|-----------|---------------|
| **Reveal on Scroll** | Cada seção "entra" na tela com efeito de slide (da esquerda, direita ou de baixo), como slides de PowerPoint | `IntersectionObserver` + classes CSS (`translateX(-100px)` → `translateX(0)`) |
| **Parallax por camada** | Títulos se movem mais lento que o conteúdo ao scrollar, criando profundidade 3D | `transform: translateY(calc(var(--scroll) * 0.3))` via JS |
| **Staggered entry** | Cards e itens de lista aparecem um por um com delay incrementado (efeito cascata) | `animation-delay: calc(var(--i) * 120ms)` com `IntersectionObserver` |
| **Texto "digitando"** | O título Hero (`Explorando o Mundo do Arduino`) aparece letra por letra, como um terminal digitando | JS `setInterval` + `textContent` progressivo |
| **Seção a seção (Fullpage Scroll)** | Scroll travado por seção, como uma apresentação de slides — cada scroll leva à próxima seção inteira | `scroll-snap-type: y mandatory` em CSS puro |

### 🎞️ Transições & Movimentação de Elementos

| Sugestão | Descrição | Implementação |
|----------|-----------|---------------|
| **Cards flutuantes** | Cards ficam com animação de "flutuação" sutil e constante (`translateY` oscilando) como se estivessem em gravidade zero | `@keyframes float { 0%,100%{translateY(0)} 50%{translateY(-8px)} }` |
| **Cursor trail** | Rastro luminoso ciano acompanhando o mouse (partículas menores que desvanecem) | Canvas overlay com partículas de vida curta |
| **Hover 3D (Tilt)** | Cards inclinam suavemente na direção do mouse ao fazer hover (efeito perspectiva 3D) | JS `mousemove` → `transform: rotateX() rotateY()` + `perspective` |
| **Transição entre seções** | Divisores animados entre seções (onda SVG, linha de circuito neon ou partículas se dispersando) | SVG `<path>` animado com `stroke-dashoffset` |
| **Loading screen** | Tela de carregamento inicial com animação de "boot" do sistema (texto de terminal + barra de progresso) | Overlay JS removido após `DOMContentLoaded` |

### 🌈 Temas & Visual

| Sugestão | Descrição |
|----------|-----------|
| **Tema "Cyberpunk"** | Paleta alternativa com magenta (`#ff00ff`) + amarelo neon, selecionável via botão |
| **Tema "Terminal Green"** | Fundo preto puro, texto verde fósforo (`#00ff41`), estética hacker retro |
| **Modo "Alto Contraste"** | Para acessibilidade extrema — bordas brancas grossas, sem transparências |
| **Seletor de tema** | Botão flutuante no canto que permite alternar entre os temas com transição suave |

### ⚡ Performance & UX

| Sugestão | Descrição |
|----------|-----------|
| **Lazy render das seções** | Renderizar HTML das seções fora da viewport apenas quando o usuário se aproxima delas |
| **Service Worker** | Cachear assets para funcionar offline como um PWA |
| **Barra de progresso de leitura** | Barra fina no topo que avança conforme o scroll da página |
| **Botão "Voltar ao topo"** | Botão flutuante com ícone de foguete que aparece após scrollar 500px |

---

## 👨‍💻 Autor

<div align="center">

**Roberto Átila**

*Desenvolvedor apaixonado por tecnologia, hardware embarcado e interfaces web interativas.*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/roberto-%C3%A1tila-almeida-azevedo-0a64412b4/)
[![GitHub](https://img.shields.io/badge/GitHub-161b22?style=for-the-badge&logo=github&logoColor=white)](https://github.com/robertoatila)

</div>

---

<p align="center">
  <sub>Este projeto está sob a licença MIT. Desenvolvido com ⚡ e lógica booleana.</sub><br>
  <sub>Última atualização: Maio 2026</sub>
</p>
