'use strict';

const dayjs = require("dayjs");

/**        1-2) CONSTRUCTUR FUNCTION EXAM */

function Exam(code, name, credits, date, score, laude = false) {  //Esame con i suoi attributi
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.date = date;
  this.score = score;
  this.laude = laude;

  this.toString = () => (`${this.code} - ${this.name} = ${this.score} (${this.date})`); //vedi in chiamatam metodo find

}

/**           3) CONSTRUCTUR FUNCTION EXAMLIST
 */

function ExamList() {   //Elenco degli esami, nel vettore list

  this.list = [];

  /**  4) ADD -> arrow function, metto in coda al vettore (push) */

  this.add = (exam) => {
    this.list.push(exam);
  };

  /**  5) FIND -> ritorna l'esame che ha il codice che passo come parametro -> arrow function */ 

  this.find = (code) => {

          //filter ritorna un array nuovo con gli elementi che passano il test;
          //Dato l'array list, lo filtro così: per ogni corso (course) presente in list, metto come condizione (dopo =>) che il suo codice sia pari a code
          //MA....Ritorna Array di corsi con quel codice -> io devo tornare UN esame -> ritorno il primo elemento dell'array, tanto noi sappiamo ogni esame ha code univoco
        
        return this.list.filter(course => course.code== code)[0];
  };

    /** 6) AFTER DATE -> elenco esami dopo una certa data  */
    this.afterDate =(data) => {  //filtro sopra data dell'esame -> course è l'elemento presente in list, seleziono solo elementi con data maggiore a  data passata in parametro

    return this.list.filter (course => course.date.isAfter(data));
  } 

   /**   7) LIST BY DATE -> ritorna un array di esami ordinati per data crescente */

   this.listBydate = () => {


    // NB sort restituisce la lista originaria ordinata, modifica la lista -> io non voglio quello
    //poichè mi dice di restituire UNA copia della lista ordinata, non di ordinarla metto prima [...this.list], che colloca il risultato di list dentro un nuovo array
    return [...this.list].sort((a,b) => (a.date.isAfter(b.date) ? 1 : -1));  
       //Incresing score quindi metto così prchè se a è inferiore torno -1, quindi se a viene dopo ritorno 1 e viceversa
  };


  /**  8) LIST BY SCORE -> ritorno un array di esami ordinati per voto (DECRESCENTE) */

  this.listByScore = () => {


    // NB sort restituisce la lista originaria ordinata, modifica la lista -> io non voglio quello
    //poichè mi dice di restituire UNA copia della lista ordinata, non di ordinarla metto prima [...this.list], che colloca il risultato di list dentro un nuovo array

    return [...this.list].sort((a,b) => (b.score - a.score));
    //eseguo b - a poichè li voglio in ordine DECRESCENTE,  

  };
  

   /** 9) CALCOLO DELLA MEDIA */

  this.average = () => {

        // V1 prendo la lista dei corsi con tutti gli attributi -> passo a MAP e dico di creare una nuova lista contenente solo SCORE, i voti
           //a questo punto applico a catena REDUCE sopra il vettore con solo i voti 
           // paramentri:(voglio calcolare la somma elementi -> avg, elemento su cui ciclo -> score,salvato dopo map)
           //operazione da compiere avg(accumulatore + voto)
           
      //return this.list.map(voti=> voti.score).reduce((avg,somma) => avg+somma,0 )/(this.list.length);


        //V2 come prima, ma senza map -> estraggo lo score mentre faccio il reduce
      return this.list.reduce((avg, course) => avg + course.score, 0)/this.list.length;

  };





}

const aw1 = new Exam('01abc', 'Applicazioni Web I', 6, dayjs('2021-07-01'), 26, true);
const sw = new Exam('02aaa', 'Ingegneria del software', 6, dayjs('2021-06-15'), 28);


const exams = new ExamList();
exams.add(aw1);
exams.add(sw);
//console.log(exams);

//console.log(`${exams.find('01abc')}`);  //MODO PER INVOCARE IL METODO ToString

//const ordered_list=exams.listBydate();
//console.log(ordered_list.toString());

//const ordered_score=exams.listByScore();
//console.log(ordered_score);

//console.log(exams.afterDate(dayjs('2021-06-16'))); // se non usp dayjs qui, devo costruire oggetto dayjs per la data nella funzione
/*console.log(exams.find('03xxx'));
*/
//console.log(exams.average());


/*
function compare(a, b) {
  if (a è inferiore a b secondo un criterio di ordinamento) {
    return -1;
  }
  if (a è maggiore di b secondo un criterio di ordinamento) {
    return 1;
  }
  // a deve essere uguale a b
  return 0;
}






*/