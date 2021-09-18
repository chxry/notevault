import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";

import "../scss/cookies.scss"

const Cookies = () => {
  const [cookieConsent, setCookieConsent] = useState(localStorage.getItem("cookies"));

  useEffect(() => cookieConsent && localStorage.setItem("cookies",cookieConsent),[cookieConsent]);

  return <div className={cookieConsent ? "cookies" : "cookies active"} onClick={() => setCookieConsent("accepted")}>
    <h3><FontAwesomeIcon icon={faCookieBite}/>This website uses cookies.</h3>
    <p>Click here to dismiss.</p>
  </div>;
};

export default Cookies;
