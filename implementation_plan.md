# Plano de Implementação - FísicaGen (Gerador de Provas)

O **FísicaGen** é uma aplicação web estática e responsiva que serve como um gerador inteligente de provas de física. O sistema é alinhado às diretrizes da Base Nacional Comum Curricular (BNCC), permitindo a seleção de anos escolares, assuntos dinâmicos e modelos de inteligência artificial de ponta integrados via API do OpenRouter.

## Design e Experiência do Usuário (UX/UI Premium)

Para atender aos altos padrões de estética e funcionalidade, o projeto adotará as seguintes práticas:
- **Tema de Cores Acadêmico**: Fundo creme/marfim suave (`#fcfbf7`) que emula folhas de papel de alta qualidade, combinado com azul-escuro profissional (`#2c3e50`) para a estrutura/tipografia e detalhes em terracota/tijolo (`#d35400`) para elementos de destaque e botões primários.
- **Tipografia Escolar/Científica**: Uso da fonte *Playfair Display* para títulos (dando um toque clássico de livro didático ou universidade) e *Inter* para a interface, garantindo legibilidade perfeita.
- **Folha de Prova Realista**: O container de prova (`#provaContainer`) usará estilos de folha de papel com linhas de cabeçalho escolar configuráveis (Nome da Escola, Disciplina, Professor, Aluno, Data) e formatação tradicional de questões (ex: **Questão 1**, **Questão 2**, com alinhamento limpo).
- **Suporte Avançado a Impressão (`@media print`)**: Uma folha de estilo de impressão dedicada que ocultará automaticamente o painel de configurações, os botões da interface, a barra superior de API e formatará as questões perfeitamente em páginas numeradas prontas para entrega aos alunos.
- **Micro-interações elegantes**: Transições suaves de hover nos botões, modais com desfoque de fundo (`backdrop-filter: blur(5px)`) e animações de carregamento (spinner acadêmico de órbita atômica ou similar) durante a geração de questões.

---

## Estrutura do Projeto

O projeto consistirá em 3 arquivos principais localizados no diretório raiz:
1. `index.html` — Estrutura semântica HTML5.
2. `style.css` — Estilização moderna e regras de impressão customizadas.
3. `app.js` — Lógica de controle, mapeamento BNCC, persistência local e chamadas de API.

---

## Proposed Changes

### [Interface e Estrutura]

#### [NEW] [index.html](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/index.html)
- Estrutura HTML5 com meta tags de SEO e título descritivo ("FísicaGen - Gerador de Provas de Física Alinhadas à BNCC").
- Fontes importadas do Google Fonts (Inter e Playfair Display).
- **Header**: Logo/Título "FísicaGen" com subtítulo e o botão estilizado "🔑 Configurar API".
- **Painel de Configuração**:
  - Container responsivo com Grid/Flexbox.
  - Dropdowns elegantes:
    - Ano Escolar (9º Ano Fundamental, 1º Ano Médio, 2º Ano Médio, 3º Ano Médio).
    - Assunto (Dropdown populado dinamicamente com base no ano escolar).
    - Tipo de Questão (Múltipla Escolha com 5 opções [A-E] ou Discursiva).
    - Modelo de IA (`google/gemini-2.5-flash:free`, `mistralai/mistral-7b-instruct:free`, `google/gemini-2.5-flash`).
  - Botão principal: `"Gerar e Adicionar Questão"`.
- **Cabeçalho da Prova (Opcional & Premium)**: Seção editável onde o professor pode preencher o nome da instituição, nome do aluno e data, ideal para impressão.
- **Área da Prova (`#provaContainer`)**: Inicia com uma bela ilustração ou card sinalizando "Sua prova está vazia. Selecione as opções acima para gerar sua primeira questão!".
- **Botões de Ação Global**: 
  - `"🖨️ Imprimir Prova"` (ativa o diálogo de impressão do navegador).
  - `"👁️ Ocultar/Exibir Gabaritos"` (útil para alternar a exibição das respostas corretas e resoluções detalhadas antes de imprimir).
  - `"🗑️ Limpar Prova"` (limpa todas as questões atuais).
- **Modal de Segurança**: Modal elegante oculto para inserção da OpenRouter API Key com campo `type="password"`, botão de salvar e link de instruções para obter a chave.

### [Estilo e Design]

#### [NEW] [style.css](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/style.css)
- Definição de variáveis CSS para paleta de cores, espaçamentos e fontes (Custom Properties).
- Reset CSS moderno e estilização de formulários (foco ativo com outline elegante, selects customizados).
- Estilo dos cards de questões: visual simulando papel, bordas discretas, numeração de questões em destaque, opções A-E bem alinhadas.
- **Card de Resposta/Gabarito**: Visual diferenciado (ex: borda tracejada em terracota, fundo ligeiramente contrastante) que pode ser ocultado dinamicamente.
- **Estilo do Modal**: Fundo escurecido translúcido, desfoque de fundo e animação suave de surgimento da caixa centralizada (`scale-in`).
- **Folha de Impressão (`@media print`)**:
  - Altera o fundo de creme para branco absoluto (`#ffffff`).
  - Oculta o painel de configurações, o header da página, modais e botões de controle.
  - Remove sombras e efeitos interativos.
  - Garante que quebras de página não cortem questões ao meio (`page-break-inside: avoid`).
  - Exibe opcionalmente ou oculta o gabarito baseado nas preferências do professor.

### [Lógica e Integração]

#### [NEW] [app.js](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/app.js)
- **Mapeamento BNCC Completo**:
  ```javascript
  const dicionarioBNCC = {
    "9ef": {
      nome: "9º Ano - Ensino Fundamental",
      assuntos: [
        "Ondas e Radiações (Espectro eletromagnético, som, luz)",
        "Aspectos Quantitativos da Matéria (Misturas, reações químicas)",
        "Estrutura da Matéria (Átomos, elementos químicos)",
        "Evolução Estelar (Ciclo de vida das estrelas, gravidade)"
      ]
    },
    "1em": {
      nome: "1º Ano - Ensino Médio",
      assuntos: [
        "Cinemática (Movimento uniforme, acelerado, vetores)",
        "Leis de Newton e Dinâmica (Força, atrito, centrípeta)",
        "Trabalho, Energia e Potência (Conservação de energia)",
        "Estática e Hidrostática (Equilíbrio, empuxo, pressão)"
      ]
    },
    "2em": {
      nome: "2º Ano - Ensino Médio",
      assuntos: [
        "Termodinâmica e Calorimetria (Calor, leis da termodinâmica)",
        "Gases Ideais (Transformações gasosas)",
        "Óptica Geométrica (Espelhos, lentes, refração)",
        "Ondulatória e Acústica (Fenômenos ondulatórios, efeito Doppler)"
      ]
    },
    "3em": {
      nome: "3º Ano - Ensino Médio",
      assuntos: [
        "Eletrostática (Cargas elétricas, lei de Coulomb, campo elétrico)",
        "Eletrodinâmica e Circuitos (Corrente, resistores, leis de Ohm)",
        "Eletromagnetismo (Ímãs, força magnética, indução)",
        "Introdução à Física Moderna (Efeito fotoelétrico, relatividade)"
      ]
    }
  };
  ```
- **Gestão da Chave API**:
  - Salva e recupera `openrouter_api_key` do `localStorage`.
  - Verifica no carregamento da página (`DOMContentLoaded`). Se a chave não existir, abre o modal de segurança automaticamente com transição de desfoque.
- **Chamada da API do OpenRouter**:
  - Endpoint: `https://openrouter.ai/api/v1/chat/completions`
  - Inclui cabeçalhos obrigatórios do OpenRouter (`HTTP-Referer` e `X-Title` para identificar o app).
  - Envia no payload o parâmetro `response_format: { type: "json_object" }` para garantir retorno em JSON.
  - **Prompt de Sistema**:
    ```text
    Você é um experiente Professor de Física especialista em elaboração de itens de avaliação alinhados à BNCC brasileira.
    Sua tarefa é gerar uma questão inédita, cientificamente precisa e contextualizada sobre o assunto selecionado.
    
    Você DEVE retornar estritamente um objeto JSON válido contendo exatamente a estrutura abaixo:
    {
      "enunciado": "O texto do enunciado completo da questão, com contextualização clara e rica em detalhes físicos. Use formatação limpa. Se houver fórmulas, represente-as de forma legível (ex: E = m.c² ou usando notações claras).",
      "opcoes": {
        "A": "Texto detalhado da alternativa A.",
        "B": "Texto detalhado da alternativa B.",
        "C": "Texto detalhado da alternativa C.",
        "D": "Texto detalhado da alternativa D.",
        "E": "Texto detalhado da alternativa E."
      },
      "resposta_correta": "Letra correspondente da alternativa correta (A, B, C, D ou E)",
      "gabarito_detalhado": "Uma explicação física passo a passo e detalhada demonstrando o porquê da alternativa correta estar certa e as outras estarem erradas ou inconsistentes, incluindo contas se aplicável."
    }
    
    Regra para Questão Discursiva:
    Se o tipo de questão for discursiva, defina o campo "opcoes" como null. No campo "resposta_correta", forneça a resposta esperada/padrão de resposta ideal. No campo "gabarito_detalhado", explique os critérios de correção e a resolução passo a passo.
    ```
- **Renderização e Manipulação do DOM**:
  - Trata respostas da API e trata erros de parsing JSON de forma robusta.
  - Cria elementos HTML dinâmicos para cada questão gerada.
  - Permite acumular questões de forma incremental no container da prova sem limpar as anteriores.
  - Adiciona controles individuais por questão (ex: botão de excluir questão individualmente).

---

## Plano de Verificação

### Testes Manuais no Navegador
1. **Fluxo de Inicialização**: Abrir o `index.html` pela primeira vez. Verificar se o modal de API Key abre automaticamente e impede interações na tela de fundo.
2. **Salvamento da API Key**: Inserir uma chave simulada, salvar e verificar no Console do Desenvolvedor (`Application > Local Storage`) se ela foi gravada corretamente sob a chave `openrouter_api_key`. Atualizar a página e atestar que o modal não se abre sozinho.
3. **Dropdown Dinâmico**: Alterar o dropdown "Ano Escolar" e validar se a lista de "Assunto" é atualizada de forma correspondente com os assuntos corretos da BNCC.
4. **Geração de Questões**:
   - Inserir uma API Key válida do OpenRouter.
   - Selecionar "1º Ano", "Leis de Newton e Dinâmica", "Múltipla Escolha" e o modelo `google/gemini-2.5-flash:free`.
   - Clicar em "Gerar e Adicionar Questão".
   - Verificar o feedback visual de carregamento (botão desabilitado com spinner e texto "Gerando questão...").
   - Confirmar se a questão aparece de forma magnífica no container de prova, com opções perfeitamente formatadas e a seção do gabarito colapsável/destacável.
5. **Geração Discursiva**: Testar o fluxo mudando o tipo de questão para "Discursiva" e verificar se as alternativas não aparecem e se o gabarito detalhado se comporta de forma ideal.
6. **Alternância de Gabarito**: Clicar em "👁️ Ocultar/Exibir Gabaritos" e conferir se a classe CSS correspondente altera a visibilidade de todos os gabaritos da prova simultaneamente.
7. **Impressão**: Clicar em "🖨️ Imprimir Prova". Na janela de visualização da impressão do sistema operacional, inspecionar se todos os botões e painéis de configuração foram ocultados e se a prova se parece com um teste impresso profissional de escola.
