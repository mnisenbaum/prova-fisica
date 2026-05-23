# Lista de Tarefas - FísicaGen

- [x] Criar o arquivo `index.html` com a estrutura semântica, formulários de configuração, modal de API Key e contêineres de prova.
- [x] Criar o arquivo `style.css` com paleta de cores acadêmica (creme, azul-escuro, terracota), design do modal, estilização dos cards de questões e folha de estilos específica de impressão (`@media print`).
- [x] Criar o arquivo `app.js` com o dicionário BNCC dinâmico, lógica de controle de chave da API com `localStorage`, gerenciamento da chamada ao OpenRouter com formatação JSON e renderização dinâmica na tela.
- [x] Validar o projeto completo abrindo e verificando interações locais.
- [x] **[Correção]** Restaurar o dropdown de "Tipo de Questão" (`id="tipoQuestao"`) em `index.html` e corrigir a captura do seletor em `app.js` para restabelecer a geração normal de questões sem erros.
- [x] **[Melhoria]** Corrigir visualmente o container da caixa de contexto (`#containerContexto`) em `index.html` e `style.css` para ocupar 100% de largura empilhada, igualando visualmente à caixa de instruções adicionais.
- [x] **[Melhoria]** Adicionar o seletor de "Nível de Dificuldade" (`#nivelDificuldade`) com opções Fácil, Médio e Difícil na grade de parâmetros.
- [x] **[Melhoria]** Injetar regras de calibração pedagógica no prompt da IA baseado na dificuldade escolhida (Fácil, Médio, Difícil).
- [x] **[Melhoria]** Efetuar commits antes e depois das modificações no Git para controle de versionamento.
- [x] **[Melhoria]** Implementar o cálculo financeiro em dólares ($) baseado nos custos oficiais do modelo `google/gemini-2.5-flash` ($0.075 por 1M tokens de entrada e $0.30 por 1M tokens de saída).
- [x] **[Melhoria]** Exibir a estimativa de custos formatada em dólares com 5 casas decimais na tela.
