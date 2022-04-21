import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import { selectCart } from '../../../../store/garmin/selectors';

const axios = require('axios').default;

export const Manual = ({ onComplete, onSubmit }) => {
	const cart = useSelector(selectCart);

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

  const handleOnEmailChange = (event) => {
  	setEmail(event.target.value.trim());
  };

  const handleOnUsernameChange = (event) => {
  	setUsername(event.target.value.trim());
  };

  const handleOnPasswordChange = (event) => {
  	setPassword(event.target.value.trim());
  };

  const handleSubmitOnClick = () => {
    onSubmit();

  	axios.post('/api/garmin/manual', {
      cart,
      email,
      username,
      password
    })
      .then((response) => {
        onComplete('success');
      })
      .catch(() => {
        onComplete('error');
      });
  };

	return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="fw-bold mb-1"
        >
          Email Address
        </label>
        <input
        	type="email"
        	className="form-control"
        	id="email"
        	onChange={handleOnEmailChange}
        	value={email}
        />
    		<label
          htmlFor="username"
          className="fw-bold mb-1 mt-3"
        >
          Username
        </label>
        <input
        	type="text"
        	className="form-control"
        	id="username"
        	onChange={handleOnUsernameChange}
        	value={username}
        />
        <label
          htmlFor="password"
          className="fw-bold mb-1 mt-3"
        >
          Password
        </label>
        <input
        	type="text"
        	className="form-control"
        	id="password"
        	onChange={handleOnPasswordChange}
        	value={password}
        />
      </div>
      <div className="mb-2">
      	<button
    	  	className="btn btn-primary w-100"
    	  	type="button"
    	  	onClick={handleSubmitOnClick}
    	  >
    	  	Send Code(s)
    	  </button>
      </div>
    </div>
	);
}
