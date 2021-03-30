'use strict';

/** 0) IMPORTO dayjs e Sqlite */
const dayjs = require('dayjs');
const sqlite = require('sqlite3');

/** 1) dichiaro funzione costruttore di ESAME, come in Es_3_8_marzo */
function Exam(code, name, credits, date, score, laude=false) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.score = score;
  this.laude = laude;
  this.date = dayjs(date);

 
    this.toString = () => (`\n${this.code} - ${this.name} = ${this.score} (${this.date}) `);    //formatto bene

};

 /** 2) FUNZIONE COSTRUTTORE EXAMLIST */
function ExamList() {

    //apro db
  const db = new sqlite.Database('exams.sqlite', (err) => { if (err) throw err; });


  /** 3) funzione ADD -> riceve in input un oggetto di tipo esame -> aggiorna la tabella SCORE con le info sul superamento dell'esame */
            // Inserisco quindi i voti dei vari esami, aggiornando la tabella score!

  this.add = (exam) => {

    return new Promise((resolve, reject) => { //ritorno una Promise, poichè asincrono
        
      const sql = 'INSERT INTO score(coursecode, score, laude, datepassed) VALUES (?, ?, ?, DATE(?))';  //interrogazione sql
        //ultimo paramentro converte data in formato ok per il Db; ? sono i parametri che passo alla query

        // Eseguo sql di INSERIMENTO, con modifica del formato della data: non mi serve avere anche l'ora!
        //db.run, poichè non mi interessa la query ritorni qualcosa
      db.run(sql, [exam.code, exam.score, exam.laude, exam.date.format('YYYY-MM-DD')], function(err) { //parametri da inserire in "?"
        if (err)

          reject(err); //se ho un errore, rimando a chiamante (vedi come intercetta sotto)

        else {
          resolve(this.lastID); //Se tutto funziona, mando ultima riga dove ho inserito

        }    
      }); //chiudo db.run // N.B. Dentro ARROW FUNCTION, ridefinisco THIS -> this dentro la arrow function, valore suo->tornerebbe undefined e non riga corretta inserimento -> devo usare function

    });   //chiudo promise

  };


  /**************************************** */

  /** 4) funzione GETALL() -> restituisce una lista di esami presenti del Db    */  

  this.getAll = () => {

    return new Promise((resolve, reject) => { //ritorna promise

     //seleziona esami con voto, faccio join sul codice del corso -> se non ho superato l'esame, ovvero non ho il voto in score -> non lo stampa
      const sql = 'SELECT * FROM course JOIN score ON course.code=score.coursecode' ; 

      db.all(sql, [], (err, rows) => { //Db all, ho bisogno di tutte le righe che legge dal DB(no necessito parametri)
        
        if(err)
          reject(err);  //se ho errore

        else {
          const exams = rows.map((row) => new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, ((row.laude) ? true : false)));
            //se non ho errore, ho bisogno degli esami ma.. -> ho bisogno degli esami costruiti SECONDO L'OGGETTO Exam
            //pochè i nomi dei paramentri ad esempio sono diversi! (credit, cfu)
            //per ogni riga di rows (quello ritornato da db.all), indicata da "row"  -> rimappo per costruire un nuovo oggetto esame
          
            resolve(exams);  //tutto ok, risolvo promise ok
        }
      });   //chiudo db.all         
    });     //chiudo promise
  };

   /*********************************************** */


  /** 5) metodo FIND -> passo il codice di un esame, e mi ritorna quell'esame nel formato del costruttore di Exam */
  
  this.find = (code) => {

    return new Promise((resolve, reject) => {

        //selezione esame e voto (JOIN), dove (WHERE ) il codice del corso è quello passato come parametro
        const sql = 'SELECT * FROM course JOIN score ON course.code=score.coursecode WHERE score.coursecode=?';

        db.get(sql, [code], (err, row) => { //Db get, basta la prima riga-> cerco codice corso che è chiave primaria(parametro query -> codice corso)
        
            if(err)
              reject(err);  //se ho errore
              else {
                  //creo oggetto esame, vedi ragionamento fatto in db.all
                resolve(new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, ((row.laude) ? true : false)));
                                                                                           //n.b. in DB la lode è indicata come 0/1
            }

    }); //chiudo db.get

}); //chiudo promise

  };
   
/*********************************************** */    

/** 6) AFTER DATE
 *      Stampo solo gli esami che sono stati svolti dopo una certa data che passo come parametro
 */

  this.afterDate = (date) => {

    return new Promise((resolve, reject) => { //ritorno promise

        //seleziono da db solo esami con data maggiore di quella passata (WHERE) data db > data gli passo
      const sql = 'SELECT * FROM course JOIN score ON course.code=score.coursecode WHERE score.datepassed > DATE(?)' ;

      db.all(sql, [date], (err, rows) => {
        if(err)
          reject(err);
        else {  //creo nuovi oggetti esame come prima 
          const exams = rows.map(row => new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, ((row.laude) ? true : false)));
          resolve(exams);
        }
      });            
    });
  };

  /* ALTERNATIVA, prelevo tutti gli esami e poi filtro sulla data ->dichiaro  afterDate come async, poichè aspetto con la await -> getAll è asincrona
  this.afterDate = async (date) => {
    const exams = await this.getAll();
    return exams.filter(course => course.date.isAfter(date)); //seleziono su isAfter
  }; */

  /****************************************************** */


  /** 7) metodo GETWORST -> ritorno lista di esami, escludendo i (num) esami peggiori */

  this.getWorst = async (num) => {         //async, poichè uso await per aspettare chiamata getAll che è asincrona
    
    try { //poichè uso await, gestisco errore
    const exams = await this.getAll();     //prelevo tutti gli esami presenti nel Db
     
       return exams.sort((a,b) => a.score - b.score).splice(0, num); //ordino esami in crescente, poi con splice elimino i primi due elementi
     }
      catch { console.log("Errore lettura esami nel db"); 
       }
    
};

};

/* TESTING */

//funzione principale del main 
const main = async () => {

  const examList = new ExamList();   //Lista di esami 
  /*
  // A) Nuovi esami da inserire

  const wa1 = new Exam('01TXYOV', 'Web Applications I', 6, '2021-06-01', 30, true);
  const sec = new Exam('01TYMOV', 'Information systems security', 6, '2021-06-10', 22);
  const ds = new Exam('01SQJOV', 'Data Science and Database Technology', 8, '2021-07-02', 28);

  const myNewExams = [wa1, sec, ds]; //lista di esami 

  //inserisco i 3 esami 
  for(const exam of myNewExams) { //inserisco gli esami ad uno ad uno 

     //usando AWAIT, infatti add è asincrona e usa promise  -> devo usare TRY-CATCH per gestire eventuale fallimento inserimento 
   try {
      const result = await examList.add(exam);
      console.log(`'${exam.name}' inserted!`)
    } catch (err) {
      console.error(err);
    }
  } 
  */

  /*
  // B) RITORNO TUTTI GLI ESAMI CON VOTO PRESENTI NEL DB
  const exams = await examList.getAll();
  console.log(`${exams}`);
 
  */

  /*   // C) stampo tutti gli esami dopo una certa data

  const esami_dopo_data = await examList.afterDate('2021-06-04');
  console.log(`${esami_dopo_data}`);
  */


  /*  //D) Cerco l'esame con il codice indicato
  
  const esame_da_voto= await examList.find("01TXYOV");

  console.log(esame_da_voto.toString());

  */


    
  /*    //  E) Stampo i due esami con il voto peggiore 

  const worstExams = await examList.getWorst(2);
  console.log('Worst 2 exams: ' + worstExams);
  */

}

main();  //invoco funzione di test