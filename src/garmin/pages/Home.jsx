import React from 'react';

const Home = ({ onPress }) => {
	return (
		<>
			<p className="lead">
	    	Hello!
	    </p>
			<p className="lead">
	    	On this website you can purchase Unlock Codes for my watch apps
	    	as well as learn more about them, along with helpful instructions.
	    </p>
	    <div className="row">
	    	<div className="col-12 col-md-6 text-md-end">
		    	<button
		      	type="button"
		      	className="btn btn-lg btn-primary fw-bold mt-4"
		      	onClick={() => onPress('apps')}
		      >
		      	View Watch Apps
		      </button>
	      </div>
	      <div className="col-12 col-md-6 text-md-start">
		      <button
		      	type="button"
		      	className="btn btn-lg btn-success fw-bold mt-4"
		      	onClick={() => onPress('purchase')}
		      >
		      	Purchase an Unlock Code
		      </button>
	      </div>
	    </div>
    </>
  );
}

export default Home;
