import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { UserContext } from "./context";
import { Navbar } from "./components";
import { Home, Login } from "./pages";

const App = () => {
  const [user, setUser] = useState({ authenticated: null });

  useEffect(() => {
    fetch("api/auth/user", {
      credentials: "include",
    })
      .then((res) => setUser({ authenticated: res.status == 200 }))
      .catch(() => setUser({ authenticated: false }));
  }, []);
  
  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
