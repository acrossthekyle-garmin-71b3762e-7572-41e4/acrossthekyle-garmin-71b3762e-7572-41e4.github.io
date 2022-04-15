import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { setEmail } from '../../../store/garmin/actions';
import { Missing } from './components/Missing';
import { Summary } from './components/Summary';
import * as utils from './utils';

export const Email = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const choice = useSelector(state => state.garmin.choice);
  const email = useSelector(state => state.garmin.email);
  const products = useSelector(state => state.garmin.products);
  const quantity = useSelector(state => state.garmin.quantity);

  const handleOnChange = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const handleOnPrevious = () => {
    navigate('/garmin/purchase');
  };

  const handleOnNext = () => {
    navigate('/garmin/purchase/checkout');
  };

  if (!choice || !products) {
    return (
      <Missing />
    );
  }

  return (
    <div className="my-form mb-sm-4">
    	<Summary
    		choice={choice}
    		email={email}
    		name={utils.getName(choice, products)}
    		quantity={quantity}
    		step={2}
    	/>

    	<div className="list-group-item py-3 rounded-1">
        <div className="mb-3 text-start">
          <label
            htmlFor="email"
            className="form-label no-shadow"
          >
            Email <span className="text-danger">*</span>
          </label>
          <input
          	type="email"
          	className="form-control"
          	id="email"
          	onChange={handleOnChange}
          	value={email}
          />
          <div className="form-text no-shadow text-start">
            The Unlock Code(s) will be sent to this email.
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-light me-2"
            onClick={handleOnPrevious}
          >
            Previous
          </button>
          <button
            disabled={!email || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)}
            type="button"
            className="btn btn-primary ms-2"
            onClick={handleOnNext}
          >
            Next: Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
