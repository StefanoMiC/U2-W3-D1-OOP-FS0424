// JavaScript ha la particolarità di permetterci di creare oggetti con la cosiddetta NOTAZIONE LETTERALE,
// ovvero l'uso di seplici {} come valore di una variabile,

const obj = {}; // abbiamo creato un riferimento in memoria per un elemento di tipo oggetto

// o altro contenitore (proprietà di oggetto, parametri ecc...)

// E' possibile assegnare valori tra i tipi primitivi: string, number, boolean, undefined, null, Symbol, bitInt...
// uno di questi valori è richiamabile tramite "dot notation" . oppure la "square brackets notation" []

// I valori primitivi si creano semplicemente in memoria
// TUTTO QUELLO CHE NON E' UNA PRIMITIVA (object, array, function) si associa in memoria tramite una "REFERENCE" (riferimento o indirizzo in memoria)

// per questo bisognerà stare attenti nel momento in cui proveremo a clonare un valore NON PRIMITIVO in un altro contenitore

// abbiamo appena modificato un oggetto che è partito come vuoto e ha ricevuto una nuova coppia chiave/valore,
// semplicemente dichiarando una proprietà inesistente a cui abbiamo ASSEGNATO (=) un valore!
obj.newProp = "new";
console.log(obj); // questa operazione genera una nuova coppia chiave/valore all'interno dell'oggetto

const dog = {
  breed: "Labrador",
  age: 2,
  // questa funzione si definisce il "metodo" dell'oggetto, e ne specifica le abilità
  bark: function () {
    console.log("BAU");
  }
};

dog.age = 3;
console.log(dog.breed);

console.log(dog.hasOwnProperty("breed"));
// il motivo per cui possiamo utilizzare un metodo che non abbiamo creato noi esplicitamente è per via della catena prototipale che ci "regala" questo
// e altri metodi specifici per il tipo di dato

console.log(dog.toString());

// document.body.innerHTML += `Your dog is a ${dog.breed}`;
// document.body.innerHTML += dog; // [object Object] // dovremmo utilizzare le proprietà dell'oggetto e
// non passare l'oggetto intero che verrà poi convertito in automatico con il metodo .toString() associato al prototipo degli oggetti

console.log(dog.__proto__); // Object
console.log(dog.__proto__.__proto__); // null

const num = 5;
console.log(num.__proto__); // Number
console.log(num.__proto__.__proto__); // Object
console.log(num.__proto__.__proto__.__proto__); // null

const str = "ciao";
console.log(str.__proto__); // String
console.log(str.__proto__.__proto__); // Object
console.log(str.__proto__.__proto__); // null

const arr = [];
console.log(arr.__proto__); // Array
console.log(arr.__proto__.__proto__); // Object
console.log(arr.__proto__.__proto__.__proto__); // null

const funct = function () {};

console.dir(funct.__proto__); // Function
console.dir(funct.__proto__.__proto__); // Object
console.dir(funct.__proto__.__proto__.__proto__); // null

// const h1 = document.querySelector("h1");
// console.dir(h1);

const str1 = "fur";
const str2 = "type";
const str3 = "fur-type";

const cat = {
  name: "felix",
  "fur-type": "long and very fluffy",
  "date.of.adoption": "01/01/2024",
  ancestors: { mom: "Dasy", dad: "Dartagnan" }
};

// delete cat["date.of.adoption"] // abbiamo cancellato il riferimento della proprietà date.of.adoption

// in questo caso siamo obbligati ad usare la square brackets notation! queste ci permettono di passare una stringa da valutare come intero nome della proprietà
console.log(cat["fur-type"]);
console.log(cat["date.of.adoption"]);

// la square brackets notation, ci permette inoltre di VALUTARE un dato, anche attraverso l'interpretazione di un'espressione, o di una variabile semplice
console.log(cat[str1 + "-" + str2]); // cat["fur-type"]
console.log(cat[str1.concat("-").concat(str2)]);
console.log(cat[str3]);

const catKeys = Object.keys(cat);
console.log(catKeys);

console.log(cat[catKeys[1]]); // cat["fur-type"]

const catEntries = Object.entries(cat);
console.log(catEntries);
console.log(catEntries[1][0]);

const letters = ["a", "b", "c", "d", "e", "f"];

// questo mi permette di associare ad una qualche posizione una variabile da poter utilizzare singolarmente da questo momento in poi
const [, second, , , fifth] = letters;
console.log(second);
console.log(fifth);

// seguendo lo stesso approccio, andremo a ciclare l'array catEntries e i sotto array in modo più semanticamente sintetico
// for (let i = 0; i < letters.length; i++) {
//     const letter = letters[i];
//     console.log(letter);
// }

for (const letter of letters) {
  console.log(letter);
}

for (const entry of catEntries) {
  // destrutturazione interna
  const [property, value] = entry;

  console.log(entry);
  console.log(property);
  console.log(value);
}

// destrutturazione sul posto
for (const [property, value] of catEntries) {
  //   console.log(property);
  //   console.log(value);

  console.log(`${property}: ${value}`);
}

const newCat = {};

// questo sistema ci potrebbe aiutare a creare dei cloni di un oggetto
for (const [property, value] of catEntries) {
  newCat[property] = value;
}

// a questo punto abbiamo creato una VERA copia del primo oggetto "cat"

newCat.name = "Garfield";
console.log(newCat);

// COSE DA NON FARE MAI:
const cat2 = cat; // MAIIIIIII clonare così!!
// cat2.name = "ciccio";
// modificare cat2 ora produce una modifica allo stesso oggetto che è cat
console.log(cat);
console.log(cat === cat2); // true --> è lo stesso oggetto ma con due nomi diversi
console.log(cat === newCat); // false --> è un nuovo oggetto che si è popolato degli stessi dati, modificare newCat non modifica l'originale

// problema che si pone solamente quando abbiamo a che fare con le REFERENCE
// con le primitive questo non succede, si copiano semplicemente...

let a = 5;
const b = 10;
const c = a; // 5
a = 20;

console.log(c); // 5
// le primitive si copiano direttamente, ma le referenze no!

// esistono 3 metodi per CLONARE un oggetto
// 1) Object.assign(nuovo oggetto, oggetti da clonare, ... , ...)
// l'unica accortezza è ricordarsi che questo metodo è in grado di clonare riferimenti di primo livello o primitivi (shallow copy)

const cat3 = Object.assign({}, cat, { name: "Streghy" });
// cat3.name = "Stregatto"
// anche in questo caso ci siamo slegati dall'originale, modificare cat3 non ha intaccato cat1

// se vado a modificare una SOTTO-REFERENZA, rimane il problema che entrambe le proprietà punterebbero ancora allo STESSO OGGETTO
cat3.ancestors = Object.assign({}, cat.ancestors);
cat3.ancestors.mom = "Lara";
console.log(cat3);
console.log(cat);

// 2) SPREAD OPERATOR
// const cat4 = { ...cat }; // questa operazione crea un clone superficiale, anche qui, di primo livello (shallow copy)
const cat4 = { ...cat, ancestors: { ...cat.ancestors } }; // questa operazione va a creare anche una copia per la referenza di secondo livello
cat4.name = "Pino";
cat4.ancestors.dad = "Silvestro";
console.log(cat4);
console.log(cat);

// 3) STRUCTURED CLONE (deep clone)
const cat5 = structuredClone(cat);
cat5.name = "Tom";
cat5.ancestors.mom = "Clarabella";
console.log(cat5);
console.log(cat);
