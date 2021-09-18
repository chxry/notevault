import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import "../scss/notes.scss";
import { Layout } from "../components";

const Notes = () => {
  const history = useHistory();
  const [owned, setOwned] = useState(null);

  useEffect(() => {
    fetch("/api/notes", {
      credentials: "include",
    }).then((res) => res.json().then((notes) => setOwned(notes.owned)));
  }, []);

  return (
    <Layout header="Notebooks" center>
      {owned ? (
        <>
          <ul className="notes">
            <li>
              <b>My Notebooks ({owned.length}):</b>
              <p>
                <FontAwesomeIcon icon={faCalendarAlt} />
                Last Edited:
              </p>
            </li>
            {owned.map((note) => (
              <li
                key={note._id}
                className="note"
                onClick={() =>
                  history.push(`/notes/${note.owner}/${note.title}`)
                }
              >
                <b>{note.title}</b>
                <p>{new Date(note.edited).toLocaleDateString()}</p>
              </li>
            ))}
            <li className="button">
              <b>Create a notebook.</b>
            </li>
          </ul>
          <ul className="notes">
            <li>
              <b>Shared with you ({owned.length}):</b>
              <p>
                <FontAwesomeIcon icon={faUser} />
                Owner:
              </p>
              <p>
                <FontAwesomeIcon icon={faCalendarAlt} />
                Last Edited:
              </p>
            </li>
            {owned.map((note) => (
              <li key={note._id} className="note">
                <b>{note.title}</b>
                <p>{note.owner}</p>
                <p className="date">
                  {new Date(note.edited).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading.</p>
      )}
    </Layout>
  );
};

export default Notes;
