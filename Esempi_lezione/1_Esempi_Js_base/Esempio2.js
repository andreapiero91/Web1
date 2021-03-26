"use strict"

let a =6;
const b=6;
const c ='6';

// 1) OPERAZIONI DI CONFRONTO

if(a==b){

    console.log("Ho confrontato due numeri con l' ==, sono entrambi pari a 6 ");
}

if(a==c){  //entra nel ciclo poichè == esegue una conversione automatica, cerca di metterli dell ostesso tipo

    console.log("Ho confrontato il numero 6 con la stringa sei: avendo usato l'operatore == , la stringa è stata prima convertita ");
}

if(a === c){  //=== non fa la conversione
     console.log("Non stampero' mai poichè === non fa conversione")
}


//2) CICLO FOR

for(let i=0;i<5;i++)
{
    console.log(i)
}
