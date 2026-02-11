import { GiPowerButton } from "react-icons/gi";

export default function App() {
  return (
    <div className="container p-1 text-center">
      <section id="ticket-gen">
        <div className="p-2 mt-5 rounded-5">
          <h1 className="h2 text-success">
            CALCOLA IL PREZZO DEL TUO BIGLIETTO
          </h1>
          <form id="input-form">
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
                    required
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
                    value="5"
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-sm-4">
                <div className="card">
                  <label htmlFor="input-age" className="bg-dark text-white">
                    CLASSE
                  </label>
                  <select className="text-center" name="age" id="input-age">
                    <option value="Minorenne">Minorenne</option>
                    <option value="Maggiorenne" selected>
                      Maggiorenne
                    </option>
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
          <button id="btn-abort" className="btn btn-danger">
            ANNULLA
          </button>
        </div>
      </section>

      <section id="output-section" className="py-5 mx-auto d-none">
        <h2>IL TUO BIGLIETTO</h2>
        <div className="card">
          <div className="card-header fw-bold text-center bg-dark text-white">
            <big>PASSEGGERO</big> <br />
            <span id="output-name"></span>
          </div>
          <div className="card-body">
            <div className="container w-75">
              <div className="row row-cols-1 g-4">
                <div className="col d-flex justify-content-between align-items-center">
                  <span className="fw-bold">CLASSE</span>
                  <span id="output-age"></span>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <span className="fw-bold">SCONTO</span>
                  <span>
                    <span id="output-discount"></span>%
                  </span>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <span className="fw-bold">TRATTA</span>
                  <span>
                    <span id="output-distance"></span> km
                  </span>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <span className="fw-bold">PREZZO</span>
                  <span>
                    € <span id="output-price"></span>
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
  );
}
