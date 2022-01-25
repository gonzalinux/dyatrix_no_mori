

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("sonido").volume = window.api.require("../db/data.json").volumen / 100;

    document.getElementById("Ajustes").onclick = () => {
        window.api.send("ajustes", "entrar");


    }
    document.getElementById("Salir").onclick = () => {
        window.api.send("exit")
    }
    document.getElementById("Jugar").onclick = () => {
        window.api.send("stage", "test")
    }


    window.api.receive("volumen", ( arguments) => {
        console.log("llega")
        console.log(arguments)
        document.getElementById("sonido").volume = arguments / 100;


    });
});
let botones =document.getElementsByClassName("botonMenu");

for(let cosa of botones){

    cosa.onmouseenter=()=>{
        cosa.children.item(0).classList.remove("invisible");


    }
    cosa.onmouseleave=()=>{
        cosa.children.item(0).classList.add("invisible");
    }
    cosa.onclick=()=>{
        cosa.children.item(0).classList.add("invisible");
    }


}