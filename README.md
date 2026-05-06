# ⚡ Portfólio de Projetos Arduino

<p align="center">
  <img src="preview.jpg" alt="Preview do Portfólio" width="100%">
</p>

<p align="center">
  <b>Uma experiência imersiva Maker / Cyberpunk construída com alta performance e zero frameworks.</b>
</p>

---

## 🚀 Sobre o Projeto

Este repositório contém o código-fonte do portfólio de projetos Arduino de **Roberto Átila**, estudante do curso Técnico em Informática para Internet. O projeto foi redesenhado do zero para refletir uma estética *hardcore*, inspirada em terminais, placas de circuito impresso (PCBs) e na IDE do Arduino.

O maior desafio técnico deste projeto foi garantir uma **performance extrema**, animações complexas e arquitetura escalável utilizando apenas **Vanilla Web Technologies** (sem dependências como React, Vue, ou bibliotecas de animação de terceiros).

## 🛠 Stack Tecnológica

*A regra de ouro deste projeto é a imutabilidade da stack base:*
- **HTML5 Semântico:** Estrutura otimizada, tags semânticas e acessibilidade com atributos ARIA.
- **CSS3 Puro:** Variáveis nativas (Design System), Flexbox, CSS Grid, animações `@keyframes` complexas, Glassmorphism e Efeitos Neon Glow.
- **JavaScript ES6+:** Módulos lógicos via closures, `IntersectionObserver`, `requestAnimationFrame`, e manipulação limpa do DOM.
- **Zero Build Steps:** Sem NPM, Node.js, Webpack ou Vite. Funciona nativamente direto no navegador.

## ✨ Principais Funcionalidades e Arquitetura

- **Estética Maker/Cyberpunk:** Paleta de cores baseada em terminais dark (`#0a0e17`) e Azul Arduino (`#00979d`), utilizando as fontes `Chakra Petch` e `Fira Code`.
- **Boot Screen da IDE:** Sequência de carregamento que simula o log de compilação de um sketch Arduino (`> Compilando sketch...`), bloqueando a interação até o "upload" ser concluído.
- **Simulador Interativo Dinâmico:** Um simulador construído em JS que carrega projetos dinamicamente de `data.js`, aplicando cores aos LEDs e controlando o tempo de execução e a velocidade dos pulsos (ms) do projeto ativo.
- **Syntax Highlighter Robusto:** Formatador de código C++ / Arduino feito do zero em JavaScript puro. Utiliza um sistema de *tokenização protegida* com Expressões Regulares (Regex) para colorir com precisão funções, strings, números e keywords.
- **Cursor Customizado (DRY):** Cursor "mira de precisão" dinâmico com efeitos de *mix-blend-mode* que interage magicamente com botões e links via *Event Delegation*. Lógica totalmente extraída e modularizada em `cursor.js`.
- **Otimização de Renderização (CPU/GPU):** O *background* animado em Canvas (Constelação) utiliza a API `IntersectionObserver` para pausar os cálculos matemáticos do `requestAnimationFrame` quando não está visível na tela.
- **UI/UX Avançada:** Scroll reveal progressivo, divisores de seção em SVG no formato de trilhas de PCB, Hero section com tilt 3D interativo e responsividade impecável.

## ⚙️ Como Executar Localmente

Como o projeto é livre de dependências, visualizá-lo localmente é tão simples quanto abrir um arquivo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/robertoatila/Portf-lios-de-Projetos-Arduino.git
   ```
2. Abra a pasta do projeto.
3. Dê um duplo-clique no arquivo `index.html`.
4. *Pronto!* A magia acontece direto no seu navegador.

## 🌐 Link de Produção

Acesse o portfólio live via GitHub Pages:  
[**robertoatila.github.io/Portf-lios-de-Projetos-Arduino**](https://robertoatila.github.io/Portf-lios-de-Projetos-Arduino/)

## 👨‍💻 Autor

**Roberto Átila Almeida Azevedo**  
Estudante de Técnico em Informática para Internet e apaixonado por embarcados, desenvolvimento web e IoT.

* [LinkedIn](https://www.linkedin.com/in/roberto-%C3%A1tila-almeida-azevedo-0a64412b4/)
* [GitHub](https://github.com/robertoatila)

---
*Construído com código, café e resistores.* ⚡
