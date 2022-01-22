// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {ipcRenderer}=require("electron")
window.addEventListener('DOMContentLoaded', () => {

    document.getElementById("sonido").volume=require("../db/data.json").volumen/100;

    document.getElementById("Ajustes").onclick=()=>{
        ipcRenderer.send("ajustes","entrar");


    }
    document.getElementById("Salir").onclick=()=>{
        ipcRenderer.send("exit")
    }


    ipcRenderer.on("volumen",(event,arguments)=>{
        document.getElementById("sonido").volume=arguments/100;
        console.log("SE SUPONE QUE CAMBIO DE VOLUMEN")

    });




})




