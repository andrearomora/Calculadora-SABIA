//Estandares
const anchoManija = 9;
const altoManija = 78;
const extraFrancesa = 5;
const extraFilete = 2;
const extraDoblez = 10;


//Capturar datos del formulario
function captura() {
    //Datos generales
    let tipoManija = document.getElementById("tipo-manija").value;
    let tipoTela = document.getElementById("tipo-tela").value;
    let anchoTela = parseFloat(document.getElementById("ancho").value);
    let tipoCostura = document.getElementById("tipo-costura").value;
    
    //Datos de la bolsa
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let anchoBolsa = parseInt(document.getElementById("ancho-bolsa").value);
    let altoBolsa = parseInt(document.getElementById("alto-bolsa").value);
    let fuelleBolsa = parseInt(document.getElementById("fuelle-bolsa").value);

    //Envío data para obtener cálculo
    calcular(tipoManija,tipoTela,anchoTela,tipoCostura,cantidad,anchoBolsa,altoBolsa,fuelleBolsa);
}

function calcular(tipoManija,tipoTela,anchoTela,tipoCostura,cantidad,anchoBolsa,altoBolsa,fuelleBolsa) {
    //Calculo del tamaño de la pieza a cortar
    let anchoPieza = 0;
    let altoPieza = 0;
    //Ancho
    if(tipoCostura=="Francesa"){
        anchoPieza = anchoBolsa + fuelleBolsa + extraFrancesa;
    }else{
        anchoPieza = anchoBolsa + fuelleBolsa + extraFilete;
    }
    //Alto
    if(tipoTela=="Drill" || tipoTela=="Lienzo"){
        altoPieza = (altoBolsa*2) + fuelleBolsa + extraDoblez +1;
    }else{
        altoPieza = (altoBolsa*2) + fuelleBolsa + extraDoblez;
    }
    
    //Calculo de cuantas piezas caben en cada tira de tela
    let undPorTira = anchoTela / anchoPieza;
    undPorTira = Math.floor(undPorTira);
    //Calculo del número de tiras que se necesitan
    let tirasBolsas = cantidad / undPorTira;
    tirasBolsas = Math.ceil(tirasBolsas);

    //Calculo final dependiendo del tipo de manijas
    if(tipoManija=="Tela"){
        //Calculo de la cantidad de manijas que pueden salir de las tiras de las bolsas
        let sobrante = anchoTela-(undPorTira*anchoPieza);
        let manijasDeSobrantes = 0;
        if((sobrante/anchoManija) > 1){
            let manijasPorSobrante = Math.floor(sobrante/anchoManija);
            for (let i = 0; i < tirasBolsas; i++) {
                manijasDeSobrantes = manijasDeSobrantes + manijasPorSobrante;
            }
        }
        //Calculo de tiras de manijas
        let manijasPorTira = anchoTela / anchoManija;
        manijasPorTira = Math.floor(manijasPorTira) 
        let tirasManijas = ((cantidad*2)-manijasDeSobrantes)/manijasPorTira;
        //Calculo total de metros de tela
        let cantTela = ((tirasBolsas*altoPieza)+(tirasManijas*altoManija))/100;
        cantTela = cantTela.toFixed(2);
        alert(`¡Necesitas ${cantTela} metros de ${tipoTela}!`)
    }else{
        //Calculo metros de reata
        let cantReata = ((cantidad*2)*altoManija)/100;
        //Calculo total de metros de tela
        let cantTela = (tirasBolsas*altoPieza)/100;

        cantReata = cantReata.toFixed(2);
        cantTela = cantTela.toFixed(2);

        alert(`¡Necesitas ${cantTela} metros de ${tipoTela} y ${cantReata} metros de reata!`)
    }

}
