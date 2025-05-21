import React from "react";
import ConfettiCanvas from "./ConfettiCanvas"; // chemin vers le fichier

function ItsAmatch({ match }) {
  return (
    <div className="match_f">
      <ConfettiCanvas />
      <div className="profile_match">
        <div>
          <img src="/no_image2.png" alt="Startup" />
          <p>{match}</p>
        </div>
        <div>
          <img src="/no_image.jpg" alt="User" />
          <p>{match}</p>
        </div>
      </div>
      <h1>It's a Match !</h1>
    </div>
  );
}

export default ItsAmatch;
