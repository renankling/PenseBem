const gabaritos = {
    "081": ["D", "A", "A","D","C","B","B","C","A","D","B","A","D","C","C","B","A","B","D","A",
            "C","A","B","C","B","D","A","B","A","B"],
    "082": ["D","A","C","A","C","C","B","D","D","D","B","D","C","B","A","D","A","C","A","A","B",
            "C","A","A","B","A","D","B","B","B"],
    "083": ["C","D","C","D","D","D","A","C","A","B","B","B","C","A","B","B","B","D","D","C","C",
            "B","A","B","B","A","D","B","D","D"],
    "084": ["C","C","C","B","A","D","B","A","D","B","B","D","C","A","A","A","B","D","A","B","C",
            "C","D","D","C","C","D","D","A","A"]
};

const imagensPerguntas = {
    "081": [
        "imagens/Q1.png",
        "imagens/Q2.png",
        "imagens/Q3.png",
        "imagens/Q4.png",
        "imagens/Q5.png",
        "imagens/Q6.png",
        "imagens/Q7.png",
        "imagens/Q8.png",
        "imagens/Q9.png",
        "imagens/Q10.png",
        "imagens/Q11.png",
        "imagens/Q12.png",
        "imagens/Q13.png",
        "imagens/Q14.png",
        "imagens/Q15.png",
        "imagens/Q16.png",
        "imagens/Q17.png",
        "imagens/Q18.png",
        "imagens/Q19.png",
        "imagens/Q20.png",
        "imagens/Q21.png",
        "imagens/Q22.png",
        "imagens/Q23.png",
        "imagens/Q24.png",
        "imagens/Q25.png",
        "imagens/Q26.png",
        "imagens/Q27.png",
        "imagens/Q28.png",
        "imagens/Q29.png",
        "imagens/Q30.png",
    ],
    "082": [
        "imagens/Q31.png",
        "imagens/Q32.png",
        "imagens/Q33.png",
        "imagens/Q34.png",
        "imagens/Q35.png",
        "imagens/Q36.png",
        "imagens/Q37.png",
        "imagens/Q38.png",
        "imagens/Q39.png",
        "imagens/Q40.png",
        "imagens/Q41.png",
        "imagens/Q42.png",
        "imagens/Q43.png",
        "imagens/Q44.png",
        "imagens/Q45.png",
        "imagens/Q46.png",
        "imagens/Q47.png",
        "imagens/Q48.png",
        "imagens/Q49.png",
        "imagens/Q50.png",
        "imagens/Q51.png",
        "imagens/Q52.png",
        "imagens/Q53.png",
        "imagens/Q54.png",
        "imagens/Q55.png",
        "imagens/Q56.png",
        "imagens/Q57.png",
        "imagens/Q58.png",
        "imagens/Q59.png",
        "imagens/Q60.png",
    ],
    "083": [
        "imagens/Q61.png",
        "imagens/Q62.png",
        "imagens/Q63.png",
        "imagens/Q64.png",
        "imagens/Q65.png",
        "imagens/Q66.png",
        "imagens/Q67.png",
        "imagens/Q68.png",
        "imagens/Q69.png",
        "imagens/Q70.png",
        "imagens/Q71.png",
        "imagens/Q72.png",
        "imagens/Q73.png",
        "imagens/Q74.png",
        "imagens/Q75.png",
        "imagens/Q76.png",
        "imagens/Q77.png",
        "imagens/Q78.png",
        "imagens/Q79.png",
        "imagens/Q80.png",
        "imagens/Q81.png",
        "imagens/Q82.png",
        "imagens/Q83.png",
        "imagens/Q84.png",
        "imagens/Q85.png",
        "imagens/Q86.png",
        "imagens/Q87.png",
        "imagens/Q88.png",
        "imagens/Q89.png",
        "imagens/Q90.png",
    ],
    "084": [
        "imagens/Q91.png",
        "imagens/Q92.png",
        "imagens/Q93.png",
        "imagens/Q94.png",
        "imagens/Q95.png",
        "imagens/Q96.png",
        "imagens/Q97.png",
        "imagens/Q98.png",
        "imagens/Q99.png",
        "imagens/Q100.png",
        "imagens/Q101.png",
        "imagens/Q102.png",
        "imagens/Q103.png",
        "imagens/Q104.png",
        "imagens/Q105.png",
        "imagens/Q106.png",
        "imagens/Q107.png",
        "imagens/Q108.png",
        "imagens/Q109.png",
        "imagens/Q110.png",
        "imagens/Q111.png",
        "imagens/Q112.png",
        "imagens/Q113.png",
        "imagens/Q114.png",
        "imagens/Q115.png",
        "imagens/Q116.png",
        "imagens/Q117.png",
        "imagens/Q118.png",
        "imagens/Q119.png",
        "imagens/Q120.png",

    ]
}

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
    document.getElementById('imagem-pergunta').classList.remove('hidden');
    
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
        document.getElementById("som-acerto").play();
        proximaPergunta();
    } else {
        document.getElementById("som-erro").play();
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
    if (imagensPerguntas[codigo] && imagensPerguntas[codigo][indicePergunta]) {
        document.getElementById("imagem-pergunta").src = imagensPerguntas[codigo][indicePergunta];
    } else {
        document.getElementById("imagem-pergunta").src = ""; // Se não houver imagem, remove a anterior
    }
}