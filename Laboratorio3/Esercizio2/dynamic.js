'use strict';
/****
 *  1) Costruttore di task, ricopiato da Laboratorio1/Esercizio1
 *  2) Ho modificato la funzione che formatta la data, per seguire le specifiche (esempio Grafico del Lab2): devo gestire anche stampa di Today, Tommorow e Yesterday
 *  3) Costruttore di TaskList, ricopiato da Laboratorio1/Esercizio1 con i seguenti metodi modificati
 *      - Init: che permette di caricare tutti i tasks nella lista, uno per uno (tasks indicati dentro il metodo)
 *      - Add: carico i tasks, con controllo sull'ID -> i tasks sono presi da TASKS.js
 *      - Metodi getAll,getImportant e getPrivate: ritornano tutti i tasks, solo quelli importanti e solo quelli privati         
 *      - metodi GetToday e Get7days: solo i Task con deadline oggi, e quelli con deadline nei prossimi 7 giorni
 * 4)MANOPOLAZIONE DEL DOM, in maniera veloce: creazione del codice HTML e ${valori}
 * 5)CREAZIONE DELLA TABELLA: inserire riga per riga, con metodo insertAdjacentHTML
 * 6) METODO SVUOTA TABELLA: TaskTable.innerHTML = ''; , ovvero dentro la tabella inserisco HTML vuoto, cancellando cosa cera prima
 * 7) FUNZIONE GESTISCE TABELLA: modifico testo h1, crea righe, modifica stile aside
 * 8) GESTIONE BOTTONI: sull'aside, con event-handler
 * 
 */


/**    1) COSTRUTTORE DI TASK */

function Task(id, description, urgent=false, prite=true, deadline = ''){ /** urgent e private DEFAULT, DEADLINE: OPTIONAL ->indico che di default è una stringa vuota, se non passo la data */

   
    this.id =id;
    this.description=description;
    this.urgent=urgent;
    this.prite=prite;
    this.deadline = deadline && dayjs(deadline);

    /** FUNZIONE DATA -> testo (Laboratorio2) mi dice che formato deve avere la data e cosa scrivere se non viene indicata (opzionale) */
    this._formatDeadline = () => {
        const now = dayjs();            //oggi

        if(!this.deadline) return '*****';                  //se task senza data, stampo ****
        else if(this.deadline.isSame(now,'day')) {          //se la deadline è oggi, stampo Today
            return this.deadline.format('[Today at] HH:mm');
        } else if(this.deadline.isSame(now.subtract(1,'day'),'day')) {  //se la deadline è ieri (oggi-1) stampo Yesterday
            return this.deadline.format('[Yesterday at] HH:mm');
        } else if(this.deadline.isSame(now.add(1,'day'),'day')) {       //se la deadline è domani (oggi +1), stampo Tomorrow
            return this.deadline.format('[Tomorrow at] HH:mm');
        } else {
            return this.deadline.format('dddd DD MMMM YYYY [at] HH:mm'); //altrimenti formatto come da Esempio Laboratorio 2
        }
    }
};


/** 2) COSTRUTTORE DELL'ELENCO DEI TASK -> TasList */

function TaskList() {   //Elenco degli esami

    this.list = [];

    /** 2.1) init: faccio push di ogni Task, uno per uno: indicati dentro metodo  */
    /**add: dopo un controllo se l'id è univoco, carico esame uno dopo altro presi da tasks.js */
    this.init = () => {                
      this.list.push(           //push -> inserisco in vettore
      new Task(1, "Complete Lab 3", false, true, "2021-03-29T14:30:00" ),
       new Task(2, "Buy some groceries", false, false, "2021-04-11T14:00:00"),
       new Task(3, "Read a good book!", true, true),
       new Task(4, "Watch Mr. Robot", false, true, "2021-04-12T21:30:00"),
       new Task(5,"Treno MI-TO",true,false,dayjs('2021-04-16') ),
       new Task(6,"La Boum",false,true),
       new Task(7,"Hotel Centrale",true,true,dayjs("2017-03-13")),

      );
    };

    this.add = (task) => {
        if (!this.list.some(t => t.id == task.id))
            this.list = [...this.list, task];
        else throw new Error('Duplicate id');
    };

    /** 2.2) restituisco TUTTI i TASK, nel vettore list*/
    this.getAll = () => {
        return this.list;
      };

    /** 2.3) ritorno solo quelli i Task che sono URGENTI */
    this.getImportant =() =>
    {
        return this.list.filter(task => task.urgent);
    }

    /** 2.4) ritorno solo i Task che sono PRIVATI */
    this.getPrivate =() =>
    {
        return this.list.filter(task => task.prite);
    }

    /** Ritorno solo i task che hanno una deadline (N.B. da specifiche, possono non avere data) */
    this.condata =() =>{                    

        return this.list.filter(task => task.deadline);

    }

    /** 2.5) getToday: solo i Task con deadline oggi*/
    this.getToday = function ()  {

        const now = dayjs();

        return this.condata().filter(t => t.deadline.isSame(now,'day'));

    }

    /** 2.6) get7Days: solo i Task con una deadline tra oggi e i prossimi 7 giorni */
    this.getSeven = function ()  {

        const now = dayjs();

        return this.condata()
            .filter(t => t.deadline.isAfter(now.subtract(1,'day'),'day')) //tutti i task con deadline da oggi in poi
            .filter(t => t.deadline.isBefore(now.add(8,'day'),'day'));    //tutti i task con deadline entro 7 giorni da oggi
        
    }

};
/****************************************************************** */
/************************* 4) MANIPOLO DOM ************************/



/**** METODO VELOCE */

//Prima inserisco il checkbox
//Poi la descrizione, dicendo che se è urgente la coloro di rosso (attribuisco class importante)
//Poi dico che se è privato mostro l'icona 
//Infine formatto la data 

function createTaskRowV(t1) {
  return `<tr>  
          <th class="" scope="row"><div class="form-check">  <!--nella prima cella metto una casella di check-->
           <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"> </div></th>

           <td ${t1.urgent ? ' class="importante"' : ''}>${t1.description}</td>

                <td>${t1.prite ? `<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>` : ''}</td>

                <td>${t1._formatDeadline()}</td> <!-- deadline-->
           </tr>`;


};


/*************************************************************************** */
/********************** 3)CREO Tabella ***************************************/

function fillTaskTable(allTask)
{
    /*******************3.1) TABELLA dove devo appendere Task */
    const TaskTable= document.getElementById('task-table'); //radice tabella

    for(const Task of allTask)
    {
        /** 4.1) CREO RIGA TABELLA -> vedi in Esercizio1 i metodi possibili*/
            const examEl = createTaskRowV(Task); // Creo riga con metodi manipolazione dom
            TaskTable.insertAdjacentHTML('afterbegin', examEl); 

    }

};

/*************************************************************** */
/********** 6) FUNZIONE CHE SVUOTA LA TABELLA  **************/

function initTable() {

    const TaskTable = document.getElementById('task-table'); //recupero tabella da svuotare, attarverso il suo id
    
    TaskTable.innerHTML = ''; //svuoto la tabella, e poi inserisco nulla('')

  }

/*************************************************************** */
/******** 7) FUNZIONE GESTISCE TABELLA **************/
//riceve il nuovo testo di h1 (va modificato a ogni click), l'elenco dei Task da inserire in tabella, e quale bottone nell'aside deve essere evidenziato
function g_tab(testoh1,elenco_task,color_class)
{
    // a) modifico testo in <h1>
    const titoloh1= document.getElementById('titolo_tabella'); //id elemento h1
    titoloh1.innerText = testoh1; 

    // b) Cancello contenuto Tabella
    initTable();

    // c) Inserisco nuove righe in tabella
    fillTaskTable(elenco_task);
    
    // d) Modifico stile elenco a sinistra (aside)
    //seleziono tutti gli elementi a, dentro al div, dentro all'elemento con id= left-sidebar -> per ognuno degli elementi a, gli rimuovo la classe active, che era quella che lo rendeva in evidenza
    //n.b. solo uno dei bottoni aveva la classe active, ma non posso sapere quale, così provo a toglierla a tutti
    document.querySelectorAll('#left-sidebar div a ').forEach( node => node.classList.remove('active'));
    document.getElementById(color_class).classList.add('active');
    //Aggiugno la classe active, solo al bottone che ho appena cliccato: corrisponde a quello sto vedendo in tabella

}



/********************************* MAIN  **************************/

const Tlist = new TaskList;  /* creo oggetto Taskist */

//Tlist.init();                  /** inizializzo la lista dei Task (TaskList) */

 DATI.forEach(t => { Tlist.add(new Task(...t)); });  /** Inizializzo Tasklist dai Task presenti in tasks.js */

const allTask= Tlist.getAll();



fillTaskTable(allTask); /** Creo prima vista della pagina, quando la carico la prima volta: vedo tutti i task */


/************************************************************************************************* */
/******************** 8) GESTISCO BOTTONE *********************/

//all'elemento con id = tutto (bottone sull'aside), attribuisco un evento se faccio click sopra
// EventListener (click) -> indico dentro cosa faccio

document.querySelector('#tutto').addEventListener('click', (event) => {
    fillTaskTable(allTask); //creo tabella deiTask, tutti i task
    g_tab("All",allTask,'tutto');
});

document.querySelector('#importante').addEventListener('click', (event) => {
    const urgenti = Tlist.getImportant();   //task importanti
    g_tab("Important",urgenti,'importante');
});

document.querySelector('#oggi').addEventListener('click', (event) => {
    const task_oggi= Tlist.getToday();  //task con deadline pari a oggi
    
    g_tab("Today",task_oggi,'oggi');
});

document.querySelector('#settegiorni').addEventListener('click', (event) => {
    const _7d = Tlist.getSeven();               //task con deadline compresa tra oggi e i prossimi 7 giorni
    g_tab("Next 7 Days",_7d,'settegiorni');
});


document.querySelector('#privato').addEventListener('click', (event) => {
    const privato = Tlist.getPrivate();          //task privati
    g_tab("Private",privato,'privato');
});