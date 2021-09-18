import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { HtmlEditor, Editor as ProseEditor } from "@aeaton/react-prosemirror";
import { plugins, schema } from "@aeaton/react-prosemirror-config-default";

import "../scss/note.scss";

const Note = () => {
  const { user, note, page }: any = useParams();
  const history = useHistory();
  const [notebook, setNotebook] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    fetch(`/api/notes/${user}/${note}`, {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((note) => setNotebook(note));
      } else {
        history.push("/notes");
      }
    });
  }, []);

  useEffect(() => {
    //save
    console.log(value);
  }, [value]);

  return notebook ? (
    <main className="note">
      <ul>
        <h3>
          <FontAwesomeIcon icon={faFileAlt} />
          {user}/{note}
        </h3>
        {Object.keys(notebook.pages).map((name, i) => (
          <li
            key={i}
            onClick={() => {
              history.push(`/notes/${user}/${note}/${name}`);
              window.location.reload(); //dont do this
            }}
          >
            {name}
          </li>
        ))}
        <button>
          <b>
            <FontAwesomeIcon icon={faPlus} />
            Create Page
          </b>
        </button>
      </ul>
      {page && (
        <div className="editor">
          <HtmlEditor
            schema={schema}
            plugins={plugins}
            value={notebook.pages[page]}
            handleChange={setValue}
            debounce={250}
          >
            <ProseEditor autoFocus />
          </HtmlEditor>
        </div>
      )}
    </main>
  ) : (
    <p>Loading...</p>
  );
};

export default Note;
