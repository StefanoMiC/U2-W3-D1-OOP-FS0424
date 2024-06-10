// gli oggetti in JS sono semplici da realizzare --> {} (notazione letterale)
// ma a patto che sia un singolo oggetto o fino a che sono pochi...
// il problema nasce quando abbiamo necessità di crearne molti in serie,
// magari tutti anonimi e indipendenti tra loro, ma con le stesse coppie chiave/valore

const methodFunc = function () {
  console.log("THIS", this);
  // con il this troviamo il riferimento dinamico all'oggetto di apparteneza nel quale il metodo è stato inserito
  console.log(this.name + " " + this.surname);
};

const person = {
  name: "Gianni",
  surname: "Morandi",

  sayMyName: methodFunc
};

const person2 = {
  name: "Claudio",
  surname: "Baglioni",
  sayMyName: methodFunc
};

person.sayMyName();
person2.sayMyName();

// Veniamo ora all'esigenza di creare oggetti in serie (tutti uguali a partire dalla stessa struttura)

// 1) Funzione costruttrice (CONSTRUCTOR FUNCTION)
// che per convenzione BISOGNA definirla in PascalCase (con tutte le prime lettere maiuscole)
// questo per comunicare l'esigenza di utilizzarla in un modo che differisce dall'utilizzo di una funzione classica,
// quindi è importante rispettare questa convenzione.

// questa funzione ha lo scopo di GENERARE UN OGGETTO
const Person = function () {
  this.name = "";
  this.surname = "";
  this.address = "";
  this.email = "";
};

const giuseppeVerdi = new Person();
giuseppeVerdi.name = "giuseppe";
giuseppeVerdi.surname = "verdi";
console.log(giuseppeVerdi);

const DynamicPerson = function (_name, _surname, _address, _email, _skills = []) {
  this.name = _name;
  this.surname = _surname;
  this.address = _address;
  this.email = _email;
  this.skills = _skills;
};

const marioSuper = new DynamicPerson("Mario", "Super", "Yoshi Island", "super@mario.com", [
  "mushroom eater",
  "fireball spitter"
]);
console.log(marioSuper);
const warioSuper = new DynamicPerson("Wario", "Super", "Wario Castle", "super@wario.com");
console.log(warioSuper);

DynamicPerson.prototype.sayHello = function () {
  console.log("hello boyz and girlz, I am " + this.name + " " + this.surname);
};

marioSuper.sayHello();
warioSuper.sayHello();
