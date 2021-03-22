// POSSIBILE SOLUZIONE: https://github.com/polito-WA1-AW1-2021/lab1-node/blob/master/l01-e01.js


'use strict';

/** 0) DICHIARO DI QUALI MODULI HO BISOGNO */

const dayjs = require("dayjs"); //utilizzo dayjs

var localizedFormat = require('dayjs/plugin/localizedFormat');  
dayjs.extend(localizedFormat);
// L'esercizio chiede di stampare le date in un formato particolare  -> Consultando la documentazione
//https://day.js.org/docs/en/display/format -> necessito plugin, e leggo che il formato richiesto è 'LLL'


/**    1) COSTRUTTORE DI TASK */

function Task(id, description, urgent=false, prite=true, deadline){ //deadline facoltativo


    this.manipolo_data =(deadline) => {  
        if(deadline){  //Se ho una deadline, quindi deadline != Undefined
            
            return dayjs(deadline);}//converto in deadline, se no resta undefined
        
    };

    this.id =id;
    this.description=description;
    this.urgent=urgent;
    this.prite=prite;
    this.deadline = this.manipolo_data(deadline);
     //   n.b. non posso fare direttamente this.deadline=dayjs(deadline), poichè se non passo la data, essendo essa 
     //facoltativa posso non passarla, dayjs(undefined) per come è programmata dayjs, mi crea la data di oggi
     //Non è quello che voglio! 


    /** TO STRING -> formatto output oggetto come richiesto da esercizio (N.B. funzione sulla data) */
    this.toString = () => 
    {
        return (`Id: ${this.id}, Decription: ${this.description}, Urgent: ${this.urgent}, Private: ${this.prite}, Deadline: ${this._formatDeadline('LLL')} `); //STAMPARE LLL
    }  


    /** 3) FUNZIONE DATA -> testo mi dice che formato deve avere la data e cosa scrivere se non viene indicata */
    this._formatDeadline = (format) => {  
        
       return this.deadline ? this.deadline.format(format) : '<not defined>';
       //se ho una deadline (!= UNDEFINED), allora la stampo nel formato LLL, altrimenti -> testo mi dice di stampare <not defined>
      }

};


/** 2) COSTRUTTORE DELL'ELENCO DEGLI ESAMI */

function TaskList() {   //Elenco degli esami

    this.list = [];

    /**7) ADD */

    this.add = (task) => {                          //aggiungo esami
        if(!this.list.some(t => t.id == task.id))   /**  4) testo dice che devono avere ID UNIVOCO gli esami */
      this.list.push(task);
    else throw new Error('Duplicate id');           //se duplicato ID esami -> lancio errore
      };

     
      /** 5) FILTER AND PRINT -> elimino quelli che non sono urgenti  */
    this.filterAndPrint = () => {
      const filtrato=   this.list.filter(task => task.urgent);  //Filtro solo gli elementi che sono urgenti, escludo quelli not urgent

      console.log("****** Tasks filtered,onlY (urgent ==true): ******"); // Stampo in formato richiesto dal testo
      for ( let variabile of filtrato)
      {
          console.log(variabile.toString());
      }

      /** ALTERNATIVA
       * 
       * this.filterByUrgent = () => {
    return this.list
      .filter( (task) => task.urgent );
  }
       * 
       * 
       * 
       *  function filterAndPrint(taskList){
  console.log("****** Tasks filtered, only (urgent == true): ******");
  // use filter function
  taskList.filterByUrgent()
  .forEach( (task) => console.log(task.toString()) );
}
 */

    };


    /** 6) SORT AND PRINT -> ordino per data crescente -> N.B. se task è senza date in fondo */

    this.sortAndPrint = () => {
        
        let condead = [...this.list.filter( ((task) => task.deadline )).sort((a,b) => (a.deadline.isAfter(b.deadline) ? 1 : -1))];  //solo elementi con una task.deadline != undefined
                                                                        //sort per data crescente
                                                                         

        let senzadead = this.list.filter( ((task) => !task.deadline )); //metto in coda al vettore che stampo gli elementi senza deadline

        condead.push(senzadead);

        console.log("****** Tasks sorted by deadline(most recent first): ******"); // Stampo in formato richiesto dal testo
        for ( let variabile of condead)
      {
          console.log(variabile.toString());
      };

    

};
};

const t1 = new Task(1,"Treno MI-TO",true,false,dayjs('2019-01-25') );
const t2 = new Task(2,"La Boum",false,true);
const t3 = new Task(3,"Hotel Centrale",true,true,dayjs("2017-03-13"));

const t4 = new Task(3,"Treno Mi-Ve",false,false); //errore, duplicate id

const t = new TaskList();

t.add(t1);
//console.log(t1.toString());

t.add(t2);
//console.log(t2.toString());

t.add(t3);
//console.log(t3.toString());

//errore, duplicate id
//t.add(t4);
//console.log(t4.toString());

t.sortAndPrint();

t.filterAndPrint();




