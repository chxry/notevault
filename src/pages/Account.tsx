import React, { useContext } from "react";

import { Layout } from "../components";
import { UserContext } from "../context";

const Account = () => {
  const [user] = useContext(UserContext);

  return (
    <Layout header="Account" center>
      <h2>Account Info:</h2>
      <b>Username: </b>
      {user.username}
    </Layout>
  );
};

export default Account;
