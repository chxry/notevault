import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { UserContext } from "./context";
import { Navbar, ProtectedRoute } from "./components";
import { Home, Login, Notes, Account } from "./pages";

const App = () => {
  const [user, setUser] = useState({ authenticated: null });

  useEffect(() => {
    fetch("api/auth/user", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status == 200) {
          res.json().then((user) => setUser({ authenticated: true, ...user }));
        } else {
          setUser({ authenticated: false });
        }
      })
      .catch(() => setUser({ authenticated: false }));
  }, []);
  console.log(user);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/notes" component={Notes} />
          <ProtectedRoute path="/account" component={Account} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
