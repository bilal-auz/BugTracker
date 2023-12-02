import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
