let ncartas = prompt("Com quantas cartas quer jogar?");
while(ncartas%2!==0||ncartas<4||ncartas>14){
    alert(ncartas);
    ncartas = prompt("Com quantas cartas quer jogar?");
}
let contador = 0;
let cartasExcluidas = 14 - ncartas;
while (contador<cartasExcluidas){
let element = document.querySelector(".carta");
element.remove()
    contador++;
}

function virada (element){
    element.classList.toggle("virada")
    let listIMG = element.querySelectorAll("img");
    let cont = 0;
    while(cont<2){
        listIMG[cont].classList.toggle("tras");
        listIMG[cont].classList.toggle("frente");
        cont++;
    }
}

function virarCarta(element){
    let cartaVirada = document.querySelector(".virada .frente");
    if(cartaVirada!==null)
    {cartaVirada = cartaVirada.src}
    virada(element);
    let IMGcarta = element.querySelector(".frente").src;
    //Se já houver uma carta virada com img frente diferente dessa, então desvirar as duas
    //A carta virada selecionada tem que ser sem par
    if(cartaVirada!==null&&IMGcarta!==cartaVirada){
        alert("ERROU");
    virada(element);
    virada(document.querySelector(".virada"));
    }
}