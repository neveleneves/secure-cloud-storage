import React from "react";
import { BrowserRouter} from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";

import { useRoutes } from "./routes";
import { useConfirmPass } from "./hooks/authConfirmPass.hook";
import { AuthContext } from "./context/authContext";

function App() {
  const {token, isAuth, userID, confirmUserPass} = useConfirmPass()
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={{token, userID, isAuth, confirmUserPass}}>
      <BrowserRouter>
        <Navbar 
        isAuth={isAuth}
        />
        <main className="main">
          <div className="App">{routes}</div>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
