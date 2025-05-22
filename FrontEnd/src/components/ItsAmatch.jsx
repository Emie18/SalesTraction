import React, { use, useState } from "react";
import ConfettiCanvas from "./ConfettiCanvas"; // chemin vers le fichier
import "../styles/itsmatch.css"
import ViewStartup from "./ViewStartup";
import { API } from "../scripts/api";
import ViewStudent from "./ViewStudent";
function ItsAmatch({ match, id, setIsmatch, startup }) {
  const [showProfile, setShowProfile] = useState(false);
  const keepSwiping = () => {
    console.log('retour');
    setIsmatch(false);
  };
  const seeprofile = () => {
    setShowProfile(!showProfile);
  };
  return (
    <div className="match_f">
      {!showProfile && <ConfettiCanvas />}
      <div className="profile_match">
        <div>
          <img src={match.startup.image ? API.make_url(match.startup.image) : "/no_image.jpg"} alt="Startup" />
          <p>{match.startup.name}</p>
        </div>
        <div>
          <img src={match.student.image ? API.make_url(match.student.image) : "/no_image.jpg"} alt="User" />
          <p>{match.student.name}</p>
          <p>{match.student.surname}</p>
        </div>
      </div>
      <h1>It's a Match !</h1>

      <div className="button">
        <button className="keep" onClick={keepSwiping}>Keep swiping</button>
        <button className="see" onClick={seeprofile}>See profile</button>
      </div>

      {showProfile && (
        <div className="abspp">
          <button className="close" onClick={seeprofile}>X</button>
          {startup === true ? <ViewStartup id={id} /> : <ViewStudent id={id} />}
        </div>
      )}

    </div>
  );
}

export default ItsAmatch;
