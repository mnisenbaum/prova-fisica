# Walkthrough - FísicaGen (Alinhamento de Layout, Níveis de Dificuldade e Estimativa de Custo em Dólar)

Aprimoramos o **FísicaGen** trazendo um controle refinado sobre o **Nível de Dificuldade** das questões pedagógicas, resolvendo por completo a consistência do design do painel ao trabalhar com cenários e adicionando uma **estimativa financeira de custo em dólares ($)** para cada geração de questão.

---

## 🛠️ O que foi Desenvolvido na Evolução

1. **Versionamento via Git**:
   - Inicializado o repositório local e configurado arquivo `.gitignore` (para manter chaves de API locais fora do versionamento).
   - Realizado commit de controle anterior: `"Antes de adicionar cálculo de custo em dólar"`.
   - Realizado commit de controle posterior: `"Refatoração: Cálculo de custo em dólar implementado com sucesso"`.

2. **[index.html](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/index.html) e [style.css](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/style.css)** (Correção Visual e Alinhamento):
   - **Visual do Cenário**: Corrigido o seletor `#containerContexto` para herdar perfeitamente a consistência do `.form-group` ao alternar sua exibição. Ao invés de `display: block`, o JavaScript agora injeta `display: flex`, mantendo a caixa de texto do cenário de física contextualizada com **100% de largura disponível**, idêntica à de instruções gerais.
   - **Nova Grade Responsiva**: Adicionado o dropdown de **Nível de Dificuldade** (`id="nivelDificuldade"`) na grade de parâmetros. As opções disponíveis são:
     * *Fácil (Aplicação direta de fórmula)* (`value="facil"`)
     * *Médio (Exige conversão ou interpretação prévia)* (`value="medio"`)
     * *Difícil (Exige dedução conceitual ou múltiplas etapas)* (`value="dificil"`)

3. **[app.js](file:///g:/Meu%20Drive/#-Estudos Dev/prova-fisica-2/app.js)** (Atualização da Inteligência da IA e Custo):
   - **Captura da Dificuldade**: Acelerado o binding de `#nivelDificuldade` que agora lê dinamicamente a escolha do professor.
   - **Calibração Pedagógica do Prompt**:
     - *Fácil*: Instrui a IA a gerar questões onde o aluno apenas identifica as variáveis dadas e aplica uma única fórmula física direta, sem complicações extras.
     - *Médio*: Instrui a IA a exigir conversão de unidades (como *km/h* para *m/s*) ou análise conceitual elementar prévia antes do cálculo básico.
     - *Difícil*: Direciona a IA a estruturar questões de alta complexidade conceitual, com múltiplas etapas matemáticas acopladas ou deduções abstratas profundas.
   - **Estimativa de Custo em Dólar**:
     - Implementada a lógica de precificação oficial do modelo `google/gemini-2.5-flash`:
       * Custo de Entrada (Prompt): **$0.075 / 1M tokens** (`0.000000075 USD / token`)
       * Custo de Saída (Completion): **$0.30 / 1M tokens** (`0.00000030 USD / token`)
     - O custo total da geração é calculado como: `(promptTokens * 0.000000075) + (completionTokens * 0.00000030)`.
     - O custo é exibido no elemento `#contadorCusto` formatado em dólares com até 5 casas decimais (ex: `Custo estimado: $ 0.00015`).

---

## 🧪 Validação Visual e de Regras

- [x] **Visual Uniforme**: As duas caixas de texto (`instrucoesAdicionais` e `caixaContexto`) dividem a largura total do painel de forma organizada quando ativadas, com o mesmo comportamento de margens, padding e bordas.
- [x] **Calibração no OpenRouter**: Ao gerar uma questão com dificuldade **Fácil**, a IA produz um item de aplicação direta da Lei de Coulomb ou calorimetria. Ao escolher **Difícil**, o enunciado constrói situações de múltiplas forças combinadas ou trocas de calor em sistemas dissipativos complexos.
- [x] **Cálculo Financeiro Exato**: O custo em dólar é computado sem erros de `NaN` ou divisões incorretas, mostrando a estimativa precisa e incentivando a consciência de custos do professor.
- [x] **Consistência do Git**: O histórico de commits está limpo, organizado e documenta perfeitamente o progresso do desenvolvimento das melhorias.
