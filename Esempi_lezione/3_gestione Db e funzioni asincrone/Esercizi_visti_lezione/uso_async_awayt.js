'use strict';

/** 1) dichiaro uso sqlite3, APRO il DB*/
const sqlite = require('sqlite3');
const db = new sqlite.Database('data.sqlite',
    (err) => { if (err) throw err; });

/** 2) FUNZIONE ASINCRONA INSERISCE UN VALORE DENTRO number */

async function insertOne() {      //async -> funzione ritorna promise

    return new Promise( (resolve, reject) => {          //promise

        db.run('insert into numbers(number) values(1)', (err) => {  //inserisco 1 nella colonna 
            if (err) reject(err);    //errore di inserimento
            else resolve('Done');    //inserimento ok
        });

    }) ;

}
    /** 3) FUNZIONE ASINCRONA STAMPA */

async function printCount() {

    return new Promise( (resolve, reject) => {

        db.all('select count(*) as tot from numbers',
            (err, rows) => {
                if(err)
                     reject(err);
                else {
                    console.log(rows[0].tot);
                    resolve(rows[0].tot);       //in rows[0] ho il primo valore ritornato dalla select -> in questo caso la somma
                }
            }) ;            
        }) ;
}

/**   4) ASPETTO RITORNO FUNZIONI PRECEDENTI CON AWAIT */

async function main() {             //await deve essere dentro async
    for(let i=0; i<100; i++) {
        await insertOne();
        await printCount();         //potrei controllare valori ritornati ed eventuali errori (try...catch)
    }
    db.close();
}

main();