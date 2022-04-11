import React from 'react';
import { useNavigate } from "react-router-dom";

import me from '../images/me.jpg';

const Home = ({ onPress }) => {
	const navigate = useNavigate();

	return (
		<>
			<img src={me} className="rounded mx-auto d-block my-4 mt-4 mt-sm-0 me" alt="" />

			<p className="lead px-3">
	    	Hello!
	    </p>
			<p className="lead px-3">
	    	On this website you can purchase Unlock Codes for my watch apps
	    	as well as learn more about them, along with helpful instructions.
	    </p>
	    <div className="d-flex row my-home-buttons">
	    	<div className="col-12 col-md-6 text-md-end">
		    	<button
		      	type="button"
		      	className="btn btn-lg btn-primary fw-bold mt-4"
		      	onClick={() => navigate('apps')}
		      >
		      	View Apps
		      </button>
	      </div>
	      <div className="col-12 col-md-6 text-md-start">
		      <button
		      	type="button"
		      	className="btn btn-lg btn-success fw-bold mt-4"
		      	onClick={() => navigate('purchase')}
		      >
		      	Purchase a Code
		      </button>
	      </div>
	    </div>
    </>
  );
}

export default Home;
