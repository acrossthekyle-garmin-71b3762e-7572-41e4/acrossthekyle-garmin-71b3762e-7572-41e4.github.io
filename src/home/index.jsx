import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="mb-auto" />

		  <main className="px-3">
	    	<h1 className="pb-4 mt-4">acrossthekyle</h1>
        <div className="text-center my-home-buttons">
          <button
            type="button"
            className="btn btn-lg btn-secondary fw-bold mt-4"
            onClick={() => navigate('garmin')}
          >
            Go to Garmin Apps
          </button>
        </div>
      </main>

      <footer className="mt-auto text-white-50" />
		</div>
  );
}

export default Home;
