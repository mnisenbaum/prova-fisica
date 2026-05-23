# Walkthrough - FísicaGen (Suporte Completo a LaTeX com MathJax)

Aprimoramos o **FísicaGen** com suporte oficial a notação matemática e científica através da integração com o **MathJax v3**. Agora, todas as equações, frações, potências, constantes e símbolos físicos (como letras gregas e deltas) são renderizados de forma limpa e em alta qualidade acadêmica no papel de prova.

---

## 🛠️ O que foi Desenvolvido na Evolução

1. **Versionamento via Git**:
   - Criado commit de controle anterior: `"Antes de adicionar suporte a LaTeX"`.
   - Criado commit de evolução posterior: `"Refatoração: Suporte a fórmulas LaTeX implementado com MathJax"`.

2. **[index.html](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/index.html)** (CDN MathJax):
   - Adicionados os scripts de inicialização e a biblioteca CDN do **MathJax v3** e polyfill no `<head>` da página.
   - Configurado o delimitador padrão para o parser identificar:
     * **Inline (mesma linha)**: delimitados por `\\(` e `\\)` (interpretados como LaTeX no fluxo do texto).
     * **Display (em bloco)**: delimitados por `$$` e `$$` (para fórmulas complexas centralizadas).

3. **[app.js](file:///g:/Meu%20Drive/#-Estudos%20Dev/prova-fisica-2/app.js)** (Engenharia de Prompt e Renderização Dinâmica):
   - **Atualização do Prompt de Sistema**: Instruímos explicitamente a IA a produzir todas as suas fórmulas, equações e unidades em formato LaTeX usando as sintaxes de delimitadores especificadas.
   - **Renderização Dinâmica**: Como a página injeta questões de forma assíncrona após chamadas de API, adicionamos a chamada do MathJax logo após anexar a nova questão no DOM:
     ```javascript
     if (window.MathJax && window.MathJax.typesetPromise) {
         window.MathJax.typesetPromise();
     }
     ```
     Isso força a biblioteca a escanear a nova questão e renderizar instantaneamente suas fórmulas matemáticas sem exigir a reinicialização da página completa.
   - **Compatibilidade Retroativa**: Atualizamos a função utilitária `formatarTextoFisica()` para bypassar as expressões de sobrescrito (`^`) e subscrito (`_`) de texto puro quando a string contiver caracteres de LaTeX, impedindo colisões de caracteres e garantindo a integridade dos operadores do MathJax.

---

## 🧪 Validação dos Testes

- [x] **Renderização Científica**: Fórmulas complexas (como equações cinemáticas, potências de dez, notações científicas e frações) são renderizadas com alta fidelidade matemática no container da folha de prova.
- [x] **Injeção Assíncrona**: O MathJax aplica a formatação instantaneamente após o carregamento de cada nova questão com IA, mantendo o processo fluido para o professor.
- [x] **Layout Limpo de Impressão**: Os blocos de fórmulas e gabaritos respondem perfeitamente aos estilos de visualização e são enviados ao diálogo de impressão com nitidez absoluta.
