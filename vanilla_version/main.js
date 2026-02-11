// prezzo unitario biglietto [€/km]
const unitPrice = 0.21;

// età di default
const defaultAge = "Maggiorenne";

// distanza minima [km]
const minDistance = 5;

// selezione elementi html
const inputForm = document.getElementById("input-form");
const inputName = document.getElementById("input-name");
const inputDistance = document.getElementById("input-distance");
const inputAge = document.getElementById("input-age");
const btnConfirm = document.getElementById("btn-confirm");
const btnAbort = document.getElementById("btn-abort");
const outputSection = document.getElementById("output-section");
const outputName = document.getElementById("output-name");
const outputAge = document.getElementById("output-age");
const outputDiscount = document.getElementById("output-discount");
const outputDistance = document.getElementById("output-distance");
const outputPrice = document.getElementById("output-price");

inputName.addEventListener("change", () => {
  outputSection.classList.add("d-none");
});
inputDistance.addEventListener("change", () => {
  outputSection.classList.add("d-none");
});
inputAge.addEventListener("change", () => {
  outputSection.classList.add("d-none");
});

btnAbort.addEventListener("click", () => {
  // Ripristina i valori di default definiti nell'HTML
  inputName.value = inputName.defaultValue;
  inputDistance.value = inputDistance.defaultValue;
  inputAge.value = defaultAge;
  outputSection.classList.add("d-none");
});

inputForm.addEventListener("submit", (e) => {
  // prevengo invio form
  e.preventDefault();

  // acquisisco valori dagli input
  const name = capitalize(inputName.value);
  const distance = Math.ceil(
    // il biglietto sarà arrotondato per eccesso alla tratta intera più vicina.
    Math.max(
      minDistance, // per default c'è una distanza minima a cui si forzano valori in input eventualmente inferiori ad essa.
      Math.abs(parseFloat(inputDistance.value)), // inoltre si assume che un eventuale valore negativo sia convertito nel suo opposto.
    ),
  );
  const age = inputAge.value;

  // validazione input nome
  if (!name) {
    console.error(`Nome mancante!`);
    outputSection.classList.add("d-none");
    return; // se nome non è inserito non si prosegue
  }

  // validazione input distanza
  if (isNaN(distance)) {
    console.error(`Distanza mancante!`);
    outputSection.classList.add("d-none");
    return; // se distanza non è inserita non si prosegue
  }

  // selezione sconto da applicare [%]
  const discount = age === "Minorenne" ? 20 : age === "Over 65" ? 40 : 0;

  // calcolo prezzo biglietto [€]
  const price = distance * unitPrice * (1 - discount / 100);

  // pubblico risultato su console
  console.log(`%c---Biglietto---`, "color: yellowgreen");
  console.log(`Nome: ${name}`);
  console.log(`Distanza: ${distance.toFixed(0)} km`);
  console.log(`Età: ${age}`);
  console.log(`Sconto: ${discount}%`);
  console.log(`Prezzo biglietto: € ${price.toFixed(2)}`);

  // pubblico risultato su pagina
  outputName.innerText = name;
  outputAge.innerText = age;
  outputDiscount.innerText = discount;
  outputDistance.innerText = distance.toFixed(0);
  outputPrice.innerText = price.toFixed(2);
  outputSection.classList.remove("d-none");
});

/**
 * This function receives a string as a name and returns the capitalized version:
 * first char of each word in uppercase and the rest in lowercase.
 * @param {string} name The string to capitalize
 * @returns {string} The capitalized string
 */
const capitalize = (name) => {
  if (!name) return "";
  if (name.includes(" ")) {
    return name
      .split(" ")
      .map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase())
      .join(" ");
  } else {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
};
