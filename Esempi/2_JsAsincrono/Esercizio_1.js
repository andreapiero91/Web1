"use strict";

/**  1) COSTRUTTORE DI ESAME */

function Exam (code, name, credits, score) {
    this.code = code;
    this.courseName = name;
    this.credits = credits;
    this.score = score;
  };


/** 2) COSTRUISCO LISTA ESAMI */

const exams = [];

const aw1 = new Exam('01xx', 'Web Applications I', 6, 27);
const softeng = new Exam('02xx', 'Software Engineering', 6, 30);
const dsp = new Exam('03abc', 'Distributed Systems Programming', 10, 20);

exams.push(aw1);
exams.push(softeng);
exams.push(dsp);

//console.log(exams);

/**  3) MODIFICO ARRAY, ogni elemento exam.score lo converto all'americana */ 

// V1 DA SLIDE ?
const modifico = (score) => {
    if(score >= 27) return 'A';
    else if (score >= 24) return 'B';
    else if (score >= 19) return 'C';
    else return 'D';
  }



// const american_voti = exams.map((esame) => modifico(esame));

// ???????

//const american_voti = exams.map( ( {score, ...e} ) => ( {...e, score: modifico(score) }  ) );
                    //map( (parametri dentro{}... why? ) => ({funzione --> applico }) )

const american_voti = exams.map(function(esame)  //creo lista di esami con voti all'americana
{
  let new_esame ={...esame};  //creo nuovo esame, copio esame

  if (esame.score >= 27) new_esame.score = "A";
  else if (esame.score >= 24) new_esame.score= 'B';
   else if (esame.score >= 19) new_esame.score= "C";
   else new_esame.score="D";

   return new_esame;



}

);

//console.log(american_voti);

/**  4) CALCOLO MEDIA */

const Elenco_voti = american_voti.map((voti) => (voti.score)     ); //estraggo solo i voti americani: INPUT VOTI, in elenco voti ho voti.score 

const rimappato = Elenco_voti.map((function(val){      // passo ogni elemento dell'array, alla funzione 
    if(val == 'A') return 4;                            //
    if(val == 'B') return 3;
    if(val == 'c') return 2;
    else return 1;

}));

   //calcolo media con funzione reduce ->  funzione(accumulatore, valore che scandisco e calcolo),valore iniziale
let media= rimappato.reduce( ((accumulator,currentvalue) => accumulator+currentvalue ) ,0 )/rimappato.length;

/** VERSIONE ALTERNATIVA
 * // convert scores to 1-4, to compute GPA
 * 
const usScores = usExams.map(e => e.score);  /// prendo solo i voti rispetto a tutto l'esame


// this can be done in a similar way to remap()

const four = usScores.filter(score => score === 'A').map(score => 4); //filtro solo gli esami con score A, e dico score diventa 4
const three = usScores.filter(score => score === 'B').map(score => 3); //filtro solo gli esami con score B, e dico score diventa 3
const two = usScores.filter(score => score === 'C').map(score => 2);
const one = usScores.filter(score => score === 'D').map(score => 1);

// compute GPA

const gpa = [...four, ...three, ...two, ...one].reduce((sum, score) => sum + score, 0)/usScores.length;
 * 
 * 
 * 
 * 
 */


/** 5) STAMPO  */


console.log ("Elenco esami all'italiana: ");
console.log(exams);

console.log("Elenco esami all'americana: ");
console.log(american_voti);

console.log(`MEDIA: ${media}`);

