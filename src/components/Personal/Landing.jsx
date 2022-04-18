import React from 'react';
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center font-monospace h-100 flex-column">
      <h1>@acrossthekyle</h1>
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
