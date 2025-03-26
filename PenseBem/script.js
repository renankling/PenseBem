const gabaritos = {
    "081": ["D", "A", "A","D","C","B","B","C","A","D","B","A","D","C","C","B","A","B","D","A",
            "C","A","B","C","B","D","A","B","A","B"],
    "082": ["C"],
    "083": [],
    "084": ["C","C","C","B","A","D","B","A","D","B","B","D","C","A","A","A","B","D","A","B","C",
            "C","D","D","C","C","D","D","A","A"]
};

let codigo;
let indicePergunta = 0;
let tentativas = 3;
let pontuacao = 0;

function iniciarQuiz() {
    codigo = document.getElementById("codigo").value.trim();

    if (!gabaritos[codigo] || gabaritos[codigo].length === 0) {
        alert("Código inválido ou sem perguntas!");
        return;
    }

    document.querySelector('.pontuacao').classList.remove('hidden');
    document.getElementById('botoes-resposta').classList.remove('hidden');
    
    indicePergunta = 0;
    tentativas = 3;
    pontuacao = 0;
    atualizarTela();
}

document.querySelectorAll("#botaoA, #botaoB, #botaoC, #botaoD").forEach(button => {
    button.addEventListener("click", () => {
        const resposta = button.textContent.trim().toUpperCase();
        responder(resposta);
    });
});

function responder(resposta) {
    if (!gabaritos[codigo]) return;
    const respostaCorreta = gabaritos[codigo][indicePergunta];
    
    if (resposta === respostaCorreta) {
        alert("Resposta correta!");
        pontuacao += tentativas; 
        proximaPergunta();
    } else {
        tentativas--;
        if (tentativas > 0) {
            alert(`Resposta errada! Você tem mais ${tentativas} tentativa(s).`);
            atualizarTela();
        } else {
            alert("Você errou todas as tentativas. Próxima pergunta.");
            proximaPergunta();
        }
    }
}

function proximaPergunta() {
    indicePergunta++;
    tentativas = 3;
    if (indicePergunta >= gabaritos[codigo].length) {
        alert(`Quiz finalizado! Sua pontuação total foi: ${pontuacao} pontos.`);
    } else {
        atualizarTela();
    }
}

function atualizarTela() {
    document.getElementById("pergunta-numero").textContent = `Pergunta: ${indicePergunta + 1}`;
    document.getElementById("tentativas-restantes").textContent = `Tentativas restantes: ${tentativas}`;
    document.getElementById("pontos").textContent = `Seus pontos: ${pontuacao}`;
}