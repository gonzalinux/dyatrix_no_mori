/*
* Clase para sacar un texto de poco en poco.
* Coge un texto con forma de string, puede estar formateado,
* el formato es el siguiente:
* -etiquetas html para dar estilo son posibles:
* <bold></bold>
* -speed-ups o speed-down de velocidad de texto:
* <FASTER><SLOWER> (son acumulables, cada uno es un 20% mas rapido o lento
* -etiquetas personalizadas: se pasan como argumento  del estilo a:
* {
* "<red>": "<span style='color:red'>"
* }
* (son priorizadas antes que las html);
*
*
*
* */



function textplayer(texto="", element,timeperletter, personalizedTags) {
    this.texto=texto;
    this.element=element;
    this.personalizedEtiquetas=personalizedTags;
    this.timeperletter=timeperletter;
    element.innerHTML="<div visible></div><div hidden></div>"
}





