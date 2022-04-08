
// Definições de variáveis

let tempo = 0;
let contador = 0;
let reiniciar = "";
const figuras = ["bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "unicornparrot",
    "metalparrot",
    "tripletsparrot",
    "revertitparrot"]

// Função para randomizar cartas
function comparador() {
    return Math.random() - 0.5;
}

// Contagem do tempo de jogo e atualização dos segundos no relógio
function contagemTempo() {
    tempo++;
    document.querySelector(".relogio").innerHTML = `<div class="relogio">
    <p>Tempo de jogo: ${tempo} segundos</p>
    </div>`;
}

// Ação de virada da carta
function virada(element) {
    element.classList.toggle("virada")
    let listIMG = element.querySelectorAll("img");
    for (let i = 0; i < 2; i++) {
        listIMG[i].parentNode.classList.toggle("tras");
        listIMG[i].parentNode.classList.toggle("frente");
    }
}


// Função para perguntar o número de cartas e distribuí-las aleatoriamente
function distribuição() {
    let ncartas = prompt("Com quantas cartas quer jogar?");
    while (ncartas % 2 !== 0 || ncartas < 4 || ncartas > 14) {
        ncartas = prompt("Escolha um número par entre 4 e 14!\nCom quantas cartas quer jogar?");
    }

    // Embaralhando as cartas (uma de cada tipo)
    figuras.sort(comparador);
    let figurasEscolhidas = figuras.slice(0, (ncartas / 2));

    // Duplicando as cartas escolhidas e reembaralhando
    for (let i = 0; i < (ncartas / 2); i++) {
        figurasEscolhidas.push(figurasEscolhidas[i]);
    }
    figurasEscolhidas.sort(comparador);

    // Inserindo relógio
    document.querySelector(".container").innerHTML += `<div class="relogio">
<p>Tempo de jogo: ${tempo} segundos</p>
</div>`

    // Populando o DOM com as cartas escolhidas embaralhadas
    for (let i = 0; i < ncartas; i++) {
        let mesa = document.querySelector(".container")
        mesa.innerHTML += `<div class="carta" onclick="virarCarta(this)">
    <div class="frente"><img src="./imagens/front.png"></div>
    <div class="tras"><img src="./imagens/${figurasEscolhidas[i]}.gif"></div>
</div>`;
    }
}

// Iniciando o jogo em si com a função de distribuir e a contagem do tempo
distribuição()
let ID = setInterval(contagemTempo, 1000);



// Função para virar a carta ao clicar e avaliar as seguintes ações com base nas outras cartas viradas
function virarCarta(element) {
    let cartaVirada = document.querySelector(".virada > .frente > img");
    if (cartaVirada !== null) { cartaVirada = cartaVirada.src }  // guardar nome de outra carta virada (se houver)
    virada(element);
    let IMGcarta = element.querySelector(".frente > img").src; // guardar nome da carta atual virada

    //Se já houver uma carta virada com img diferente dessa, então desvirar as duas depois de 1 segundo
    if (cartaVirada !== null && IMGcarta !== cartaVirada) {
        setTimeout(function () { virada(element) }, 1000);
        setTimeout(function () { virada(document.querySelector(".virada")) }, 1000);

        // Se as cartas forem iguais, então mantê-las abertas. A classe virada foi removida para que elas não sejam mais avaliadas
    } else if (IMGcarta === cartaVirada) {
        element.classList.remove("virada");
        document.querySelector(".virada").classList.remove("virada");
    }

    // Contabilizar a jogada atual
    contador++;

    //Avaliar se ainda há cartas viradas para baixo (faltantes para terminar o jogo)
    let faltantes = 0
    let cartasEscondidas = document.querySelectorAll(".frente > img");
    for (i = 0; i < cartasEscondidas.length; i++) {
        if (cartasEscondidas[i].src.includes("front.png")) {
            faltantes++;
        }
    }

    // Se não há mais cartas viradas para baixo, terminar o jogo, anunciar vitória e perguntar se o usuário quer reiniciar
    if (faltantes === 0) {
        clearInterval(ID);
        alert(`Você ganhou em ${contador} jogadas e em ${tempo} segundos!`);
        document.querySelector(".container").innerHTML = "";
        tempo = 0;
        contador = 0;
        reiniciar = prompt("Você gostaria de reiniciar a partida?");
        while (reiniciar !== "sim" && reiniciar !== "não") {
            reiniciar = prompt("Você gostaria de reiniciar a partida?\nResponda com 'sim' ou 'não'.");
        }
        if (reiniciar === "sim") {
            distribuição();
            ID = setInterval(contagemTempo, 1000);
        } else if (reiniciar === "não") {
            document.querySelector(".container").innerHTML = "Bom Jogo!!!"
        }
    }
}

