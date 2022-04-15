import React from 'react';
import { useNavigate } from "react-router-dom";

export const Missing = () => {
	const navigate = useNavigate();

	const fixIt = () => {
		navigate('/garmin');
	};

  return (
    <div
      className="alert alert-danger no-shadow text-start mt-4 mt-sm-0"
      role="alert"
    >
      <h4 className="alert-heading">Oops!</h4>
      <p className="mt-4">
        Not sure what happened here, but it looks like something went missing?
        Try fixing it by clicking the button below.
      </p>
      <hr />
      <p className="mb-0 d-flex justify-content-end">
      	<button
          type="button"
          className="btn btn-danger"
          onClick={fixIt}
        >
          Go back to the home page
        </button>
      </p>
    </div>
  );
}
