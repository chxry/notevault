import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

import "../scss/login.scss";
import { redirect } from "../util";

const Login = () => {
  return (
    <div className="login">
      <div>
        <h1>Welcome Back!</h1>
        <button onClick={() => redirect("/api/auth/github")}>
          <FontAwesomeIcon icon={faGithub} />
          Login with GitHub.
        </button>
        <button onClick={() => redirect("/api/auth/twitter")}>
          <FontAwesomeIcon icon={faTwitter} />
          Login with Twitter.
        </button>
      </div>
    </div>
  );
};

export default Login;
