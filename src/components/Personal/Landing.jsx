import React from 'react';
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center font-monospace h-100 flex-column">
      <h1>@acrossthekyle</h1>
      <p className="mt-4 w-75">
        Hello! My name is Kyle. I'm an avid hiker, and developer, who has walked the Camino de
        Santiago, Alta Via, and Annapurna Circuit, to name a few. When I'm not hiking or developing React/React Native
        applications I am probably creating Garmin watch apps.
      </p>
      <button
        type="button"
        className="btn btn-lg btn-dark"
        onClick={() => navigate('garmin')}
      >
        > Garmin
      </button>
		</div>
  );
}
