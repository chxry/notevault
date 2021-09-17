import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt,faPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

import "../scss/note.scss";

const Note = () => {
  const { user, note, page }: any = useParams();
  const history = useHistory();
  const [notebook, setNotebook] = useState(null);

  useEffect(() => {
    fetch(`/api/notes/${user}/${note}`, {
      credentials: "include",
    }).then((res) => res.json().then((note) => setNotebook(note)));
  }, []);
  console.log(notebook);

  return notebook ? (
    <main className="note">
      <ul>
        <h3><FontAwesomeIcon icon={faFileAlt}/>{user}/{note}</h3>
        {Object.keys(notebook.pages).map((name, i) => (
          <li key={i} onClick={() => history.push(`/notes/${user}/${note}/${name}`)}>{name}</li>
        ))}
        <button><b><FontAwesomeIcon icon={faPlus}/>Create Page</b></button>
      </ul>
      {page &&
      <div className="page">
        {notebook.pages[page]}
      </div>}
    </main>
  ) : (
    <p>Loading...</p>
  );
};

export default Note;
