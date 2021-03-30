"use strict"

/** 1) DICHIARO VOGLIO USARE SQLITE3 */

const sqlite = require('sqlite3');


/** 2) APRO DB */

const db = new sqlite.Database('exams.sqlite',  //dichiaro apro db "exams.sqlite"
 (err) => {if (err) throw err;});               //se errore apertura, ritorno errore


 /**3) CHIUDO DB */

 db.close();