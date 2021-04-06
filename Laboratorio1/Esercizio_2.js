'use strict';

/** 0) IMPORTO dayjs e Sqlite */
const dayjs = require('dayjs');
const sqlite = require('sqlite3');


var localizedFormat = require('dayjs/plugin/localizedFormat');  
dayjs.extend(localizedFormat);
// L'esercizio chiede di stampare le date in un formato particolare  -> Consultando la documentazione
//https://day.js.org/docs/en/display/format -> necessito plugin, e leggo che il formato richiesto è 'LLL'


/***************************** */
/**    1) COSTRUTTORE DI TASK, esattamente uguale a Esrcizio1.js  */

function Task(id, description, urgent=false, prite=true, deadline = ''){ 
   
    this.id =id;
    this.description=description;
    this.urgent=urgent;
    this.prite=prite;
    this.deadline = deadline && dayjs(deadline);

     //   n.b. non posso fare direttamente this.deadline=dayjs(deadline), poichè se non passo la data ( facoltativa), dayjs del carattere '' di default salva Invalid data
     //   non è quello che voglio -> salvo deadline come ''
    


     /**  TO STRING -> formatto output oggetto task come richiesto da esercizio (N.B. funzione sulla data) */
     this.toString = () => 
     {
         return (`Id: ${this.id}, Decription: ${this.description}, Urgent: ${this.urgent}, Private: ${this.prite}, Deadline: ${this._formatDeadline('LLL')} `); //STAMPARE LLL
     }  
 
 
     /**  FUNZIONE DATA -> testo mi dice che formato deve avere la data e cosa scrivere se non viene indicata (opzionale) */
     this._formatDeadline = (format) => {  
         
        return this.deadline ? this.deadline.format(format) : '<not defined>';
        //se ho una deadline (!= ''), allora la stampo nel formato LLL, altrimenti -> testo mi dice di stampare <not defined>
       }

};



/***************************************************** */


function TaskList() {

//apro db
const db = new sqlite.Database('tasks.db', (err) => { if (err) throw err; });


/** 2) CARICO ESAMI DA DB, e stampo */

this.getAll = () => {

    return new Promise((resolve, reject) => { //ritorno una Promise, poichè asincrono

        const sql = 'SELECT * FROM tasks' ;   //seleziono tutti i task presenti

        db.all(sql, [], (err, rows) => { //Db all, ho bisogno di tutte le righe che legge dal DB(no necessito parametri)
        
            if(err)
              reject(err);  //se ho errore
    
            else {
              const tasks = rows.map((row) => new Task(row.id, row.description,((row.urgent) ? true : false), row.private == 1, row.deadline));
                //se non ho errore, ho bisogno dei task ma.. -> ho bisogno dei Task costruiti SECONDO L'OGGETTO task
                //pochè i nomi dei paramentri ad esempio sono diversi! 
                //per ogni riga di rows (quello ritornato da db.all), indicata da "row"  -> rimappo per costruire un nuovo oggetto task
                //N.B. Devo gestire il fatto che NEL DB TRUE /FALSE vengono salvati come 0 e 1 -> rimappo in uno dei due modi 
              
                resolve(tasks);  //tutto ok, risolvo promise ok
            }

          }); //chiudo promise

        }); //chiudo getAll

};

/*********************************************************** */

/** 2) AFTER DATE
 *      Stampo solo i task che hanno una dwadline superiore a una  che passo come parametro
 */

 this.afterDate = (date) => {

    return new Promise((resolve, reject) => { //ritorno promise

        //seleziono da db solo esami con data maggiore di quella passata (WHERE) data db > data gli passo
      const sql = 'SELECT * FROM tasks  WHERE deadline > DATE(?)' ;

      db.all(sql, [date.format()], (err, rows) => {   //devo usare .format poichè passo un oggetto dayjs
        if(err)
          reject(err);
        else {  //creo nuovi oggetti esame come prima 
            const tasks = rows.map((row) => new Task(row.id, row.description,((row.urgent) ? true : false), row.private == 1, row.deadline));
            resolve(tasks);
        }
      });            
    });
  };


  /**************************************** */
/** 3) TASK CON DETERMINATA PAROLA  */

  this.cercoWord = (parola) => {

    return new Promise((resolve, reject) => { //ritorno promise

        const sql = "SELECT * FROM tasks WHERE description LIKE ?";  //description deve contenere la parola passata come paramentro

        db.all(sql, ["%" + parola + "%"], (err, rows) => { //cerco la parola 
          if(err)
            reject(err);
          else {
            const tasks = rows.map(record => new Task(record.id, record.description, record.urgent == 1, record.private == 1, record.deadline));
            resolve(tasks);
          }

        

    }); //dbAll

    });//promise
};


};


/** TEST  */

const main = async () => {       //ricevo promise, await dentro async
const TkList = new TaskList();

const carico = await TkList.getAll();


console.log("************* TUTTI I TASK *************");
carico.forEach( (task) => console.log(task.toString()) );

const dead = dayjs('2021-03-14');

console.log("************* TUTTI I TASK AFTER DATA "+ dead.format('LL') +"  *************");
const esami_dopo_data = await TkList.afterDate(dead);
esami_dopo_data.forEach( (task) => console.log(task.toString()) );

const word = "lab";
console.log("************* TUTTI I TASK CONTENENTI  "+ word +"  *************");
const filtrati= await TkList.cercoWord(word)
filtrati.forEach( (task) => console.log(task.toString()) );

};

main();
