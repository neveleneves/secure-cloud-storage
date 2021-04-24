import React from "react";
import { BrowserRouter} from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";

import { useRoutes } from "./routes";
import { useConfirmStatus } from "./hooks/authConfirmStatus.hook";
import { AuthContext } from "./context/authContext";

function App() {
  const {
    token, 
    isAuth, 
    userID, 
    loadingProcess, 
    confirmUserPass, 
    confirmUserLogout
  } = useConfirmStatus()

  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider 
    value={{token, userID, isAuth, confirmUserPass, confirmUserLogout}}>
      {
        !loadingProcess ? 
        <BrowserRouter>
          <Navbar/>
          <main className="main">
            <div className="App">{routes}</div>
          </main>
        </BrowserRouter>
        : 
        <div/>
        //Loading spinner ? 
      }
    </AuthContext.Provider>
  );
}

export default App;
