// test_json.js
function limparJSONBruto(str) {
    if (!str) return str;
    let limpo = str.replace(/(?<!\\)\r?\n/g, " ").replace(/\t/g, " ");
    limpo = limpo.replace(/\\(?![\\"])/g, "\\\\");
    return limpo;
}

// Simulated raw AI response
const aiResponse = `{
  "enunciado": "Considere o gráfico de velocidade por tempo $v \\\\text{ x } t$ do MRUV.",
  "opcoes": {
    "A": "10 \\\\text{ m}",
    "B": "20 \\\\text{ m}",
    "C": "30 \\\\text{ m}",
    "D": "40 \\\\text{ m}",
    "E": "50 \\\\text{ m}"
  },
  "resposta_correta": "C",
  "gabarito_detalhado": "Pela área do gráfico..."
}`;

console.log("Raw Response:");
console.log(aiResponse);

try {
    const parsedDirect = JSON.parse(aiResponse);
    console.log("Direct parse successful! Value A:", parsedDirect.opcoes.A);
} catch (e) {
    console.log("Direct parse failed:", e.message);
}

try {
    const cleaned = limparJSONBruto(aiResponse);
    console.log("Cleaned string:");
    console.log(cleaned);
    const parsedCleaned = JSON.parse(cleaned);
    console.log("Cleaned parse successful! Value A:", parsedCleaned.opcoes.A);
} catch (e) {
    console.log("Cleaned parse failed:", e.message);
}
