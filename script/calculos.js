//Estandares
const anchoManija = 9;
const altoManija = 78;
const extraFrancesa = 5;
const extraFilete = 2;
//Para Tote Bags
const extraDoblez = 10;
//Para Ajustables
const extraDoblezA = 8;
const compras = [];

//Función constructora de objetos para compras
function Compra (producto,insumo,ancho,cantidad){
    this.producto = producto,
    this.insumo = insumo,
    this.ancho = ancho,
    this.cantidad = cantidad
}

//FUNCION PARA ELEGIR PRODUCTO
function elegirProducto(){

    let tipoBolsa = document.getElementsByName("producto");
    
    for(let elemento of tipoBolsa){
        let tipo = elemento.id;
        if (elemento.checked) {
            switch (tipo) {
                case "TBS":
                    document.getElementById("formTB").classList.remove("hide")
                    document.getElementById("formA").classList.add("hide")
                    break;
                case "AS":
                    document.getElementById("formTB").classList.add("hide")
                    document.getElementById("formA").classList.remove("hide")
                    break;
                default:
                    break;
            }
        }
    }
}

//FUNCION PARA AUTOCOMPLETAR POR TALLAS TOTEBAGS
function autocompletarTotes(){
    console.log("totes")
    let anchoBolsa;
    let altoBolsa;
    let tallaBolsa = document.getElementsByName("talla-TBS");

    anchoBolsa = document.getElementById("ancho-bolsa-TBS");
    altoBolsa = document.getElementById("alto-bolsa-TBS");

    for(let elemento of tallaBolsa){
        let talla = elemento.id;
        if (elemento.checked) {
            switch (talla) {
                case "S":
                    anchoBolsa.value = 35;
                    altoBolsa.value = 30;
                    break;
                case "M":
                    anchoBolsa.value = 35;
                    altoBolsa.value = 40;
                    break;
                case "L":
                    anchoBolsa.value = 45;
                    altoBolsa.value = 40;
                    break;
                case "XL":
                    anchoBolsa.value = 45;
                    altoBolsa.value = 50;
                    break;
                case "personalizada":
                    anchoBolsa.value = "";
                    altoBolsa.value = "";
                    break;
                default:
                    break;
            }
        }
    }
}

//FUNCION PARA AUTOCOMPLETAR POR TALLAS AJUSTABLES
function autocompletarAjustable(){
    let anchoBolsa;
    let altoBolsa;
    let tallaBolsa = document.getElementsByName("talla-AS");

    anchoBolsa = document.getElementById("ancho-bolsa-AS");
    altoBolsa = document.getElementById("alto-bolsa-AS");

    for(let elemento of tallaBolsa){
        let talla = elemento.id;
        if (elemento.checked) {
            switch (talla) {
                case "XS":
                    anchoBolsa.value = 15;
                    altoBolsa.value = 15;
                    break;
                case "S":
                    anchoBolsa.value = 15;
                    altoBolsa.value = 25;
                    break;
                case "M":
                    anchoBolsa.value = 25;
                    altoBolsa.value = 25;
                    break;
                case "L":
                    anchoBolsa.value = 30;
                    altoBolsa.value = 40;
                    break;
                case "personalizada":
                    anchoBolsa.value = "";
                    altoBolsa.value = "";
                    break;
                default:
                    break;
            }
        }
    }
}

//Capturar datos del formulario
function captura() {

    let tipoManija;
    let tipoTela;
    let anchoTela;
    let tipoCostura;
    let cantidad;
    let anchoBolsa;
    let altoBolsa;
    let fuelleBolsa;

    let tipoBolsa = document.getElementsByName("producto");
    
    for(let elemento of tipoBolsa){
        console.log("entre a for")
        let tipo = elemento.id;
        if (elemento.checked) {
            switch (tipo) {
                case "TBS":
                    //Datos generales
                    tipoManija = document.getElementById("tipo-manija").value;
                    tipoTela = document.getElementById("tipo-tela-TBS").value;
                    anchoTela = parseFloat(document.getElementById("ancho-tela-TBS").value);
                    tipoCostura = document.getElementById("tipo-costura").value;

                    //Datos de la bolsa
                    cantidad = parseInt(document.getElementById("cantidad-TBS").value);
                    anchoBolsa = parseInt(document.getElementById("ancho-bolsa-TBS").value);
                    altoBolsa = parseInt(document.getElementById("alto-bolsa-TBS").value);
                    fuelleBolsa = parseInt(document.getElementById("fuelle-bolsa-TBS").value);

                    //Envío data para obtener cálculo
                    calcularToteSencilla(tipoManija,tipoTela,anchoTela,tipoCostura,cantidad,anchoBolsa,altoBolsa,fuelleBolsa);
                    break;
                case "AS":
                    //Datos generales
                    tipoTela = document.getElementById("tipo-tela-AS").value;
                    anchoTela = parseFloat(document.getElementById("ancho-tela-AS").value);

                    //Datos de la bolsa
                    cantidad = parseInt(document.getElementById("cantidad-AS").value);
                    anchoBolsa = parseInt(document.getElementById("ancho-bolsa-AS").value);
                    altoBolsa = parseInt(document.getElementById("alto-bolsa-AS").value);
                    fuelleBolsa = parseInt(document.getElementById("fuelle-bolsa-AS").value);

                    //Envío data para obtener cálculo
                    calcularAjustableSencilla(tipoTela,anchoTela,cantidad,anchoBolsa,altoBolsa,fuelleBolsa);
                    break;
                default:
                    break;
            }
        }
    }
}

//FUNCIÓN PARA TOTE BAG SENCILLA

function calcularToteSencilla(tipoManija,tipoTela,anchoTela,tipoCostura,cantidad,anchoBolsa,altoBolsa,fuelleBolsa) {
    //Definir talla del producto
    let tallaBolsa = document.getElementsByName("talla-TBS");
    for(let elemento of tallaBolsa){
        let talla = elemento.id;
        if (elemento.checked) {
            switch (talla) {
                case "S":
                    tallaBolsa = "S";
                    break;
                case "M":
                    tallaBolsa = "M";
                    break;
                case "L":
                    tallaBolsa = "L";
                    break;
                case "XL":
                    tallaBolsa = "XL";
                    break;
                case "personalizada":
                    tallaBolsa = "";
                    break;
                default:
                    break;
            }
        }
    }

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
        compras.push(new Compra (`${cantidad} Tote Bag ${tallaBolsa}`,tipoTela,anchoTela,cantTela));

        alert(`¡Necesitas ${cantTela} metros de ${tipoTela}!`)
    }else{
        //Calculo metros de reata
        let cantReata = ((cantidad*2)*altoManija)/100;
        //Calculo total de metros de tela
        let cantTela = (tirasBolsas*altoPieza)/100;

        cantReata = cantReata.toFixed(2);
        cantTela = cantTela.toFixed(2);

        compras.push(new Compra (`${cantidad} Tote Bag ${tallaBolsa}`,tipoTela,anchoTela,cantTela));
        compras.push(new Compra (`Manijas para ${cantidad} Tote Bag`,"Reata","-",cantReata));

        alert(`¡Necesitas ${cantTela} metros de ${tipoTela} y ${cantReata} metros de reata!`)
    }

}

//FUNCIÓN PARA AJUSTABLE SENCILLA

function calcularAjustableSencilla(tipoTela,anchoTela,cantidad,anchoBolsa,altoBolsa,fuelleBolsa){
    //Definir talla
    console.log("CALCULAR AJUSTABLES")
    let tallaBolsa = document.getElementsByName("talla-AS");
    for(let elemento of tallaBolsa){
        let talla = elemento.id;
        if (elemento.checked) {
            switch (talla) {
                case "XS":
                    tallaBolsa = "XS";
                    break;
                case "S":
                    tallaBolsa = "S";
                    break;
                case "M":
                    tallaBolsa = "M";
                    break;
                case "L":
                    tallaBolsa = "L";
                    break;
                case "personalizada":
                    tallaBolsa = "";
                    break;
                default:
                    break;
            }
        }
    }

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
    compras.push(new Compra (`${cantidad} Ajustable ${tallaBolsa}`,tipoTela,anchoTela,cantTela));
    compras.push(new Compra (`Cordón o hiladillo para ${cantidad} Ajustable ${tallaBolsa}`,"Cordón o hiladillo","-",cantCordon));
    console.log(compras);
    alert(`¡Necesitas ${cantTela} metros de ${tipoTela} y ${cantCordon} metros de cordón!`)
}




let mostrarComprasBTN = document.getElementById("mostrarCompras");

mostrarComprasBTN.onclick = ()=>{
    if(compras.length >= 1){
        compras.forEach(element => {
            console.log(element)
        });
    }else{
        console.log("Aún no tiene compras")
    }
    
}

let buscarComprasValor = document.getElementById("buscarCompras");
let buscarComprasBTN = document.getElementById("btnBuscarCompras");

buscarComprasBTN.onclick =  ()=>{
    buscarCompras(buscarComprasValor.value, compras)
}

function buscarCompras (input, array){
    let resultadoBusqueda = array.filter(
        (compra) => compra.insumo.toLowerCase().includes(input.toLowerCase()) || compra.producto.toLowerCase().includes(input.toLowerCase())
    )
    console.log(input)
    console.log(resultadoBusqueda)
}