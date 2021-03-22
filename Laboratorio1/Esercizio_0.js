"use strict";

const s2 = "Prova";
const s1 = "aa";
const s3 = "Ciao Mamma";
const s4 = "spring";

/**  1) VETTORE DI STRINGHE */

const v = [s1,s2,s3,s4];

modifica(v);

//console.log(v);

function modifica(vettore)
{
    let index =0;

    for(let stringa of vettore) /** 1) PER OGNI ELEMENTO DEL VETTORE  */
    {
        
        if(stringa.length > 2)  //se la stringa è più lunga di due
        {
            vettore[index] = stringa.substr(0,2) +  stringa.substr(stringa.length-2,2); //sostituisco con primi 2 e ultimi 2 caratteri
           
        //console.log(stringa);
       
    
        }
        else vettore[index] = "";

        index++;



    }


}

// ALTERNATIVES
/*
for(const [i, w] of words.entries()) {
    if(w.length < 2)
        words[i] = "";
    else 
        words[i] =  w.substring(0,2) +  w.substring(w.length -2,  w.length);
}*/
/*
words.forEach((item,index) => {
    if(item.length < 2)
        words[index] = "";
    else 
        words[index] = item.substring(0,2) + item.substring(item.length -2, item.length);
});
*/
