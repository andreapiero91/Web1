'use strict';

/**  DOPO AVER APERTO IL DB, FACCIO UNA LETTURA, INCROCIANDO (join) esami con i loro voti */



/**  1) DICO VOGLIO USARE SQLITE3 */
const sqlite = require('sqlite3');

/** 2) APRO DB trancript.sqlite */

const db = new sqlite.Database('transcript.sqlite',
    (err) => { if (err) throw err; }); //se errore in apertura lancia err;


 let result = [];

/** 3) INTERROGAZIONE SQL -> JOIN tra corso e risultato degli esami, sull'attributo code=coursecode, il codice del corso */
let sql = "SELECT * FROM course LEFT JOIN score ON course.code=score.coursecode" ;
//n.b. uso left join -> quindi faccio join tra course e score, ma... se non ho voto il cui codice corrisponde a un esame, comunque stampo l'esame (LEFT JOIN)
 
/** 4) DB.ALL -> voglio accedere a tutte le righe del db  N.B. query asincrona, nel frattemp il programma va avanti  */

db.all(sql, [], (err,rows)=>{ //interrogazione
    if(err) throw err;
    for (let row of rows) {
        //console.log(row);  //V1: stampo a video tutte righe-tuple (esami con il voto) -> ok
        result.push(row);  //V2: colloco ogni risultato della query (row ) dentro result, provo stampare dopo, riga 37 -> vediamo perchè non funziona (*)
    }
});

 console.log('*************');
 for (let row of result) {
    console.log(row);
}
/** 
//Non riesco a stampare nulla nella riga 33, poichè la query ha una callback ASINCRONA:
//mentre il programma aspetta che la query legga i parametri dal file (tramite db.all),
//continua a eseguire le istruzioni dopo, quindi passa subito a console.log (****) ecc.

//Quindi il programma arriva prima all'istruzione console.log(row) di quando la query riempia result, 
//result è ancora vuoto nel momento cerco di stampare

//L'unica soluzione sarebbe quella di spostare  tutto quello che riguarda il DB (anche stampa) dentro la query 
//asincrona / dentro la callback -> rischio di avere una callback estremamente lunga!!

*/