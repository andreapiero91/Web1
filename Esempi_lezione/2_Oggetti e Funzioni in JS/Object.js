"strict mode"

// CREAZIONE OGGETTO

let persona = {
    nome: "Luigi",
    cognome: "De Russis",
    eta: 37,


};

//STAMPO IN ENTRAMBI I MODI POSSO ACCEDERE A UN OGGETTO

console.log(persona.nome);
console.log(persona["nome"]);

//AGGIUNGO ATTRIBUTO

persona["professione"] = "docente";

console.log(persona); 

// RIMUOVO ATTRIBUTO
delete persona.professione;

console.log(persona);
console.log("........");

//ITERO SOPRA TUTTE PROPRIETA'

for (const chiave in persona)
{
    console.log(`${chiave} è ${persona[chiave]}`);
}

for(let [c,v]of Object.entries(persona)) //entries restituisce un array, quindi uso of 
{
    console.log(c + ' è ' + v);
} 



/** COPIA */
 
let persona2 = Object.assign({},persona); //creo nuovo oggetto persona2 a cui passo proprietà di persona

console.log("........");

console.log(persona2);