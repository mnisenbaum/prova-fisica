# FísicaGen 🚀 - Gerador de Avaliações de Física (Alinhado à BNCC)

O **FísicaGen** é uma ferramenta web estática de alta performance desenvolvida especialmente para professores de Física do Ensino Fundamental II (9º Ano) e do Ensino Médio. A aplicação conecta-se à inteligência artificial avançada através do **OpenRouter** para gerar avaliações e itens de física originais, com rigor conceitual e alinhados perfeitamente à **Base Nacional Comum Curricular (BNCC)**.

---

## ✨ Recursos Principais

*   **Taxonomia BNCC Integrada**: Seleção inteligente de anos escolares (9º Ano Fund., 1º, 2º e 3º Anos do Ensino Médio) que carrega dinamicamente os eixos temáticos curriculares correspondentes.
*   **Controle de Rigor Pedagógico (Nível de Dificuldade)**:
    *   **Fácil**: Resoluções focadas na aplicação direta de uma única fórmula física básica.
    *   **Médio**: Itens que exigem conversão de unidades (ex: km/h para m/s) ou interpretação conceitual inicial.
    *   **Difícil**: Itens abstratos de alta complexidade conceitual com múltiplos passos de cálculo matemático.
*   **Estilos de Itens Customizáveis**:
    *   **Direto**: Enunciados extremamente objetivos e focados nas variáveis.
    *   **Contextualizado**: Cria enredos ricos e histórias físicas do cotidiano. Suporta a adição de cenários personalizados inseridos pelo professor (ex: "astronauta na Lua", "skatista em rampa").
*   **Tipos de Itens**:
    *   **Múltipla Escolha**: Gera 5 alternativas estruturadas (A a E).
    *   **Discursiva**: Cria questões abertas com linhas pontilhadas de rascunho prontas para impressão.
*   **Gabarito & Resolução Detalhada**: Cada questão gerada acompanha um bloco expansível com a resposta correta e a explicação física detalhada passo a passo de todos os cálculos.
*   **Impressão Acadêmica Premium (`@media print`)**: 
    *   Simula uma folha de prova clássica no navegador (com cabeçalho acadêmico editável).
    *   A folha de estilos de impressão oculta automaticamente o painel de controle, botões de API, barras de ação e formata a prova perfeitamente, impedindo quebras de página inadequadas no meio das questões.
*   **Transparência Financeira (Estimativa de Custo)**: Relatório instantâneo de consumo de tokens e custo real em dólares ($) de cada geração baseado nos preços oficiais do modelo `google/gemini-2.5-flash`.
*   **Segurança de Dados (Zero Servidor)**: Sua chave do OpenRouter é armazenada de forma segura apenas localmente no navegador (`localStorage`).

---

## 🛠️ Arquitetura do Projeto

O sistema foi arquitetado de forma limpa, utilizando pura tecnologia client-side (Frontend estático):
1.  **[index.html](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/index.html)**: Estrutura semântica HTML5, formulários responsivos, área da prova editável e modal de chaves.
2.  **[style.css](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/style.css)**: Tokens de design premium (paleta acadêmica em azul-escuro, terracota e creme), animações suaves de entrada, spinner em órbita atômica e configurações de impressão A4.
3.  **[app.js](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/app.js)**: Regras de prompt do Gemini, binding de seletores, toggle dinâmico de texto de cenário, parser de respostas JSON robusto e calculadora financeira de tokens.

---

## 🚀 Como Executar Localmente

Como a aplicação é 100% estática, não há necessidade de instalações complexas ou bancos de dados:

1. Clone o repositório ou baixe os arquivos em seu computador.
2. Dê um duplo clique no arquivo `index.html` para abri-lo diretamente em qualquer navegador moderno.
3. Clique em **🔑 Configurar API** no canto superior direito.
4. Cole sua chave de API gerada gratuitamente ou com créditos no [OpenRouter.ai](https://openrouter.ai/).
5. Selecione as diretrizes, a dificuldade, escreva as instruções de sua preferência e gere sua primeira prova!

---

## 📂 Arquivos de Acompanhamento (Metodologia)

Adicionalmente, o repositório conta com nossa documentação técnica de desenvolvimento na raiz do projeto:
*   `implementation_plan.md`: Plano de design, estrutura, prompts de IA e diretrizes de verificação criados inicialmente.
*   `task.md`: Checklist interativo documentando todas as etapas de desenvolvimento executadas.
*   `walkthrough.md`: Diário de evolução técnica registrando a implementação do controle de dificuldade, layout 100% responsivo e cálculo de custo.
