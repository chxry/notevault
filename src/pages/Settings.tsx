import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

import "../scss/settings.scss"
import { Layout } from "../components";
import { UserContext,ThemeContext } from "../context";
import { capitalize } from "../util";

const ProviderIcon = ({
  provider,
}: {
  provider: string;
}) => {
  switch (provider) {
    case "github": return <FontAwesomeIcon icon={faGithub}/>
    case "twitter": return <FontAwesomeIcon icon={faTwitter}/>
    default: return null;
  }
};

const Settings = () => {
  const [user] = useContext(UserContext);
  const [theme,setTheme] = useContext(ThemeContext);

  return (
    <Layout header="Settings" center>
      <div className="card account">
        <h3>Account Info:</h3>
        <div className="icons">
          <img src={user.image} alt={user.username} />
          <ProviderIcon provider={user.provider}/>
        </div>
        <div className="info">
          <span><b>Username: </b>{user.username}</span>
          <span><b>Provider: </b>{capitalize(user.provider)}</span>
          <span><b>Created: </b>{new Date(user.created).toLocaleString()}</span>
        </div>
      </div>
      <div className="card appearance">
        <h3>Appearance:</h3>
        <span><b>Theme:</b></span>
        {["light","dark","nord"].map((t,i) => <div key={i} className={theme===t ? "theme active" : "theme"} onClick={() => setTheme(t)}>{capitalize(t)}</div>)}
      </div>
    </Layout>
  );
};

export default Settings;
