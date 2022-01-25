let speed=30;
let chatbox=document.getElementById("chat-text");
const texto=window.api.require("../db/chatprimero.json")
$(() => {
    document.getElementById("sonido").volume = window.api.require("../db/data.json").volumen / 100;


    window.api.receive("volumen", ( arguments) => {

        document.getElementById("sonido").volume = arguments / 100;
    });
    playtext();
    chatbox.onclick=()=>{
        skiptext();
    }



})
let interval;
let contador=0;
const characters=window.api.require("../db/characters.json")
let writing=false;
let pilaelementos=[];





function playtext(){
    let nodopointer=chatbox
    let actual=texto[contador]
    writing=true;
    nodopointer.innerHTML=""
    let charcontador=0;
    if(actual.speaker){
        $("#speaker").html(actual.speaker)
        let root=$(":root")
        root.css("--primary-color",characters[actual.speaker].colors.primary)
        root.css("--secondary-color",characters[actual.speaker].colors.secondary)
    }
     interval=setInterval(()=>{

         if(charcontador===actual.text.length){
             clearInterval(interval)
             writing=false;
             return
         }
         if(actual.text.charAt(charcontador)==="<"){
             let tag="";
             let segundo=actual.text.charAt(++charcontador)
             while(actual.text.charAt(charcontador++)===">")
                tag+=actual.text.charAt(charcontador)
             if(segundo==="/") {
                 nodopointer = nodopointer.parentNode;

             }else{
                 let elem=htmlToElement(tag);
                 nodopointer=nodopointer.appendChild(elem);
             }



            return;


         }




         nodopointer.innerHTML+=actual.text.charAt(charcontador++);
    },speed)



}
function skiptext(){
    if(writing) {
        clearInterval(interval)
        chatbox.innerHTML = texto[contador].text;
        writing=false;
        return
    }
    else{
        contador++;
        playtext();
    }
}


function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
