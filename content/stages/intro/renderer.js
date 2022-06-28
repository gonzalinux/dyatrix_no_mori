let textos=document.querySelectorAll(".textoappear");
let back=document.querySelector(".background");
textosAnim()

async function textosAnim(){
    textos[0].classList.add("mostrar");
    await waitfor(1)
    back.classList.add("aparecer");
    await waitfor(5)
    textos[0].classList.remove("mostrar")
    textos[1].classList.add("mostrar")
    await waitfor(5)
    textos[1].classList.remove("mostrar")
    textos[2].classList.add("mostrar")
    await waitfor(2)
    populateMotas()
    await  waitfor(3)
    textos[2].classList.remove("mostrar")
    textos[3].classList.add("mostrar")


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

async function waitfor(sec){
    return new Promise(resolve => setTimeout(()=>resolve(),sec*1000  ))
}