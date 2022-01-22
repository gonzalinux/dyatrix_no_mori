const {ipcRenderer}=require("electron")
let resoluciones=[[1280,720],[1920,1080],[2560,1440]]
let resActual;
let tipoVentana=["Ventana ", "Pantalla Completa"]
let tipoActual;
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("myRange").value=require("../db/data.json").volumen;
    ipcRenderer.send("resolucion","pregunta");

    ipcRenderer.on("resolucion",((event, args) => {

        document.getElementById("res").innerHTML=`${args[0]} x ${args[1]}`;
        tipoActual=Number(args[2])
        document.getElementById("modo").innerHTML=tipoVentana[tipoActual];
        resActual=resoluciones.findIndex((element)=>element[0]===args[0]&&element[1]===args[1]);

    }))
    document.getElementById("myRange").onchange=()=>{
        ipcRenderer.send("volumen",document.getElementById("myRange").value)
    }
    document.getElementById("Salir").onclick=()=>{
        ipcRenderer.send("resolucion",resoluciones[resActual].concat([tipoActual]))
        ipcRenderer.send("ajustes","salir");


    }

    document.getElementById("flechaIz").onclick=()=>{

        resActual=resActual===0?resoluciones.length-1:resActual-1;
        document.getElementById("res").innerHTML=`${resoluciones[resActual][0]} x ${resoluciones[resActual][1]}`



    }
    document.getElementById("flechaDe").onclick=()=>{

        resActual=resActual===resoluciones.length-1?0:resActual+1;
        document.getElementById("res").innerHTML=`${resoluciones[resActual][0]} x ${resoluciones[resActual][1]}`
    }

    document.getElementById("flechaDeVen").onclick=()=>{
        tipoActual=tipoActual===tipoVentana.length-1?0:tipoActual+1;
        document.getElementById("modo").innerHTML=tipoVentana[tipoActual];

    }
    document.getElementById("flechaIzVen").onclick=()=>{
        tipoActual=tipoActual===0?tipoVentana.length-1:tipoActual-1;
        document.getElementById("modo").innerHTML=tipoVentana[tipoActual];

    }

})