

window.addEventListener('DOMContentLoaded', () => {

    document.getElementById("sonido").volume = window.api.require("../db/data.json").volumen / 100;

    document.getElementById("Ajustes").onclick = () => {
        window.api.send("ajustes", "entrar");


    }
    document.getElementById("Salir").onclick = () => {
        window.api.send("exit")
    }
    document.getElementById("Jugar").onclick = () => {

        document.querySelectorAll("*").forEach(e=>e.classList.add("fade"))

        setTimeout(()=>{
            window.api.send("stages", "intro")
        },3000)

    }


    window.api.receive("volumen", ( arguments) => {
        console.log("llega")
        console.log(arguments)
        document.getElementById("sonido").volume = arguments / 100;

    });
    populateMotas()
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

function populateMotas(){
    let container=document.querySelector(".motasContainer");

     function createMota(){

         let newMota=document.createElement("div");


         newMota.classList.add("motaPolvo")
         newMota.style.top=getRandomFromTo(0,100)+"vh"
         newMota.style.left=getRandomFromTo(0,100)+"vw";
         let size=getRandomFromTo(0.2,2)
         newMota.style.width=size+"vw";
         newMota.style.zIndex=10-size+"";
         let tiempo=getRandomFromTo(0.7,7);
         newMota.style.animationDuration=tiempo+"s";
         container.append(newMota);
         setTimeout(()=>{
             container.removeChild(newMota);
         }, tiempo*1000)


    }

    let one=setInterval(createMota,1000)

    let two=setInterval(createMota,1210)
    let three=setInterval(createMota,600)




}

function getRandomFromTo(from, to){
    return Math.random() * (to - from)  + from;
}