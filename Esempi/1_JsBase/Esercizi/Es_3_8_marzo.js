

//VERSIONE SEMPLIFICATA, SOLO ADD, FIND

'use strict';

const dayjs = require("dayjs");  //importo dayjs

/**   1-2) FUNZIONE COSTRUTTORE ESAME    */

function Exam(code, name, credits, date, score, laude = false) {      //attributi
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.date = date;
  this.score = score;
  this.laude = laude;
}


const aw1 = new Exam("01abc", "AW1", 6, dayjs('2021-07-01'), 30,true );  //creo nuovi esami
const sf1 = new Exam("01ccc", "SF",10,dayjs('2021-06-15'), 28);


console.log(aw1.date.toString());  //stampo data

/*** 3) FUNCTION COSTRUTTORE EXAM LIST */

function ExamList() {
   
  this.list = []; //vettore  di esami 
 
 
  /** 4) ADD */

  this.add = (exam) => {
    this.list.push(exam);  //inserisco esame in coda (passo esame construito)
  };

   /** 5) FIND -> ESAME CON MATCH CODICE DEL CORSO */
  
  this.find = (codice) => {

    //ciclo su array -> of -> per ogni corso 
    for (const corso of this.list)
    {
      if(corso.code === codice)
        return corso;
    }
    return undefined; //non ho trovato codice corrisponde
  };


  

}



const exams = new ExamList();

exams.add(aw1);
exams.add(sf1);

//console.log(exams);


console.log(exams.find("01abc"));
console.log(exams.find("01ccd"));

