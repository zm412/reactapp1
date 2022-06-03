//import logo from "./logo.svg";
import "./App.css";
import lib from "./stores/data_store.js";
import Card from "./components/card.js";
import LibraryView from "./components/libraryView.js";
import InfoBlock from "./components/infoBlock.js";
import { useState, useEffect } from "react";
import { action } from "mobx";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const [detales, setDetales] = useState("");
  const getDetales = (obj) => setDetales(obj);
  let tree = lib.tree,
    data = lib.data;

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="main_block row">
            <div id="list_block" className="col sub1 list_b">
              <LibraryView getDetalesFunc={getDetales} detales={detales} />
            </div>
            <div className="col sub1">
              <InfoBlock info={detales} />
            </div>

            {detales && (
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-secondary m-3">Refresh</button>
                <button
                  onClick={(e) => lib.removeNode(detales.id)}
                  className="btn btn-secondary m-3"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
});

export default App;
