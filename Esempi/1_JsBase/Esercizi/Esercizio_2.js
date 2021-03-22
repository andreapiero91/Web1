"use strict" ;

//DEFINISCO LISTA DEI CORSI 

const ElencoNomi = 'Web Applications I, Computer Architectures, Data Science and Database Technology, Computer network technologies and services, Information systems security, Software engineering, System and device programming';

// 2) CREO VETTORE CON TUTTI I CORSI, uso come carattere separatore ", "

const corsi = ElencoNomi.split(', '); //da documentazione stringhe java, metodo SPLIT -> uso , e spazio come delimitatori
                                      //salvo in corsi così tutti i corsi


  /*  const courses = ElencoNomi.split(',');  ALTERNATIVA
for (let i = 0; i < courses.length; i++)
  courses[i] = courses[i].trim();  -> TRIM ELIMINA SPAZI INIZIO E FINE STRINGA
*/

//console.log(corsi);

/**   3) CREO VETTORE DI ACRONIMI */

const acronimi = []; //nuovo vettore contenente acronimi


for(const c of corsi)  //per ogni corso nell'elenco
{

     //inserisco le parole che non sono spazi dentro un nuovo vettore (così elimino gli spazi)   
     const parole = c.split(" "); //vettore (Web,App,I)
     let newS='';                 //iniziali delle varie parole

     for(const w of parole){    

       
        let maiuscolo= w.charAt(0);         //prelevo prima lettera
        maiuscolo=maiuscolo.toUpperCase();  //rendo maiuscola
        newS += maiuscolo;                  
        
     }
     
     //console.log(newS);
     acronimi.push(newS);     //inserisco in coda a neWs
     //console.log("*****");


}

/* 
  //OPPURE
// creating acronyms

const acrinimi = [];

for(const c of corsi) {

  // each word in an array position
  const words = c.split(' ');
  let acronym = '';

  // make the first letter of each word uppercase and store it
  for(let w of words) {
    acronym += w[0].toUpperCase();  //accedo alla prima lettera di acronym
  }


  // store the acronym in the array
  acronimi.push(acronym);
}

*/

/***    4) STAMPO */

for (let i = 0; i < corsi.length; i++) {
    console.log(`${acronimi[i]} - ${corsi[i]}`);
  }