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
let actual;
let charcontador;
let nodopointer;



function playtext(){
    nodopointer=chatbox
    actual=texto[contador]
    writing=true;
    nodopointer.innerHTML=""
   charcontador=0;
    if(!actual.character)
        return
    let character=actual.character


    $("#speaker").html(actual.speaker||character)
    let root=$(":root")
    const actualSpeaker=characters[character]
    if(actualSpeaker.colors.primary)
        root.css("--primary-color",actualSpeaker.colors.primary)
    if(actualSpeaker.colors.secondary)
        root.css("--secondary-color",actualSpeaker.colors.secondary)
    if(actualSpeaker.colors.back)
        root.css("--back-color",actualSpeaker.colors.back)
    if(actualSpeaker.defaultspeed){
        /*let mult=actualSpeaker.defaultspeed>5?2:0.5
        speed=30*(actualSpeaker.defaultspeed%5*mult)*/
        speed=actualSpeaker.defaultspeed*6;

    }


     interval=changeInterval(undefined,speed,playEachChar)



}

function playEachChar(){
    if(charcontador===actual.text.length){
        clearInterval(interval)
        writing=false;
        return
    }
    if(actual.text.charAt(charcontador)==="<"){
        let tag="<";
        let segundo=actual.text.charAt(charcontador+1)
        while(actual.text.charAt(charcontador++)!==">")
            tag+=actual.text.charAt(charcontador)
        console.log("tag:"+tag)
        if(segundo==="/") {
            nodopointer = nodopointer.parentNode;
        }else{
            switch (tag){
                case "<SLOWER>": interval=changeInterval(interval,speed*2, playEachChar)
                    break;
                case "<FASTER>": interval=changeInterval(interval,speed*0.5, playEachChar)
                    break;
                default:
                    let elem=htmlToElement(tag);
                    nodopointer=nodopointer.appendChild(elem);
            }




        }
        return;
    }




    nodopointer.innerHTML+=actual.text.charAt(charcontador++);
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

function changeInterval(interval,time, handler){

    if(interval!==undefined)
        clearInterval(interval)
    return setInterval(handler,time)

}