import "./App.css";
import lib from "./stores/data_store.js";
import node_sp from "./stores/small_data.js";
import LibraryView from "./components/libraryView.js";
import InfoBlock from "./components/infoBlock.js";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  let nodeInfo = node_sp.node;

  const removeItem = () => {
    lib.removeNode(nodeInfo.id);
    node_sp.clearNode();
  };

  const refreshData = () => {
    lib.refreshData();
    node_sp.clearNode();
  };

  const showData = () => {
    let freshData = JSON.parse(JSON.stringify(lib.tree));
    console.log(freshData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="main_block row">
            <div id="list_block" className="col sub1 list_b">
              <LibraryView />
            </div>
            <div className="col sub1">
              <InfoBlock />
            </div>

            {nodeInfo && (
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button onClick={refreshData} className="btn btn-secondary m-3">
                  Refresh
                </button>
                <button onClick={removeItem} className="btn btn-secondary m-3">
                  Remove
                </button>
              </div>
            )}
            <button onClick={showData} className="btn btn-secondary m-3">
              Apply
            </button>
          </div>
        </div>
      </header>
    </div>
  );
});

export default App;
