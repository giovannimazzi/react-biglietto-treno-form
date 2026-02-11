import { useState } from "react";

// prezzo unitario biglietto [€/km]
const unitPrice = 0.21;

// distanza minima [km]
const minDistance = 5;

export default function App() {
  const [passenger, setPassenger] = useState("");
  const [distance, setDistance] = useState(5);
  const [age, setAge] = useState("Maggiorenne");
  const [showTicket, setShowTicket] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [ticketList, setTicketList] = useState([]);

  const handlePassengerChanges = (e) => {
    setPassenger(e.target.value);
  };

  const handleDistanceChanges = (e) => {
    setDistance(Number(e.target.value));
  };

  const handleAgeChanges = (e) => {
    setAge(e.target.value);
  };

  const handleAbortClick = () => {
    setPassenger("");
    setDistance(5);
    setAge("Maggiorenne");
    setShowTicket(false);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();

    // acquisisco valori dagli input
    const name_ = capitalize(passenger);
    const distance_ = Math.ceil(
      // il biglietto sarà arrotondato per eccesso alla tratta intera più vicina.
      Math.max(
        minDistance, // per default c'è una distanza minima a cui si forzano valori in input eventualmente inferiori ad essa.
        Math.abs(Number(distance)), // inoltre si assume che un eventuale valore negativo sia convertito nel suo opposto.
      ),
    );
    const age_ = age;

    // validazione input nome
    if (!name_) {
      console.error(`Nome mancante!`);
      setShowTicket(false);
      return; // se nome non è inserito non si prosegue
    }

    // validazione input distanza
    if (isNaN(distance_)) {
      console.error(`Distanza mancante!`);
      setShowTicket(false);
      return; // se distanza non è inserita non si prosegue
    }

    // selezione sconto da applicare [%]
    const discount_ = age_ === "Minorenne" ? 20 : age_ === "Over 65" ? 40 : 0;

    // calcolo prezzo biglietto [€]
    const price_ = distance_ * unitPrice * (1 - discount_ / 100);

    // pubblico risultato su console
    console.log(`%c---Biglietto---`, "color: yellowgreen");
    console.log(`Nome: ${name_}`);
    console.log(`Distanza: ${distance_.toFixed(0)} km`);
    console.log(`Età: ${age_}`);
    console.log(`Sconto: ${discount_}%`);
    console.log(`Prezzo biglietto: € ${price_.toFixed(2)}`);

    // pubblico risultato su pagina
    setPassenger(name_);
    setDistance(distance_);
    setAge(age_);
    setDiscount(discount_);
    setPrice(price_);
    setShowTicket(true);

    const newTicket = {
      id:
        ticketList.reduce(
          (maxId, ticket) => (ticket.id > maxId ? ticket.id : maxId),
          0,
        ) + 1,
      passenger: name_,
      age: age_,
      distance: distance_,
      price: price_,
    };

    setTicketList([newTicket, ...ticketList]);
  };

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

  return (
    <div className="d-flex justify-content-between vh-100">
      <div
        id="sidebar"
        className="container w-25 my-5 py-5 text-center rounded-5"
      >
        <h2 className="h5 text-success">BIGLIETTI CONFERMATI</h2>
        <hr />
        <div className="content h-100">
          {ticketList.map(({ id, passenger, age, distance, price }) => {
            return (
              <div className="card border-2 mb-4">
                <div className="card-header border-2 fw-bold">{`TICKET - #${id}`}</div>
                <div className="card-body">
                  <div className="card-title h6">{passenger}</div>
                  <div className="card-text d-flex flex-column align-items-center gap-1">
                    <span>{age}</span>
                    <span>{`${distance.toFixed(0)} km`}</span>
                    <span>{`€ ${price.toFixed(2)}`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container py-1 px-5 text-center">
        <section id="ticket-gen">
          <div className="p-2 mt-5 rounded-5">
            <h1 className="h2 text-success">
              CALCOLA IL PREZZO DEL TUO BIGLIETTO
            </h1>
            <form id="input-form" onSubmit={handleTicketSubmit}>
              <div className="row g-3 align-items-start py-3">
                <div className="col-12 col-sm-4">
                  <div className="card">
                    <label htmlFor="input-name" className="bg-dark text-white">
                      NOME COGNOME
                    </label>
                    <input
                      className="text-center"
                      type="text"
                      id="input-name"
                      value={passenger}
                      required
                      onChange={handlePassengerChanges}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-4">
                  <div className="card">
                    <label
                      htmlFor="input-distance"
                      className="bg-dark text-white"
                    >
                      TRATTA [km]
                    </label>
                    <input
                      className="text-center"
                      type="number"
                      id="input-distance"
                      min="5"
                      step="5"
                      value={distance}
                      required
                      onChange={handleDistanceChanges}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-4">
                  <div className="card">
                    <label htmlFor="input-age" className="bg-dark text-white">
                      CLASSE
                    </label>
                    <select
                      className="text-center"
                      name="age"
                      id="input-age"
                      value={age}
                      onChange={handleAgeChanges}
                    >
                      <option value="Minorenne">Minorenne</option>
                      <option value="Maggiorenne">Maggiorenne</option>
                      <option value="Over 65">Over 65</option>
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <button id="btn-confirm" className="btn btn-success">
                    CONFERMA
                  </button>
                </div>
              </div>
            </form>
            <button
              id="btn-abort"
              className="btn btn-danger"
              onClick={handleAbortClick}
            >
              ANNULLA
            </button>
          </div>
        </section>

        <section
          id="output-section"
          className={`py-5 mx-auto ${showTicket ? "" : "d-none"}`}
        >
          <h2>IL TUO BIGLIETTO</h2>
          <div className="card">
            <div className="card-header fw-bold text-center bg-dark text-white">
              <big>PASSEGGERO</big> <br />
              <span id="output-name">{passenger}</span>
            </div>
            <div className="card-body">
              <div className="container w-75">
                <div className="row row-cols-1 g-4">
                  <div className="col d-flex justify-content-between align-items-center">
                    <span className="fw-bold">CLASSE</span>
                    <span id="output-age">{age}</span>
                  </div>
                  <div className="col d-flex justify-content-between align-items-center">
                    <span className="fw-bold">SCONTO</span>
                    <span>
                      <span id="output-discount">{discount}</span>%
                    </span>
                  </div>
                  <div className="col d-flex justify-content-between align-items-center">
                    <span className="fw-bold">TRATTA</span>
                    <span>
                      <span id="output-distance">
                        {distance ? distance.toFixed(0) : ""}
                      </span>{" "}
                      km
                    </span>
                  </div>
                  <div className="col d-flex justify-content-between align-items-center">
                    <span className="fw-bold">PREZZO</span>
                    <span>
                      €{" "}
                      <span id="output-price">
                        {price ? price.toFixed(2) : ""}
                      </span>
                    </span>
                  </div>
                  <div className="col d-flex justify-content-center align-items-center">
                    <img
                      src={"src/assets/img/qr.png"}
                      alt="qr"
                      className="w-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
