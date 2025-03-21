const gabaritos = {
    "081": ["D", "A", "A","D","C","B","B","C","A","D","B","A","D"], //parei na questao 13, seguir da 14 adiante
    "082": ["C"],
    "083": [],
    "084": []
};

let codigo;
let indicePergunta = 0;
let tentativas = 3;
let pontuacao = 0;

function iniciarQuiz() {
    codigo = prompt("Digite o código do programa:");
    if (!gabaritos[codigo]) {
        alert("Código inválido! Tente novamente.");
        return;
    }
    indicePergunta = 0;
    tentativas = 3;
    pontuacao = 0;
    atualizarTela();
}

 document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const resposta = button.textContent.trim().toUpperCase();
            if (resposta === "REINICIAR") {
                iniciarQuiz();
            } else {
                responder(resposta);
        }
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
}

iniciarQuiz();
