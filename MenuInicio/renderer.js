
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