import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

import "../scss/settings.scss"
import { Layout } from "../components";
import { UserContext } from "../context";
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

  return (
    <Layout header="Settings" center>
      <div className="card">
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
    </Layout>
  );
};

export default Settings;
