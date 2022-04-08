let ncartas = prompt("Com quantas cartas quer jogar?");
while (ncartas % 2 !== 0 || ncartas < 4 || ncartas > 14) {
    ncartas = prompt("Escolha um número par entre 4 e 14!\nCom quantas cartas quer jogar?");
}
let tempo = 0;
function contagemTempo(){
    tempo++;
    document.querySelector(".relogio").innerHTML = `<div class="relogio">
    <p>Tempo de jogo: ${tempo} segundos</p>
    </div>`;
}
let ID = setInterval(contagemTempo,1000);
const figuras = ["bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "unicornparrot",
    "metalparrot",
    "tripletsparrot",
    "revertitparrot"]

function comparador() {
    return Math.random() - 0.5;
}

figuras.sort(comparador);
figurasEscolhidas = figuras.slice(0, (ncartas / 2));
for (let i = 0; i < (ncartas / 2); i++) {
    figurasEscolhidas.push(figurasEscolhidas[i]);
}
figurasEscolhidas.sort(comparador);

document.querySelector(".container").innerHTML += `<div class="relogio">
<p>Tempo de jogo: ${tempo} segundos</p>
</div>`
for (let i = 0; i < ncartas; i++) {
    let mesa = document.querySelector(".container")
    mesa.innerHTML += `<div class="carta" onclick="virarCarta(this)">
    <div class="frente"><img src="./imagens/front.png"></div>
    <div class="tras"><img src="./imagens/${figurasEscolhidas[i]}.gif"></div>
</div>`;
}




function virada(element) {
    element.classList.toggle("virada")
    let listIMG = element.querySelectorAll("img");
    for (let i = 0; i < 2; i++) {
        listIMG[i].parentNode.classList.toggle("tras");
        listIMG[i].parentNode.classList.toggle("frente");
    }
}
let contador =0
function virarCarta(element) {
    let cartaVirada = document.querySelector(".virada > .frente > img");
    if (cartaVirada !== null) { cartaVirada = cartaVirada.src }
    virada(element);
    let IMGcarta = element.querySelector(".frente > img").src;
    //Se já houver uma carta virada com img frente diferente dessa, então desvirar as duas
    if (cartaVirada !== null && IMGcarta !== cartaVirada) {
        setTimeout(function(){virada(element)},1000);
        setTimeout(function(){virada(document.querySelector(".virada"))},1000);
    } else if (IMGcarta === cartaVirada) {
        element.classList.remove("virada");
        document.querySelector(".virada").classList.remove("virada");
    }
contador ++;
let faltantes = 0
let cartasEscondidas = document.querySelectorAll(".frente > img");
for(i=0;i<cartasEscondidas.length;i++){
    if(cartasEscondidas[i].src.includes("front.png")){
faltantes++;
    }
}
if(faltantes===0){
    clearInterval(ID);
    alert(`Você ganhou em ${contador} jogadas e em ${tempo} segundos!`);
}
}