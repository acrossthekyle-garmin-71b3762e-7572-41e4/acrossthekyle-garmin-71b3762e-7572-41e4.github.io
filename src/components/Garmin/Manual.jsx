import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const axios = require('axios').default;

export const Manual = () => {
  const navigate = useNavigate();

  const [choice, setChoice] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [processing, setProcessing] = useState(false);
  const [successful, setSuccessful] = useState(undefined);

  const apps = useSelector(state => state.garmin.apps);
  const bundles = useSelector(state => state.garmin.bundles);

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

    axios.post('/api/garmin/manual', {
      choice,
      email,
      quantity,
      username,
      password
    })
      .then((response) => {
        setProcessing(false);

        setSuccessful(true);
      })
      .catch(() => {
        setProcessing(false);

        setSuccessful(false);
      });
  };

  if (apps === undefined || bundles === undefined) {
    return null;
  }

  if (successful === true) {
    return (
      <div className="alert alert-success no-shadow text-start" role="alert">
        <p className="my-0">
          Success
        </p>
      </div>
    );
  }

  if (successful === false) {
    return (
      <div className="alert alert-danger no-shadow text-start" role="alert">
        <p className="my-0">
          Failure
        </p>
      </div>
    );
  }

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
                Selection: {choice}
              </button>
              <ul className="dropdown-menu dropdown-menu-light w-100">
                {bundles?.map(({ key, name }) => (
                  <li key={name}>
                    <button
                      className={`dropdown-item ${key === choice ? 'active' : ''}`}
                      onClick={() => handleChoice(key)}
                    >
                      {String(name)}
                    </button>
                  </li>
                ))}
                {apps?.map(({ key, name }) => (
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
