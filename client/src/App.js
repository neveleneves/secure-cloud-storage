import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { useRoutes } from "./routes";

function App() {
  const routes = useRoutes();

  return (
    <BrowserRouter>
      <Navbar />
      <main className="main">
        <div className="App">{routes}</div>
      </main>
    </BrowserRouter>
  );
}

export default App;
