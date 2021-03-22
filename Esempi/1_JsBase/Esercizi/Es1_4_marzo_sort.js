/******     ESERCIZIO 1 4 MARZO 2021 ****/

/**Litral --> qualunque valore fisso scrivo letteralmente nel codice es. let a =5 oppure let b= "ciao" -->b e ciao sono literal, cose fisse scrivo nel codice 
/** -->inizilizzare tipi primitivi
 */
 "use scrict"

 /*** 1) DEFINISCO VETTORI CON I VOTI */

 const score = [25, 30,18,27,20,27,26];

 const better_score = [...score]; //prende elementi del vettore score e scompatta in better_score --> un modo per fare una copia

 /** 2) ELIMINO I MINIMI DOPO ORDINAZIONE*/

 better_score.sort((a,b)=> (a-b));  //arrow function -> ordino maniera crescente l'array ( così i minimi saranno in testa)

 better_score.shift();   //tolgo l'elemento in testa, che sarà il minimo
 better_score.shift();   //ripeto


 console.log(better_score);
