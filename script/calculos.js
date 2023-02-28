//Estandares
const anchoManija = 9;
const altoManija = 78;
const extraFrancesa = 5;
const extraFilete = 2;
//Para Tote Bags
const extraDoblez = 10;
//Para Ajustables
const extraDoblezA = 8;
let comprasTabla = document.getElementById("comprasTabla");

//Función constructora de objetos para compras
function Compra (insumo,cantidad){
    this.insumo = insumo,
    this.cantidad = cantidad
}

//Revisión de local storage al primer ingreso
let compras;
if(localStorage.getItem("compras")){
    compras = JSON.parse(localStorage.getItem("compras"))
}else{
    compras = []
    localStorage.setItem("compras", compras)
}

//Cargue de tallas de forma asíncrona desde JSON

const cargarTallasA = async () => {
    const response = await fetch("../tallaAjustables.json")
    const tallasAjustables = await response.json()
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

    let anchoBolsa;
    let altoBolsa;
    let tallas = [];
    let tallaBolsa = document.getElementsByName("talla-TBS");

    anchoBolsa = document.getElementById("ancho-bolsa-TBS");
    altoBolsa = document.getElementById("alto-bolsa-TBS");

    const cargarTallasT = async () => {
        const response = await fetch("../tallaTotes.json")
        const tallasTotes = await response.json()
        for (let talla of tallasTotes){
            tallas.push(talla)
        }
        for(let elemento of tallaBolsa){
            let talla = elemento.id;
            if (elemento.checked) {
                for(let i = 0; i < tallas.length ; i++){
                    if (talla == tallas[i].talla) {
                        anchoBolsa.value = tallas[i].ancho;
                        altoBolsa.value = tallas[i].alto;
                    }else{
                        if(talla == "personalizada"){
                            anchoBolsa.value = "";
                            altoBolsa.value = ""; 
                        }
                    }
                }
                
                    
            }
        }
    }
    cargarTallasT()
}


//FUNCION PARA AUTOCOMPLETAR POR TALLAS AJUSTABLES
function autocompletarAjustable(){
    let anchoBolsa;
    let altoBolsa;
    let tallas = [];
    let tallaBolsa = document.getElementsByName("talla-AS");

    anchoBolsa = document.getElementById("ancho-bolsa-AS");
    altoBolsa = document.getElementById("alto-bolsa-AS");

    const cargarTallasA = async () => {
        const response = await fetch("../tallaAjustables.json")
        const tallasAjustables = await response.json()
        for (let talla of tallasAjustables){
            tallas.push(talla)
        }
        for(let elemento of tallaBolsa){
            let talla = elemento.id;
            if (elemento.checked) {
                for(let i = 0; i < tallas.length ; i++){
                    if (talla == tallas[i].talla) {
                        anchoBolsa.value = tallas[i].ancho;
                        altoBolsa.value = tallas[i].alto;
                    }else{
                        if(talla == "personalizada"){
                            anchoBolsa.value = "";
                            altoBolsa.value = ""; 
                        }
                    }
                }
                
                    
            }
        }
    }
    cargarTallasA()
}

//Funcion autocompletar ancho tela
let tipoTelaGlobal;

function autocompletarAnchoTela(){
    let tipoTela = document.getElementsByName("tipo-tela");
    let anchoTela = document.getElementById("ancho-tela-TBS");
    let anchoTelaAS = document.getElementById("ancho-tela-AS");

    for(let elemento of tipoTela){
        let tipo = elemento.id;
        if (elemento.checked) {
            switch (tipo) {
                case "calima":
                    anchoTela.value = 177;
                    anchoTelaAS.value = 177;
                    tipoTelaGlobal = "Calima";
                    break;
                case "drill":
                    anchoTela.value = 147;
                    anchoTelaAS.value = 147;
                    tipoTelaGlobal = "Drill";
                    break;
                case "madreselva":
                    anchoTela.value = 147;
                    anchoTelaAS.value = 147;
                    tipoTelaGlobal = "Madreselva";
                    break;
                case "lienzo":
                    anchoTela.value = 177;
                    anchoTelaAS.value = 177;
                    tipoTelaGlobal = "Lienzo";
                    break;
                case "otra":
                    anchoTela.value = "";
                    anchoTelaAS.value = "";
                    tipoTelaGlobal = "Otra";
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
                    anchoTela = parseFloat(document.getElementById("ancho-tela-TBS").value);
                    tipoCostura = document.getElementById("tipo-costura").value;

                    //Datos de la bolsa
                    cantidad = parseInt(document.getElementById("cantidad-TBS").value);
                    anchoBolsa = parseInt(document.getElementById("ancho-bolsa-TBS").value);
                    altoBolsa = parseInt(document.getElementById("alto-bolsa-TBS").value);
                    fuelleBolsa = parseInt(document.getElementById("fuelle-bolsa-TBS").value);

                    //Envío data para obtener cálculo
                    calcularToteSencilla(tipoManija,anchoTela,tipoCostura,cantidad,anchoBolsa,altoBolsa,fuelleBolsa);
                    break;
                case "AS":
                    //Datos generales
                    anchoTela = parseFloat(document.getElementById("ancho-tela-AS").value);

                    //Datos de la bolsa
                    cantidad = parseInt(document.getElementById("cantidad-AS").value);
                    anchoBolsa = parseInt(document.getElementById("ancho-bolsa-AS").value);
                    altoBolsa = parseInt(document.getElementById("alto-bolsa-AS").value);
                    fuelleBolsa = parseInt(document.getElementById("fuelle-bolsa-AS").value);

                    //Envío data para obtener cálculo
                    calcularAjustableSencilla(anchoTela,cantidad,anchoBolsa,altoBolsa,fuelleBolsa);
                    break;
                default:
                    break;
            }
        }
    }
}

//FUNCIÓN PARA TOTE BAG SENCILLA

function calcularToteSencilla(tipoManija,anchoTela,tipoCostura,cantidad,anchoBolsa,altoBolsa,fuelleBolsa) {
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
    if(tipoTelaGlobal=="Drill" || tipoTelaGlobal=="Lienzo"){
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
        tirasManijas = Math.ceil(tirasManijas)
        //Calculo total de metros de tela
        let cantTela = ((tirasBolsas*altoPieza)+(tirasManijas*altoManija))/100;
        cantTela = cantTela.toFixed(2);
        cantTela = parseFloat(cantTela);
        agregarACompras(new Compra (tipoTelaGlobal,cantTela));

        swal({
            title: `¡Necesitas ${cantTela} metros de ${tipoTelaGlobal}!`,
            text: `
                Tener en cuenta:
                - Cortar ${tirasBolsas} tiras de ${altoPieza} cm para las bolsas.
                - Por cada tira salen ${undPorTira} bolsas de ${anchoPieza}cm.
                - De las tiras de las bolsas salen ${manijasDeSobrantes} manijas.
                - Cortar ${tirasManijas} tiras de ${altoManija} cm para las manijas.
                - De cada tira salen ${manijasPorTira} manijas.
            `,
            icon: "success",
        })

    }else{
        //Calculo metros de reata
        let cantReata = ((cantidad*2)*altoManija)/100;
        //Calculo total de metros de tela
        let cantTela = (tirasBolsas*altoPieza)/100;

        cantReata = cantReata.toFixed(2);
        cantTela = cantTela.toFixed(2);
        cantTela = parseFloat(cantTela);

        agregarACompras(new Compra (tipoTelaGlobal,cantTela));
        agregarACompras(new Compra ("Reata",cantReata));

        swal({
            title: `¡Necesitas ${cantTela} metros de ${tipoTelaGlobal} y ${cantReata} metros de reata!`,
            text: `
                Tener en cuenta:
                - Cortar ${tirasBolsas} tiras de ${altoPieza} cm para las bolsas.
                - Por cada tira salen ${undPorTira} bolsas de ${anchoPieza}cm.
                - Cortar ${cantidad*2} manijas en reata de ${altoManija}cm.
            `,
            icon: "success",
        })
    }

}

//FUNCIÓN PARA AJUSTABLE SENCILLA

function calcularAjustableSencilla(anchoTela,cantidad,anchoBolsa,altoBolsa,fuelleBolsa){
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
    if(tipoTelaGlobal=="Drill" || tipoTelaGlobal=="Lienzo"){
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
    cantTela = parseFloat(cantTela);

    agregarACompras(new Compra (tipoTelaGlobal,cantTela));
    agregarACompras(new Compra ("Cordón o hiladillo",cantCordon));
    swal({
        title: `¡Necesitas ${cantTela} metros de ${tipoTelaGlobal} y ${cantCordon} metros de cordón!`,
        text: `
            Tener en cuenta:
            - Cortar ${tirasBolsas} tiras de ${altoPieza}cm para las bolsas.
            - Por cada tira salen ${undPorTira} bolsas de ${anchoPieza}cm.
            - Cortar ${cantidad*2} cordones de ${cordonPorBolsa/2}cm.
        `,
        icon: "success",
    })
}


let mostrarComprasBTN = document.getElementById("mostrarCompras");

function agregarACompras(nuevaCompra){

    let existe = false

    for (let compra of compras){
        if(nuevaCompra.insumo == compra.insumo){
            compra.cantidad = compra.cantidad + nuevaCompra.cantidad;
            existe = true
        }
    }

    if(existe == false){
        compras.push(nuevaCompra)
    }

    localStorage.setItem("compras", JSON.stringify(compras))
    console.log(compras)

    Toastify({
        text: `La compra de ${nuevaCompra.cantidad} metros de ${nuevaCompra.insumo} ha sido agregada a la lista`,
        duration: 5000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black"
          }
  }).showToast()
}

mostrarComprasBTN.onclick = ()=>{
    mostrarCompras(compras);
}

function mostrarCompras (array){
    comprasTabla.innerHTML = ""
    array.forEach((compra)=>{
        comprasTabla.innerHTML += `
        <tr>
            <th scope="col">${compra.insumo}</th>
            <th scope="col">${compra.cantidad} m</th>
        </tr>                                                                                                                                                                                                                                                                                                                                                                  
        `
    })
}

let buscarComprasValor = document.getElementById("buscarCompras");
let buscarComprasBTN = document.getElementById("btnBuscarCompras");

buscarComprasBTN.onclick =  ()=>{
    buscarCompras(buscarComprasValor.value, compras)
}

function buscarCompras (input, array){
    let resultadoBusqueda = array.filter(
        (comp) => comp.insumo.toLowerCase().includes(input.toLowerCase()) )
    console.log(resultadoBusqueda)
    mostrarCompras(resultadoBusqueda)
}