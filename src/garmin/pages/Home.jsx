import React from 'react';

const Home = ({ onPress }) => {
	return (
		<>
	    <p className="lead">
	    	Hello! On this website you can purchase Unlock Codes for my watch apps
	    	as well as learn more about them, along with helpful instructions.
	    </p>
	    <p className="lead">
	      <button
	      	type="button"
	      	className="btn btn-lg btn-success fw-bold"
	      	onClick={onPress}
	      >
	      	Purchase a Watch App
	      </button>
	    </p>
    </>
  );
}

export default Home;
