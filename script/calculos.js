//Estandares
const anchoManija = 9;
const altoManija = 78;
const extraFrancesa = 5;
const extraFilete = 2;
//Para Tote Bags
const extraDoblez = 10;
//Para Ajustables
const extraDoblezA = 8;


//Capturar datos del formulario
function captura() {
    let tipoBolsa = document.getElementById("tipo-bolsa").value;

    let tipoManija;
    let tipoTela;
    let anchoTela;
    let tipoCostura;
    let cantidad;
    let anchoBolsa;
    let altoBolsa;
    let fuelleBolsa;

    switch (tipoBolsa) {
        case "toteSencilla":
            //Datos generales
            tipoManija = document.getElementById("tipo-manija").value;
            tipoTela = document.getElementById("tipo-tela").value;
            anchoTela = parseFloat(document.getElementById("ancho").value);
            tipoCostura = document.getElementById("tipo-costura").value;

            //Datos de la bolsa
            cantidad = parseInt(document.getElementById("cantidad").value);
            anchoBolsa = parseInt(document.getElementById("ancho-bolsa").value);
            altoBolsa = parseInt(document.getElementById("alto-bolsa").value);
            fuelleBolsa = parseInt(document.getElementById("fuelle-bolsa").value);

            //Envío data para obtener cálculo
            calcularToteSencilla(tipoManija,tipoTela,anchoTela,tipoCostura,cantidad,anchoBolsa,altoBolsa,fuelleBolsa);
            break;

        case "ajustableSencilla":
            //Datos generales
            tipoTela = document.getElementById("tipo-tela").value;
            anchoTela = parseFloat(document.getElementById("ancho").value);

            //Datos de la bolsa
            cantidad = parseInt(document.getElementById("cantidad").value);
            anchoBolsa = parseInt(document.getElementById("ancho-bolsa").value);
            altoBolsa = parseInt(document.getElementById("alto-bolsa").value);
            fuelleBolsa = parseInt(document.getElementById("fuelle-bolsa").value);

            //Envío data para obtener cálculo
            calcularAjustableSencilla(tipoTela,anchoTela,cantidad,anchoBolsa,altoBolsa,fuelleBolsa);
            break;
        default:
            break;
    }

    
}

//FUNCIÓN PARA TOTE BAG SENCILLA

function calcularToteSencilla(tipoManija,tipoTela,anchoTela,tipoCostura,cantidad,anchoBolsa,altoBolsa,fuelleBolsa) {
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

//FUNCIÓN PARA AJUSTABLE SENCILLA

function calcularAjustableSencilla(tipoTela,anchoTela,cantidad,anchoBolsa,altoBolsa,fuelleBolsa){
    //Calculo del tamaño de la pieza a cortar
    let altoPieza = 0;
    //Ancho
    let anchoPieza = anchoBolsa + fuelleBolsa + extraFilete;
    //Alto
    if(tipoTela=="Drill" || tipoTela=="Lienzo"){
        altoPieza = (altoBolsa*2) + fuelleBolsa + extraDoblezA + 1;
    }else{
        altoPieza = (altoBolsa*2) + fuelleBolsa + extraDoblezA;
    }
    
    //Calculo de cuantas piezas caben en cada tira de tela
    let undPorTira = anchoTela / anchoPieza;
    undPorTira = Math.floor(undPorTira);
    //Calculo del número de tiras que se necesitan
    let tirasBolsas = cantidad / undPorTira;
    tirasBolsas = Math.ceil(tirasBolsas);

    let cordonPorBolsa = (anchoBolsa*4)+20;
    let cantCordon = (cordonPorBolsa*cantidad)/100;
    //Calculo total de metros de tela
    let cantTela = (tirasBolsas*altoPieza)/100;

    alert(`¡Necesitas ${cantTela} metros de ${tipoTela} y ${cantCordon} metros de cordón!`)
}