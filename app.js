/* ==========================================================================
   FísicaGen - Núcleo de Lógica e Inteligência Artificial (BNCC + OpenRouter)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Dicionário BNCC de Física
    const dicionarioBNCC = {
        "9ef": {
            nome: "9º Ano - Ensino Fundamental",
            assuntos: [
                "Ondas e Radiações (Espectro eletromagnético, som, luz, aplicações tecnológicas)",
                "Aspectos Quantitativos da Matéria (Misturas, reações químicas, transformações)",
                "Estrutura da Matéria (Átomos, modelos atômicos, elementos químicos)",
                "Evolução Estelar (Ciclo de vida das estrelas, gravidade, órbitas e galáxias)"
            ]
        },
        "1em": {
            nome: "1º Ano - Ensino Médio",
            assuntos: [
                "Cinemática Escalar e Vetorial (Movimento uniforme, variado, queda livre, lançamento)",
                "Leis de Newton e Dinâmica (Forças, atrito, força centrípeta, plano inclinado)",
                "Trabalho, Energia e Potência (Conservação de energia mecânica, sistemas dissipativos)",
                "Estática e Hidrostática (Equilíbrio de corpos rígidos, pressão, empuxo, Pascal, Stevin)",
                "Gravitação Universal (Leis de Kepler, atração gravitacional)"
            ]
        },
        "2em": {
            nome: "2º Ano - Ensino Médio",
            assuntos: [
                "Termodinâmica e Calorimetria (Calor sensível e latente, troca de calor, leis da termodinâmica)",
                "Gases Ideais (Equação de Clapeyron, transformações termodinâmicas)",
                "Óptica Geométrica (Reflexão, espelhos esféricos, refração, lentes, instrumentos ópticos)",
                "Ondulatória e Acústica (Propagação, reflexão, refração, difração, efeito Doppler, som e audição)"
            ]
        },
        "3em": {
            nome: "3º Ano - Ensino Médio",
            assuntos: [
                "Eletrostática (Carga elétrica, Lei de Coulomb, campo elétrico, potencial elétrico)",
                "Eletrodinâmica e Circuitos (Corrente elétrica, resistores, Leis de Ohm, potência e consumo)",
                "Eletromagnetismo (Ímãs, campo magnético de correntes, força magnética, indução de Faraday)",
                "Introdução à Física Moderna (Efeito fotoelétrico, dualidade onda-partícula, teoria da relatividade)"
            ]
        }
    };

    // 2. Seletores de Elementos do DOM
    const selectAno = document.getElementById("selectAno");
    const selectAssunto = document.getElementById("selectAssunto");
    const selectTipo = document.getElementById("tipoQuestao");
    const selectEstilo = document.getElementById("selectEstilo");
    const selectDificuldade = document.getElementById("nivelDificuldade");
    const instrucoesAdicionais = document.getElementById("instrucoesAdicionais");
    const caixaContexto = document.getElementById("caixaContexto");
    const containerContexto = document.getElementById("containerContexto");
    const contadorCusto = document.getElementById("contadorCusto");
    const btnGerar = document.getElementById("btnGerar");
    const btnGerarText = document.getElementById("btnGerarText");
    const btnSpinner = document.getElementById("btnSpinner");
    
    const btnConfigAPI = document.getElementById("btnConfigAPI");
    const btnImprimir = document.getElementById("btnImprimir");
    const btnToggleGabarito = document.getElementById("btnToggleGabarito");
    const btnLimpar = document.getElementById("btnLimpar");
    
    const provaContainer = document.getElementById("provaContainer");
    const emptyMessage = document.getElementById("emptyMessage");
    const folhaProva = document.querySelector(".prova-folha");

    // Seletores do Modal
    const modalAPI = document.getElementById("modalAPI");
    const btnCloseModal = document.getElementById("btnCloseModal");
    const btnCancelarAPI = document.getElementById("btnCancelarAPI");
    const btnSalvarAPI = document.getElementById("btnSalvarAPI");
    const inputAPIKey = document.getElementById("inputAPIKey");

    // Estado da Aplicação
    let questaoContador = 0;

    // 3. Gestão da API Key do OpenRouter (LocalStorage)
    function obterAPIKey() {
        return localStorage.getItem("openrouter_api_key") || "";
    }

    function salvarAPIKey(chave) {
        if (chave.trim() === "") {
            localStorage.removeItem("openrouter_api_key");
        } else {
            localStorage.setItem("openrouter_api_key", chave.trim());
        }
        atualizarBotoesConfiguracao();
    }

    function verificarChaveInicial() {
        const chave = obterAPIKey();
        if (!chave) {
            abrirModal();
        } else {
            inputAPIKey.value = chave;
        }
        atualizarBotoesConfiguracao();
    }

    function atualizarBotoesConfiguracao() {
        const chave = obterAPIKey();
        if (chave) {
            btnConfigAPI.innerHTML = "<span>🔑 API Configurada</span>";
            btnConfigAPI.classList.add("api-configured");
        } else {
            btnConfigAPI.innerHTML = "<span>🔑 Configurar API</span>";
            btnConfigAPI.classList.remove("api-configured");
        }
        validarCamposGeracao();
    }

    // 4. Controle de Modais
    function abrirModal() {
        modalAPI.classList.remove("hidden");
        inputAPIKey.focus();
    }

    function fecharModal() {
        modalAPI.classList.add("hidden");
    }

    // 5. População Dinâmica de Assuntos (BNCC)
    selectAno.addEventListener("change", () => {
        const anoSelecionado = selectAno.value;
        selectAssunto.innerHTML = ""; // Limpa opções anteriores

        if (dicionarioBNCC[anoSelecionado]) {
            const assuntos = dicionarioBNCC[anoSelecionado].assuntos;
            
            // Adiciona opção padrão
            const optDefault = document.createElement("option");
            optDefault.value = "";
            optDefault.disabled = true;
            optDefault.selected = true;
            optDefault.textContent = "Escolha um assunto da BNCC";
            selectAssunto.appendChild(optDefault);

            // Popula assuntos
            assuntos.forEach(assunto => {
                const opt = document.createElement("option");
                opt.value = assunto;
                opt.textContent = assunto;
                selectAssunto.appendChild(opt);
            });

            selectAssunto.disabled = false;
        } else {
            selectAssunto.disabled = true;
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = "Selecione um ano primeiro...";
            selectAssunto.appendChild(opt);
        }
        validarCamposGeracao();
    });

    selectAssunto.addEventListener("change", validarCamposGeracao);

    // Controle dinâmico da exibição da caixa de cenário/contexto
    selectEstilo.addEventListener("change", () => {
        if (selectEstilo.value === "contextualizada") {
            containerContexto.style.display = "flex";
            caixaContexto.focus();
        } else {
            containerContexto.style.display = "none";
        }
    });

    // Validador de botões de geração de questões
    function validarCamposGeracao() {
        const temChave = obterAPIKey() !== "";
        const temAno = selectAno.value !== "";
        const temAssunto = selectAssunto.value !== "";

        if (temChave && temAno && temAssunto) {
            btnGerar.disabled = false;
        } else {
            btnGerar.disabled = true;
        }
    }

    // 6. Integração com a API do OpenRouter
    async function gerarQuestaoIA(ano, assunto, tipo, estilo, dificuldade, instrucoes, contexto) {
        const key = obterAPIKey();
        if (!key) {
            alert("Por favor, configure sua chave de API antes de gerar.");
            abrirModal();
            return null;
        }

        const promptAnoLabel = dicionarioBNCC[ano].nome;
        const promptTipoLabel = tipo === "multipla" ? "Múltipla Escolha (A, B, C, D, E)" : "Discursiva / Questão aberta com espaço para desenvolvimento";

        const systemPrompt = `Você é um experiente Professor de Física especialista em elaboração de itens de avaliação de alto nível alinhados à BNCC brasileira.
Sua tarefa é gerar uma questão inédita, cientificamente precisa e didaticamente rica sobre o assunto solicitado, seguindo estritamente as diretrizes de estilo fornecidas.

Você agora DEVE usar formatação LaTeX para todas as fórmulas, equações, unidades complexas e símbolos de física (como delta, frações, potências). Para fórmulas matemáticas, frações ou unidades na mesma linha do texto (inline), envolva-as SEMPRE entre um único cifrão, por exemplo: $5 \\text{cm}$ ou $\\frac{1}{f} = \\frac{1}{D_o} + \\frac{1}{D_i}$. Para equações grandes e isoladas, use dois cifrões ($$ ... $$).

Você DEVE retornar estritamente um objeto JSON válido contendo exatamente a seguinte estrutura e nomes de chaves:
{
  "enunciado": "O enunciado da questão formatado em português claro, rico em detalhes físicos. Utilize LaTeX para todas as fórmulas e equações físicas (inline com $ $ ou em bloco com $$ $$). Evite formatações complexas que quebrem o JSON.",
  "opcoes": {
    "A": "Texto completo para a alternativa A contendo fórmulas em LaTeX se aplicável",
    "B": "Texto completo para a alternativa B contendo fórmulas em LaTeX se aplicável",
    "C": "Texto completo para a alternativa C contendo fórmulas em LaTeX se aplicável",
    "D": "Texto completo para a alternativa D contendo fórmulas em LaTeX se aplicável",
    "E": "Texto completo para a alternativa E contendo fórmulas em LaTeX se aplicável"
  },
  "resposta_correta": "Apenas a letra correspondente à alternativa correta (A, B, C, D ou E)",
  "gabarito_detalhado": "Uma explicação física e matemática passo a passo detalhando o porquê da resposta correta utilizando LaTeX para todas as fórmulas e cálculos."
}

REGRAS CRÍTICAS PARA QUESTÃO DISCURSIVA:
Se o tipo de questão for discursiva, você DEVE estruturar o JSON da seguinte forma:
- Defina o campo "opcoes" estritamente como null.
- No campo "resposta_correta", forneça uma descrição curta da resposta esperada (o padrão de resposta exato para pontuação máxima utilizando LaTeX para fórmulas).
- No campo "gabarito_detalhado", elabore a explicação passo a passo dos cálculos e conceitos físicos necessários para a solução completa utilizando LaTeX, além de critérios de correção sugeridos.`;

        let promptDificuldadeLabel = "";
        if (dificuldade === "facil") {
            promptDificuldadeLabel = "FÁCIL (Aplicação direta de fórmula - a resolução deve exigir apenas identificar os dados fornecidos e aplicar diretamente uma única fórmula física básica, sem complicações matemáticas ou conversões complexas).";
        } else if (dificuldade === "medio") {
            promptDificuldadeLabel = "MÉDIO (Exige conversão ou interpretação prévia - a resolução deve exigir conversão de unidades [ex: km/h para m/s, g para kg] ou uma interpretação conceitual prévia das variáveis e dados antes da aplicação direta das fórmulas).";
        } else if (dificuldade === "dificil") {
            promptDificuldadeLabel = "DIFÍCIL (Exige dedução conceitual ou múltiplas etapas - a resolução deve exigir raciocínio conceitual abstrato profundo, dedução de fórmulas interligadas ou múltiplos passos e etapas de cálculo físico e matemático para se chegar ao resultado final).";
        }

        let userPrompt = `Gere uma questão de Física de nível ${promptAnoLabel} sobre o assunto: "${assunto}".
Tipo de item: ${promptTipoLabel}.
Nível de Dificuldade da questão: ${promptDificuldadeLabel}.
A questão deve ser original, com o rigor físico e matemático calibrado exatamente para o nível de dificuldade selecionado, e absolutamente livre de erros conceituais ou de cálculo.`;

        if (estilo === "direta") {
            userPrompt += `\n\nEstilo do Item: DIRETO. Seja extremamente objetivo, sem rodeios ou narrativas longas. Foque puramente nos dados físicos e variáveis do problema (ex: 'Um gás ideal está encerrado em um recipiente de volume V...', 'Uma partícula de massa m se move com velocidade v...').`;
        } else if (estilo === "contextualizada") {
            userPrompt += `\n\nEstilo do Item: CONTEXTUALIZADO. Crie uma narrativa envolvente relacionada à física do cotidiano ou a um experimento científico de fundo.`;
            if (contexto && contexto.trim() !== "") {
                userPrompt += ` baseada estritamente no seguinte cenário/contexto da história fornecido: "${contexto.trim()}"`;
            }
        }

        if (instrucoes && instrucoes.trim() !== "") {
            userPrompt += `\n\nInstruções gerais complementares fornecidas pelo professor que você deve obedecer: "${instrucoes.trim()}"`;
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`,
                "HTTP-Referer": "https://github.com/moises/fisicagen", // Identificador
                "X-Title": "FísicaGen"
            },
            body: JSON.stringify({
                model: "google/gemini-2.5-flash",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                response_format: { type: "json_object" } // Garante JSON puro da IA
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            const errMsg = errData.error?.message || `Erro HTTP ${response.status}`;
            throw new Error(errMsg);
        }

        const data = await response.json();
        
        if (!data.choices || data.choices.length === 0) {
            throw new Error("A IA retornou uma resposta sem escolhas de geração válidas.");
        }

        // Exibe de forma discreta o consumo de tokens e estimativa financeira
        if (data.usage && contadorCusto) {
            const promptT = data.usage.prompt_tokens || 0;
            const completionT = data.usage.completion_tokens || 0;
            const totalT = data.usage.total_tokens || (promptT + completionT);
            const custoTotal = (promptT * 0.000000075) + (completionT * 0.00000030);
            
            contadorCusto.innerHTML = `⚡ Último consumo: <strong>${totalT}</strong> tokens (Entrada: ${promptT} | Saída: ${completionT}) - Custo estimado: <strong>$ ${custoTotal.toFixed(5)}</strong>`;
            contadorCusto.classList.add("visible");
        }

        // Garante que o caractere de escape seja tratado corretamente se a IA enviar barras simples
        let textoTratado = data.choices[0].message.content;
        
        // Substituição de segurança para evitar que escapes inválidos de LaTeX quebrem o parsing JSON
        textoTratado = textoTratado.replace(/\\([()$])/g, "\\\\$1");
        
        const jsonResposta = JSON.parse(textoTratado);
        return jsonResposta;
    }

    // 7. Renderização da Questão no Prova Container
    function renderizarQuestao(questaoObj, ano, assunto, tipo) {
        // Se for a primeira questão, remove a mensagem vazia
        if (questaoContador === 0) {
            if (emptyMessage) emptyMessage.remove();
        }

        questaoContador++;

        const card = document.createElement("section");
        card.className = "questao-card animate-fade-in";
        card.id = `questao-${questaoContador}`;

        // Header do card da questão
        let questaoHtml = `
            <div class="questao-header">
                <span class="questao-numero">Questão ${questaoContador}.</span>
                <div class="questao-enunciado">${formatarTextoFisica(questaoObj.enunciado)}</div>
                <button class="btn-delete-questao" title="Excluir Questão" data-id="${questaoContador}">✕</button>
            </div>
        `;

        // Renderiza Opções de acordo com o tipo
        if (tipo === "multipla" && questaoObj.opcoes) {
            questaoHtml += `<div class="questao-opcoes">`;
            const letras = ["A", "B", "C", "D", "E"];
            letras.forEach(letra => {
                if (questaoObj.opcoes[letra]) {
                    questaoHtml += `
                        <div class="opcao-item">
                            <span class="opcao-letra">${letra}</span>
                            <span class="opcao-texto">${formatarTextoFisica(questaoObj.opcoes[letra])}</span>
                        </div>
                    `;
                }
            });
            questaoHtml += `</div>`;
        } else {
            // Renderiza espaço pontilhado para prova impressa discursiva
            questaoHtml += `
                <div class="questao-espaco-discursivo"></div>
            `;
        }

        // Renderiza o Bloco do Gabarito e Resolução Detalhada
        const respostaRotulo = tipo === "multipla" 
            ? `Alternativa correta:<span class="gabarito-letra-destaque">${questaoObj.resposta_correta}</span>` 
            : `Padrão de Resposta Esperado: <strong>${formatarTextoFisica(questaoObj.resposta_correta)}</strong>`;

        questaoHtml += `
            <div class="questao-gabarito">
                <div class="gabarito-header">💡 Gabarito & Resolução Comentada</div>
                <p class="gabarito-resposta-correta">${respostaRotulo}</p>
                <div class="gabarito-explicacao">
                    ${formatarTextoFisica(questaoObj.gabarito_detalhado).replace(/\n/g, '<br>')}
                </div>
            </div>
        `;

        // Tags de Metadados (Apenas visíveis na edição, ocultas na impressão)
        const anoTag = dicionarioBNCC[ano].nome.split(" - ")[0];
        questaoHtml += `
            <div class="questao-meta">
                <span class="tag-meta">🏷️ ${anoTag}</span>
                <span class="tag-meta">📚 ${assunto.split(" (")[0]}</span>
                <span class="tag-meta">⚙️ ${tipo === "multipla" ? "Múltipla Escolha" : "Discursiva"}</span>
            </div>
        `;

        card.innerHTML = questaoHtml;
        provaContainer.appendChild(card);

        // Reprocessa fórmulas LaTeX com MathJax
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise();
        }

        // Listener para o botão de exclusão individual
        const btnDelete = card.querySelector(".btn-delete-questao");
        btnDelete.addEventListener("click", () => {
            card.remove();
            reordenarEVerificarQuestoes();
        });
    }

    // Função utilitária para substituir caracteres de quebra e destacar termos físicos se necessário
    function formatarTextoFisica(texto) {
        if (!texto) return "";
        // Remove possíveis tags html maliciosas mantendo segurança
        let textoSeguro = texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        
        // Só aplica substituição legada de sobrescrito/subscrito se NÃO contiver LaTeX
        if (!texto.includes("\\(") && !texto.includes("$$") && !texto.includes("$")) {
            textoSeguro = textoSeguro
                .replace(/\^([0-9a-zA-Z+-]+)/g, "<sup>$1</sup>") // Sobrescrito ex: x^2 -> x²
                .replace(/_([0-9a-zA-Z]+)/g, "<sub>$1</sub>");    // Subscrito ex: H_2O -> H₂O
        }
            
        return textoSeguro;
    }

    // Reordena numeração das questões restantes caso alguma seja deletada
    function reordenarEVerificarQuestoes() {
        const cards = provaContainer.querySelectorAll(".questao-card");
        questaoContador = 0;
        
        if (cards.length === 0) {
            // Se esvaziou a prova, recoloca a mensagem de vazio
            provaContainer.innerHTML = "";
            provaContainer.appendChild(emptyMessage);
        } else {
            cards.forEach((card) => {
                questaoContador++;
                card.id = `questao-${questaoContador}`;
                
                const numSpan = card.querySelector(".questao-numero");
                if (numSpan) numSpan.textContent = `Questão ${questaoContador}.`;
                
                const btnDelete = card.querySelector(".btn-delete-questao");
                if (btnDelete) btnDelete.setAttribute("data-id", questaoContador);
            });
        }
    }

    // 8. Handlers de Eventos dos Botões de Ação
    
    // Geração de Questões
    btnGerar.addEventListener("click", async () => {
        const ano = selectAno.value;
        const assunto = selectAssunto.value;
        const tipo = selectTipo.value;
        const estilo = selectEstilo.value;
        const dificuldade = selectDificuldade.value;
        const instrucoes = instrucoesAdicionais.value;
        const contexto = caixaContexto.value;

        // Ativa estado de carregamento
        btnGerar.disabled = true;
        btnGerarText.textContent = "Gerando item com IA...";
        btnSpinner.classList.remove("hidden");

        try {
            const questao = await gerarQuestaoIA(ano, assunto, tipo, estilo, dificuldade, instrucoes, contexto);
            if (questao) {
                renderizarQuestao(questao, ano, assunto, tipo);
            }
        } catch (erro) {
            console.error("Erro na geração da IA:", erro);
            alert(`Falha ao gerar questão: ${erro.message}\n\nVerifique se sua API Key do OpenRouter está correta, ativa e com saldo de créditos disponível.`);
        } finally {
            // Restaura botões
            btnSpinner.classList.add("hidden");
            btnGerarText.textContent = "🚀 Gerar e Adicionar Questão";
            validarCamposGeracao();
        }
    });

    // Impressão da prova
    btnImprimir.addEventListener("click", () => {
        window.print();
    });

    // Alternar visualização de gabaritos
    btnToggleGabarito.addEventListener("click", () => {
        folhaProva.classList.toggle("hide-gabaritos");
        const ocultos = folhaProva.classList.contains("hide-gabaritos");
        btnToggleGabarito.innerHTML = ocultos 
            ? "<span>👁️ Exibir Gabaritos</span>" 
            : "<span>👁️ Ocultar Gabaritos</span>";
    });

    // Limpar toda a prova
    btnLimpar.addEventListener("click", () => {
        if (provaContainer.querySelectorAll(".questao-card").length === 0) return;
        
        if (confirm("Tem certeza que deseja limpar todas as questões da prova atual?")) {
            provaContainer.innerHTML = "";
            questaoContador = 0;
            provaContainer.appendChild(emptyMessage);
        }
    });

    // 9. Handlers do Modal de API
    btnConfigAPI.addEventListener("click", abrirModal);
    btnCloseModal.addEventListener("click", fecharModal);
    btnCancelarAPI.addEventListener("click", fecharModal);

    btnSalvarAPI.addEventListener("click", () => {
        const chaveStr = inputAPIKey.value;
        salvarAPIKey(chaveStr);
        fecharModal();
        if (chaveStr.trim() !== "") {
            alert("API Key do OpenRouter configurada com sucesso! Agora você pode gerar suas questões de Física.");
        }
    });

    // Fecha o modal ao clicar fora da caixa
    window.addEventListener("click", (e) => {
        if (e.target === modalAPI) {
            fecharModal();
        }
    });

    // Inicialização da aplicação
    verificarChaveInicial();
});
