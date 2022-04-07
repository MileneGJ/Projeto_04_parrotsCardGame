let ncartas = prompt("Com quantas cartas quer jogar?");
while (ncartas % 2 !== 0 || ncartas < 4 || ncartas > 14) {
    alert(ncartas);
    ncartas = prompt("Com quantas cartas quer jogar?");
}
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
for(let i=0;i<(ncartas/2);i++){
figurasEscolhidas.push(figurasEscolhidas[i]);
}
figurasEscolhidas.sort(comparador);

for (let i = 0; i < ncartas; i++) {
    let mesa = document.querySelector(".container")
    mesa.innerHTML+= `<div class="carta" onclick="virarCarta(this)">
    <img class="frente" src="./imagens/front.png">
    <img class="tras" src="./imagens/${figurasEscolhidas[i]}.gif">
</div>`;
}



function virada(element) {
    element.classList.toggle("virada")
    let listIMG = element.querySelectorAll("img");
    let cont = 0;
    while (cont < 2) {
        listIMG[cont].classList.toggle("tras");
        listIMG[cont].classList.toggle("frente");
        cont++;
    }
}

function virarCarta(element) {
    let cartaVirada = document.querySelector(".virada .frente");
    if (cartaVirada !== null) { cartaVirada = cartaVirada.src }
    virada(element);
    let IMGcarta = element.querySelector(".frente").src;
    //Se já houver uma carta virada com img frente diferente dessa, então desvirar as duas
    //A carta virada selecionada tem que ser sem par
    if (cartaVirada !== null && IMGcarta !== cartaVirada) {
        alert("ERROU");
        virada(element);
        virada(document.querySelector(".virada"));
    }
}