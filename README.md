# 🚀 Portfólio & Plataforma Educativa Arduino

Uma plataforma web interativa, moderna e de alta performance desenvolvida para documentar, ensinar e explorar o universo do **Arduino**. O projeto evoluiu de um simples portfólio para uma experiência imersiva com temática **Sci-Fi / High-Tech**, focada em acessibilidade, usabilidade e design avançado (Glassmorphism, Neon UI e simulações dinâmicas).

[![Estado](https://img.shields.io/badge/Status-Ativo-success.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-Vanilla_JS_%7C_CSS3_%7C_HTML5-blue.svg)](#)
[![Licença](https://img.shields.io/badge/Licença-MIT-green.svg)](#)

---

## 🌟 Principais Funcionalidades

- 🔮 **Estética Sci-Fi & Glassmorphism**: Interface dark-mode exclusiva com painéis de "vidro jateado" (blur), bordas neon brilhantes (cyan glow) e animações holográficas.
- 💻 **Fundo "Digital Rain" (Matrix)**: Um canvas interativo com chuva de caracteres, renderizado dinamicamente via JavaScript apenas quando visível na tela (otimizado com `IntersectionObserver`).
- ⚙️ **Simulação Interativa em Tempo Real**: Componente visual que simula o funcionamento de LEDs baseando-se no código de um projeto, permitindo ajustar a velocidade da simulação em tempo real.
- 👨‍🏫 **Trilha Educativa**: Seções estruturadas (O que é, Como funciona, Origem, Linguagem, Componentes e Futuro) projetadas para ensinar conceitos de embarcados de forma fluida.
- 📝 **Syntax Highlighting Customizado**: O código-fonte C++ (Arduino) é colorido dinamicamente no navegador via JavaScript (Expressões Regulares), sem uso de bibliotecas pesadas de terceiros.
- 📱 **Totalmente Responsivo**: Layout construído com CSS Grid e Flexbox, garantindo adaptação perfeita desde monitores ultrawide até dispositivos móveis.
- ♿ **Acessibilidade (WCAG)**: Suporte para leitores de tela (`aria-labels`), navegação via teclado, *Focus Trap* (armadilha de foco) nos modais e respeito à preferência de movimento reduzido (`prefers-reduced-motion`).

---

## 🛠️ Tecnologias Utilizadas

A filosofia técnica do projeto é **100% Vanilla** — sem dependências, npm, ou *build steps*, garantindo carregamento instantâneo e facilidade de manutenção.

- **HTML5**: Semântica estrita, estruturação de páginas e micro-painéis SVG.
- **CSS3**: Variáveis (Custom Properties), CSS Grid, Flexbox, Animações Avançadas (`@keyframes`), filtros SVG e Efeitos de Neomórfismo/Glassmorfismo.
- **JavaScript (ES6+)**: Manipulação do DOM, `IntersectionObserver` para animações no scroll e lazy-loading, renderização do Canvas em loop (`requestAnimationFrame`) e injeção dinâmica de dados.
- **Arduino (C/C++)**: A lógica de todos os projetos apresentados na plataforma.

---

## 📂 Estrutura do Projeto

O código é mantido simples, modular e dividido logicamente:

```text
/
├── index.html       # Estrutura principal da página (Hero, Grid, Simulação, Modal)
├── styles.css       # Design System (Variáveis, Neon UI, Animações, Media Queries)
├── script.js        # Lógica de renderização, Simulação, Canvas Rain e Interações
├── data.js          # Base de Dados em JSON contendo as informações e código dos projetos
└── README.md        # Documentação do projeto
```

---

## 🤖 Projetos Inclusos na Plataforma

O portfólio documenta projetos que vão de conceitos básicos à robótica e automação, todos disponíveis no arquivo `data.js`:

1. **Piscante (Blink)**: Manipulação básica de portas digitais.
2. **Semáforo**: Controle de fluxo com temporizadores e LEDs.
3. **Super Mario Theme**: Geração de frequências PWM com Buzzer.
4. **Game of Thrones Theme**: Controle avançado de melodias.
5. **Marcha Imperial**: Temporização de notas musicais sincronizadas.
6. **Leds Sequenciais**: Arrays e laços de repetição (`for`).
7. **Sinal de S.O.S**: Código Morse com atuadores luminosos.
8. **APAC**: Automação residencial e uso de sensores/relés.
9. **LDR (Sensor de Luz)**: Leitura de dados analógicos.

---

## 🚀 Como Executar Localmente

Não há processos de build ou compilação complexos. Para visualizar o projeto:

1. Clone este repositório:
   ```bash
   git clone https://github.com/robertoatila/portfolio-arduino.git
   ```
2. Abra a pasta do projeto.
3. Dê um duplo clique no arquivo `index.html` para abri-lo no seu navegador (Google Chrome, Firefox, Edge, etc.).
   - *Dica:* Se preferir, utilize uma extensão como o "Live Server" do VS Code para visualizar atualizações em tempo real ao editar o código.

---

## 👨‍💻 Autor

**Roberto Átila**  
*Desenvolvedor apaixonado por tecnologia, hardware embarcado e interfaces web interativas.*

🔗 [LinkedIn](https://www.linkedin.com/in/roberto-%C3%A1tila-almeida-azevedo-0a64412b4/) | 💻 [GitHub](https://github.com/robertoatila)

---

<p align="center">
  <small>Este projeto está sob a licença MIT. Desenvolvido com ⚡ e lógica booleana.</small>
</p>
