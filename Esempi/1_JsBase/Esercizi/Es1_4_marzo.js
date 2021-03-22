
/******     ESERCIZIO 1 4 MARZO 2021 ****/

/**Litral --> qualunque valore fisso scrivo letteralmente nel codice es. let a =5 oppure let b= "ciao" -->b e ciao sono literal, cose fisse scrivo nel codice 
/** -->inizilizzare tipi primitivi
 */
"use scrict"

/*** 1) DEFINISCO VETTORI CON I VOTI IN ORDINE CRONOLOGICO*/

const score = [25, 30, 18, 27, 20, 27, 26];

const better_score = [...score]; //prende elementi del vettore score e scompatta in better_score --> un modo per fare una copia
//manipolo poi il vettore better_score

/****  2) ELIMINO I DUE VOTI PIU' BASSI    ****/

let min_score = Math.min(...better_score);
//poichè math.min accetta solo una serie di numeri e non un vettore ->trasformo il vettore in una serie di numeri  con (...)

//in che posizione si trova il minimo?
let index = better_score.indexOf(min_score);

//splice -> permette di elimininare e eventualmente rimpiazzare elementi nel vettori -> lavora in place  

better_score.splice(index, 1); //elimino in posizione index, 1 elemento

//ripero per il secondo minimo
min_score = Math.min(...better_score);
index = better_score.indexOf(min_score);
better_score.splice(index, 1);

//console.log('better_score ' + better_score);


/****  3) INSERISCO MEDIA DEI VOTI (ARROTONDATA) IN CODA AL VETTORE  */

//calcolo media senza programmazione funzionale
let avg = 0;

for (let i of better_score) //scandisco vettore, sommo valori
{
    avg += i;
}


avg = avg / better_score.length; //mi da lunghezza del vettore

//console.log(avg);

//arrotondo media e aggiungo in coda

avg = Math.round(avg);  //funzione che arrotonda al valore intero la media calcolata prima

better_score.push(avg);  //push, colloca in coda a better_score le medie
better_score.push(avg);


/***** 4)  STAMPO I DUE VETTORI E LE LORO MEDIE */

console.log(`Il vettore iniziale e': ${score}`);

console.log(`Il vettore con la media aggiunta e tolti i due voti peggiori e': ${better_score}`);

console.log(`La media del primo vettore e': ${avg}`);

//calcolo seconda media
avg = 0;
for (let i of better_score) //scandisco vettore
{
    avg += i;
}


avg = avg / better_score.length; //calcolo la somma, divido per il numero degli elementi
avg = Math.round(avg);  //funzione arrotonda

console.log(`La media del  vettore dopo aver inserito in coda e': ${avg}`);

