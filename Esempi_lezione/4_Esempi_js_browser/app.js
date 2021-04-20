"use strict";

// 1) STAMPO SU console -> posso anche inserire direttamente su console browser -> B.O.M., windows.console, pagina 16
//console.log("inizio"); // stampa su console browser 

// 2) D.O.M. -> TROVO elementi, pagina 27
//console.log(document.querySelector('#exam-table'));  //seleziono ELEMENTI con ID(#) uguale a exam-table -> mi restitusice node con tutti gli elementi presenti nell'elemento table che ha id exam-table

//console.log(document.querySelectorAll('div')); //TUTTI ELEMENTI di TIPO div




/** 1) dichiaro funzione costruttore di ESAME, come in Es_3_8_marzo */

function Exam(code, name, credits, date, score, laude=false) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.score = score;
  this.laude = laude;
  this.date = dayjs(date);

 

};

/************************************************************************* */

/*** 2) COSTRUTTORE DI EXAMLIST */

function ExamList() {

    this.list =[];                      //lista esami

    /** 2.1) INSERISCO dentro lista esami, la creo fissa */
    this.init = () => {                
        this.list.push(           //push -> inserisco in vettore
          new Exam('02GOL', 'Architetture dei sistemi di elaborazione', 10, '2021-02-01', 28),
          new Exam('01SQM', 'Data Science e Tecnologie per le Basi di Dati', 8, '2020-06-02', 30, true),
          new Exam('02KPN', 'Tecnologie e servizi di rete', 6, '2020-02-15', 26),
        );
      };


      /** 2.2) restituisco TUTTI GLI ESAMI, il vettore degli esami */
      this.getAll = () => {
        return this.list;
      };
    

};


/**************************************************************************************** */
/**** 4) DOM manipulation ****/

/** 4.1) CREAZIONE ELEMENTI */

/** 4.1.1) METODO PER PIGRI: RESTITUISCO direttamente il codice HTML */

function createExamRowP(exam) {        //ritorno direttamente il codice HTML da inserire, formatto/parsing con ``
    return `<tr>
    <td>${exam.date.format('DD/MM/YYYY')}</td>
    <td>${exam.name}</td>
    <td>${exam.credits}</td>
    <td>${exam.score}${exam.laude ? 'L' : ''}</td> 
    <td><button class="btn btn-danger">X</button></td>
  </tr>`;
//gestisco lode: se ce lode metto L, altrimenti metto nulla 

}; 

/** 4.1.2) METODO PER NON PIGRI: CREO con metodi DOM MANIPULATION, da pagina 26 */

function createExamRow(exam) {

    const tr =document.createElement('tr');  // CREO ELEMENTO di tipo <tr> -> CREATING ELEMENT, pagina 33

    const TdDate = document.createElement('td')
    TdDate.innerText = exam.date.format('DD/MM/YYYY');  // INSERISCO TESTO dentro elemento, pagina 33
    
    tr.appendChild(TdDate);             //INSERISCO FIGLIO di <tr> , l'elemento <td> / TdDate -> INSERT ELEMENT -> pagina 35 

    const Tdname = document.createElement('td')
    Tdname.innerText = exam.name;
    tr.appendChild(Tdname);

    const TdCredits = document.createElement('td')
    TdCredits.innerText = exam.credits;
    tr.appendChild(TdCredits);

    const tdScore = document.createElement('td');
  tdScore.innerText = exam.score + (exam.laude ? 'L' : '');   //gestisco la lode, se ce metto L -> 30l
  tr.appendChild(tdScore);

  const tdButton = document.createElement('td');
  tdButton.innerHTML = `<button  class="btn btn-danger">X</button>`; // CREO CODICE del bottone HTML direttamente
  /** aggiungo EVENTO di CLICK al bottone (pagina 43 ) */
  tdButton.addEventListener('click', e => {        
    tr.remove();                               /** RIMUOVO ELEMENTO DOM - elimino la riga */ 
    
  });
  tr.appendChild(tdButton);

    return tr;           //ritorno riga tabella, tr

};

/************************************************************************************************************** */
/** 3) CREO TABELLA CHE SI VEDE IN HTML */

function fillExamTable(exams) {

    /** 3.1) TABELLA dove devo APPENDERE elementi */
    // Seleziono la TABELLA attraverso il suo ID -> getElementByID, metodo pagina 27

    const examTable= document.getElementById('exam-table'); //radice tabella

    /** 3.2) per OGNI ESAME in exams -> uno dei tre che avevo inserito prima -> CREO RIGA TABELLA  */

    for(const exam of exams)
    {
      /** 3.3) CREO RIGA TABELLA -> lo posso fare in due modi, vedi metodi in sezione DOM manipulation */

      /**3.3.1) METODO PER PIGRI */
      //const examEl = createExamRowP(exam); // inserisco in examEl il codice HTML da inserire

      //examTable.innerHTML=examEl; // se utilizzo metodo "innerHTML" (pagina 36-37, HANDLING TAG CONTENT), cancello tutto quello che era rimasto nella tabella 
        //cancello form e esami man mano che inserisco-> visualizzo alla fine solo ultimo esame
        
      /** 3.3.2) METODO NON PER PIGRI */
      const examEl = createExamRow(exam); // Creo riga con metodi manipolazione dom

       /** 3.4) INSERISCO ELEMENTI */
       /** 3.4.1) METODO PER PIGRI */

        //examTable.insertAdjacentHTML('afterbegin', examEl); 
        // HANDLING TAG CONTENT -> metodi per INSERIRE DIRETTAMENTE HTML (pagina 37)
        // "afterBegin", inserisco subito dopo examTable -> inserisco riga/elementi subito dopo, inserisco in cima righe tabella  

        /** 3.4.2) METODO NON PER PIGRI */

       examTable.prepend(examEl); /** INSERISCO NODO FIGLIO <tr> con sottonodi <td> -> PREPEND (pagina 35),inserisco subito dopo <table>  */
                                  //prima dei bottoni che vi erano già.

       // N.B. Inserisce esami in ordine invertito alla lista. Se volessi mantenere l'ordine, devo fare l'insert before del form (inserisco id)
   
    }
};



/** MAIN */

const examList = new ExamList();  /* creo oggetto Examlist */

examList.init();                  /** inizializzo la lista degli Esami (examList) */

const exams= examList.getAll();   /** Lista degli esami che ho caricato in examList */

fillExamTable(exams);             /** Creo (nella pagina JS - qui) tabella da visualizzare in HTML  */

//riempire tabella esami 



/********************************************************************************************************* */
/** COME E'TABELLA<!--  <tr>
                            <td>01/02/2021</td>
                            <td>Architetture dei sistemi di elaborazione</td>
                            <td>10</td>
                            <td>28</td>
                            <td><button class="btn btn-danger">X</button></td>
                        </tr>
                        <tr>
                            <td>06/02/2020</td>
                            <td>Data Science e Tecnologie per le Basi di Dati</td>
                            <td>8</td>
                            <td>30L</td>
                            <td><button class="btn btn-danger">X</button></td>
                        </tr>
                        <tr>
                            <td>15/02/2020</td>
                            <td>Tecnologie e servizi di rete</td>
                            <td>6</td>
                            <td>26</td>
                            <td><button class="btn btn-danger">X</button></td>
                        </tr>
 --> */