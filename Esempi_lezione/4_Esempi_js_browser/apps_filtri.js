"use strict";


/** 1) dichiaro funzione costruttore di ESAME, come in Es_3_8_marzo */
function Exam(code, name, credits, date, score, laude=false) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.score = score;
  this.laude = laude;
  this.date = dayjs(date);

 

};

/** FUNZIONE COSTRUTTORE LISTA ESAMI */
function ExamList() {

    this.list =[];  //lista esami

    /** INSERISCO ESAMI DENTRO LISTA */
    this.init = () => {                 
        this.list.push(
          new Exam('02GOL', 'Architetture dei sistemi di elaborazione', 10, '2021-02-01', 28),
          new Exam('01SQM', 'Data Science e Tecnologie per le Basi di Dati', 8, '2020-06-02', 30, true),
          new Exam('02KPN', 'Tecnologie e servizi di rete', 6, '2020-02-15', 26),
        );
      };

      /** TUTTI GLI ESAMI */
      this.getAll = () => {
        return this.list;
      };

      /************** SOLO ESAMI DOPO LA DATA DEL 1/1/2021 ********/

      this.get2021 = () => {
        return this.list.filter(exam => exam.date.isAfter('2021-01-01')); //faccio filtro su esami
      }
    
    

};

/** DOM MANIPULATION (vedi Esercizio3) */


function createExamRow(exam) {
    const tr =document.createElement('tr');

    const TdDate = document.createElement('td')
    TdDate.innerText = exam.date.format('DD/MM/YYYY');
    tr.appendChild(TdDate);

    const Tdname = document.createElement('td')
    Tdname.innerText = exam.name;
    tr.appendChild(Tdname);

    const TdCredits = document.createElement('td')
    TdCredits.innerText = exam.credits;
    tr.appendChild(TdCredits);

    const tdScore = document.createElement('td');
  tdScore.innerText = exam.score + (exam.laude ? 'L' : '');
  tr.appendChild(tdScore);

  const tdButton = document.createElement('td');
  tdButton.innerHTML = `<button  class="btn btn-danger">X</button>`; //metodo veloce per il bottone, potrei fare document.createElement ecc 
  tdButton.addEventListener('click', e => {
    tr.remove();
    console.log('Removed ' + e.target.id);
  });
  tr.appendChild(tdButton);

    return tr;

};

function fillExamTable(exams) {


    const examTable= document.getElementById('exam-table'); //radice tabella

    //per ogni esame in lista, creo riga 

    for(const exam of exams)
    {
        //creo riga tabella
        const examEl = createExamRow(exam);
        //aggiungiamo riga nella pagina

      

       examTable.prepend(examEl);
   
    }
};

/********** FUNZIONE CHE SVUOTA LA TABELLA  **************/

function initTable() {

    const examTable = document.getElementById('exam-table'); //recupero tabella, con id=tabella
    
    //inserisco solo la riga tabella rimane sempre, quella con i bottoni
    examTable.innerHTML = `<tr>                              
      <td><input class="form-control" type="date"></td>
      <td><input class="form-control" type="text"></td>
      <td><input class="form-control" type="text" size="2"></td>
      <td><input class="form-control" type="text" size="3"></td>
      <td><button class="btn btn-success">+</button></td>
    </tr>`;
  }


/********************************************************************************** */

/**************** GESTIONE BOTTONI: Event Listener & Handler *********************/

//Seleziono elemento con id= filter-2021 e metodo querySelector (pagina 28)  - ESAMI DOPO IL 2021
//Aggiungo evento da gestire al click del bottone (addEventiListener pagina 43)

document.querySelector('#filter-2021').addEventListener('click', (event) => {

    const exams = examList.get2021(); //metodo che mi restituisce solo esami dopo il 2021
    
    // devo SVUOTARE TABELLA, se no avrò tutti elementi precedenti! oppure posso usare innerHtml (tabella, ""); e la svuoto
    initTable();  

    fillExamTable(exams);
  });

//Seleziono elementi con id= filter-all, ovvero tutti gli esami (vedi bottone precedente per le spiegazionij)

  document.querySelector('#filter-all').addEventListener('click', (event) => {
    const exams = examList.getAll();    //tutti esami
    initTable();
    fillExamTable(exams);
  });



/** MAIN */

const examList = new ExamList();

examList.init();

const exams= examList.getAll();
fillExamTable(exams);

//riempire tabella esami 




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