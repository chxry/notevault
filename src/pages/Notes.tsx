import React, { useContext } from "react";

import "../scss/notes.scss";
import { Layout } from "../components";
import { UserContext } from "../context";

const Notes = () => {
  const [user] = useContext(UserContext);

  return (
    <Layout header="Notes" center>
      <ul className="notes">
        <li>
          <b>Note 1</b>
        </li>
      </ul>
    </Layout>
  );
};

export default Notes;
