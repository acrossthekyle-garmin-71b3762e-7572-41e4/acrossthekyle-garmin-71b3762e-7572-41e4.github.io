import React, { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { apps } from './store';

const axios = require('axios').default;

const Manual = () => {
	const navigate = useNavigate();

  const [choice, setChoice] = useState();
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [processing, setProcessing] = useState(false);

  const getName = useCallback(() => {
    if (!choice) {
      return 'None';
    }

    return apps.filter(({ key }) => choice === key)[0].name;
  }, [choice]);

  const handleChoice = (selection, type) => {
    setChoice(selection);
    setQuantity(1);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onCancel = () => {
  	navigate('/');
  };

  const onSubmit = () => {
  	setProcessing(true);

  	const items = items = [{
      choice,
      name: getName()
    }];

    axios.post('https://api.acrossthekyle.com/api/garmin/manual', {
      choice: getName(),
      items,
      email,
      quantity,
      username,
      password
    })
      .then((response) => {
        setProcessing(false);
      })
      .catch(() => {
        setProcessing(false);
      });
  };

  return (
    <>
      {processing && (
        <div className="my-loader bg-dark bg-opacity-75">
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status" />
          </div>
        </div>
      )}

      <div className="my-form mb-4">
        <div className="list-group-item py-3 rounded-1">
          <div className="mb-3 text-start">
            <label
              htmlFor="email"
              className="form-label no-shadow"
            >
              Payer email address
            </label>
            <input
            	type="email"
            	className="form-control"
            	id="email"
            	onChange={handleEmail}
            	value={email}
            />
          </div>
          <div className="mb-3 text-start">
            <label
              htmlFor="username"
              className="form-label no-shadow"
            >
              Username
            </label>
            <input
            	type="text"
            	className="form-control"
            	id="username"
            	onChange={handleUsername}
            	value={username}
            />
          </div>
          <div className="mb-3 text-start">
            <label
              htmlFor="password"
              className="form-label no-shadow"
            >
              Password
            </label>
            <input
            	type="password"
            	className="form-control"
            	id="password"
            	onChange={handlePassword}
            	value={password}
            />
          </div>
          <div className="mb-3 text-start">
          	<div className="dropdown w-100">
              <button className="btn btn-light dropdown-toggle w-100 text-start my-dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Selection: {getName()}
              </button>
              <ul className="dropdown-menu dropdown-menu-light w-100">
                {apps.map(({ key, name }) => (
                  <li key={name}>
                    <button
                      className={`dropdown-item ${key === choice ? 'active' : ''}`}
                      onClick={() => handleChoice(key)}
                    >
                      {String(name)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-3 text-start">
          	<div className="dropdown w-100">
              <button className="btn btn-light dropdown-toggle w-100 text-start my-dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Quantity: {quantity}
              </button>
              <ul className="dropdown-menu dropdown-menu-light w-100">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <li key={value}>
                    <button
                      className={`dropdown-item ${value === quantity ? 'active' : ''}`}
                      onClick={() => setQuantity(value)}
                    >
                      {String(value)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-light me-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manual;
