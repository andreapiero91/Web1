'use strict';

const sqlite = require('sqlite3');

/** 1) APRO DB data.sqlite */
const db = new sqlite.Database('data.sqlite',
    (err) => { if (err) throw err; });


    /** 2) INSERISCO VALORE "1" DENTRO DB -> POI CONTO QUANTI VALORI HO INSERITO  */
for(let i=0; i<5; i++) {            //  Per 5 volte a) inserisce nella colonna number il valore 1
                                    //  b)E poi conta quanti numeri ci sono nel DB


    //INSERT valore 1 nella tabella numbers, colonna number
    db.run('insert into numbers(number) values(1)', (err) => { if (err) throw err; 
    console.log("Aggiungo");                
    });

    //COUNT numeri righe in colonna number della tabella numbers
    db.all('select count(*) as tot from numbers', [], 
    (err, rows) => {
        if(err) throw err;
        console.log(rows[0].tot);
    }) ;
}
db.close();

//NON STAMPA IN ORDINE -> NON E' DETTO STAMPI 1,2,3,4,5... potrebbe fare 1,1,1,2,3 poichè
//Le due query-callback sono indipendenti e asincrone -> ognuna si esegue indipendentemente.
//Non è detto che db.all arrivi sempre dopo db.run e cosi via
//Se facessi il ragionamento di prima, (transcript.js), spostando tutto nella callbacl-query iniziale
// Dovrei spostare db.all dentro callback run, ma poi il run dopo dovrebbe avvenire solo dopo l'all
//Quindi dentro la callback all dovrei inserire la nuova query run... tutto in cascata,un bordello