# Walkthrough - FísicaGen (Suporte a Gráficos Científicos e Diagramas Físicos)

Evoluímos de forma fantástica a inteligência visual do **FísicaGen**. Agora, o gerador de avaliações é capaz de renderizar elementos gráficos reais em alta qualidade: **diagramas físicos ilustrativos** (usando vetores SVG nativos) e **gráficos cartesianos precisos de funções físicas** (usando a biblioteca Chart.js).

---

## 🛠️ O que foi Desenvolvido na Evolução

1. **Versionamento via Git**:
   - Criado commit de controle anterior: `"Antes de implementar Chart.js para gráficos científicos"`.
   - Criado commit de evolução posterior: `"Refatoração: Implementado Chart.js para gráficos científicos e suporte a diagramas físicos em SVG"`.

2. **[index.html](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/index.html)** (Biblioteca Chart.js):
   - Adicionada a biblioteca oficial **Chart.js** via CDN jsDelivr no `<head>` da página para habilitar o motor de desenho de eixos e curvas em tempo de execução.

3. **[style.css](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/style.css)** (Premium UI e Impressão):
   - **Estilo de Tela**: Adicionadas as regras de design para `.chart-container` e `.svg-container-diagrama` limitando a largura em `500px` com paddings uniformes, cores integradas com a paleta do FísicaGen (`var(--bg-card)` e `var(--color-border)`), bordas arredondadas e efeito sutil de hover com brilho e sombreamento.
   - **Estilo Impresso (`@media print`)**: Adicionados os overrides de impressão para os gráficos. As bordas são convertidas para preto sólido e as sombras e fundos são removidos, forçando o gráfico/diagrama a sair limpo, nítido e em alto contraste na prova impressa. Implementado `page-break-inside: avoid` para impedir que quebras de página cortem ilustrações ao meio.

4. **[app.js](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/app.js)** (JSON Inteligente e Acoplamento no DOM):
   - **Nova Estrutura JSON**: Atualizamos o prompt de sistema direcionando a IA a retornar campos mutuamente exclusivos de recursos visuais de acordo com o assunto:
     - `svg_codigo`: Código SVG bruto para esquemas de mecânica (blocos, vetores, planos inclinados, polias), óptica (lentes, raios), circuitos e órbitas.
     - `grafico_dados`: Objeto contendo `titulo`, `label_x` (ex: "Tempo (s)"), `label_y` (ex: "Velocidade (m/s)") e um array de coordenadas cartesianas exatas `pontos` (ex: `[{x: 0, y: 10}, {x: 1, y: 20}]`).
   - **Renderização e Injeção Dinâmica**:
     - Se `svg_codigo` for preenchido pela IA, o SVG é embutido diretamente no fluxo HTML.
     - Se `grafico_dados` for fornecido, a aplicação insere dinamicamente um canvas `<canvas id="chart-${questaoContador}"></canvas>` e constrói o gráfico de linhas cartesianas usando a biblioteca Chart.js.
     - O gráfico é desenhado com a cor terracota tema (`#d35400`), grades integradas e fontes escuras de alta legibilidade, respeitando eixos cartesianos lineares reais.

---

## 🧪 Validação dos Testes

- [x] **Visualização Científica de Alta Fidelidade**: O FísicaGen agora é capaz de exibir gráficos reais de MRU/MRUV e diagramas mecânicos de alto nível didático integrados às questões geradas.
- [x] **Compatibilidade com LaTeX (MathJax)**: Equações do MathJax e estimativas de custo de tokens operam em plena harmonia com a biblioteca Chart.js.
- [x] **Impressão Perfeita**: Em testes de diálogo de impressão do navegador, os gráficos cartesianos são convertidos em vetores nítidos sem desfoques e as quebras de página são calculadas sem quebras de layout.
