'use strict';





/**    1) COSTRUTTORE DI TASK */

function Task(id, description, urgent=false, prite=true, deadline = ''){ /** 3) urgent e private DEFAULT, DEADLINE: OPTIONAL ->indico che di default è una stringa vuota, se non passo la data */

   
    this.id =id;
    this.description=description;
    this.urgent=urgent;
    this.prite=prite;
    this.deadline = deadline && dayjs(deadline);

    /** 6) FUNZIONE DATA -> testo mi dice che formato deve avere la data e cosa scrivere se non viene indicata (opzionale) */
    this._formatDeadline = (format) => {  
        
        return this.deadline ? this.deadline.format('dddd DD MMMM YYYY ') : '*****';
        //se ho una deadline (!= ''), allora la stampo nel formato LLL, altrimenti -> testo mi dice di stampare <not defined>
       }

    };


    
/** 2) COSTRUTTORE DELL'ELENCO DEI TASK -> TasList */

function TaskList() {   //Elenco degli esami

    this.list = [];

    /** 2.1) INSERISCO dentro lista Task, la creo fissa */
    this.init = () => {                
        this.list.push(           //push -> inserisco in vettore
          new Task(1,"Treno MI-TO",true,false,dayjs('2019-01-25') ),
          new Task(2,"La Boum",false,true),
         new Task(3,"Hotel Centrale",true,true,dayjs("2017-03-13")),
        );
      };



    /** 2.2) restituisco TUTTI i TASK, il vettore dei Task */
    this.getAll = () => {
        return this.list;
      };

};

/************************* 4) MANIPOLO DOM ************************/

/*********************** 4.1) METODO TRADIZIONALE ****************/

function createTaskRow(t1) {

    const tr =document.createElement('tr');  // CREO ELEMENTO di tipo <tr> -> CREATING ELEMENT, pagina 34

    const th=document.createElement('th');   //creo thper primo elemento, metodo bootstrap chiede così
    th.scope="row";

    /** DIV, dentro th (bootstrap vuole così) */

    const div1 = document.createElement('div');
    div1.className = 'form-check';
    th.appendChild(div1);                           //appendo div a th
    
    /** creo CHECKBOX*/

    const checkbox = document.createElement('input'); //creo elemento CHECKBOX, un input (vedi come dovrebbe essere)
    checkbox.type = 'checkbox';                       //tipo checkbox
    checkbox.id = "defaultCheck" + t1.id;             //id checkbox
    checkbox.className = 'form-check-input';          // GESTISCO assegnazione CLASSE
    div1.appendChild(checkbox);
    

    tr.appendChild(th);

    /** DESCRIPTION */

    const Taskname = document.createElement('td');  //creo elemento td
    Taskname.innerText = t1.description;            //testo

    if(t1.urgent == true)                           //SE è URGENTE -> coloro di rosso (classe importante)
    {
        Taskname.className= 'importante';
    }
    tr.appendChild(Taskname);                       

    /** URGENT -> se è urgente inserisco immagine per segnalarlo: come CODICE HTML */
    const UrgentTask = document.createElement('td');

    if(t1.prite == true)
        {
            /** INSERTADJACENTHTML -> posso INSERIRE HTML DOVE VOGLIO, pag.37 */
            // afterbegin -> inserisco subito dopo UrgenTask l'immaginetta
            //l'html copiato beceramente 
            UrgentTask.insertAdjacentHTML("afterbegin",`<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>`);
        };
    tr.appendChild(UrgentTask);

    /** DEADLINE */   /*************************** FORMATTA */
    const dead= document.createElement('td');
    dead.innerText= t1._formatDeadline('LLL');
    tr.appendChild(dead);

    

    
    return tr;
};

/**** METODO VELOCE */

//Prima inserisco il checkbox
//Poi la descrizione, dicendo che se è urgente la coloro di rosso (attribuisco classe importante)
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
/********************** 3)CREO Tabella ***********/
function fillTaskTable(allTask)
{
    /*allTask.forEach(element => {
        console.log(element);
    });*/

    /*******************3.1) TABELLA dove devo appendere Task */
    const TaskTable= document.getElementById('task-table'); //radice tabella
    //console.log(TaskTable);

    for(const Task of allTask)
    {

        /** 4.1) CREO RIGA TABELLA -> lo posso fare in due modi, vedi metodi in sezione DOM manipulation */
        /** 4.1.2) METODO NON PER PIGRI */

            const examEl = createTaskRowV(Task); // Creo riga con metodi manipolazione dom

           // TaskTable.prepend(examEl); /** INSERISCO NODO FIGLIO <tr> con sottonodi <td> -> PREPEND (pagina 35),inserisco subito dopo <table>  */
                                  //prima dei bottoni che vi erano già.

          TaskTable.insertAdjacentHTML('afterbegin', examEl); 

    }


};





/********************************* MAIN  **************************/

const Tlist = new TaskList;  /* creo oggetto Taskist */

Tlist.init();                  /** inizializzo la lista dei Task (TaskList) */

const allTask= Tlist.getAll();


fillTaskTable(allTask); //creo tabella deiTask


/** COME DEVE ESSERE TABELLA 
 * 
 * <tr>
                <th class="" scope="row"><div class="form-check">  <!--nella prima cella metto una casella di check-->
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"> </div></th>
                <td>Complete Lab 2</td>
                <td></td>
                <td>Monday 22 March at 14:30</td> <!-- deadline-->
              </tr>
              <tr>
                <th  scope="row"><div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"> </div></th>
                <td>Buy some groceries</td>
                <td> <!--questo è privato-->
                  <svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                </svg>
                </td>
                <td>Today at 14:00</td>
              </tr>
              <tr>
                <th  scope="row"><div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck3"> </div></th>
                <td class="importante">Read a good book</td>
                <td></td>
                <td></td>
              </tr>
 * 
 * 
 * 
 * 
 */