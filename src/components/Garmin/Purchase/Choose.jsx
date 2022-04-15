import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { Choices } from './components/Choices';
import { setChoice, setQuantity } from '../../../store/garmin/actions';

export const Choose = () => {
	const dispatch = useDispatch();

  const navigate = useNavigate();

	const [filterBy, setFilterBy] = useState('all');

	const choice = useSelector(state => state.garmin.choice);
	const products = useSelector(state => state.garmin.products);
	const quantity = useSelector(state => state.garmin.quantity);

	const handleOnChoose = (uuid) => {
    dispatch(setChoice(uuid));
  };

  const handleOnChangeQuantity = (amount) => {
    dispatch(setQuantity(amount));
  };

  const handleOnCancel = () => {
  	dispatch(setChoice(undefined));
  };

  const handleOnNext = () => {
    navigate('/garmin/purchase/email');
  };

	if (products === undefined) {
    return null;
  }

  return (
    <div className="my-form mb-sm-4">
      {choice === undefined && (
        <div className="dropdown">
          <button
          	className="btn btn-light dropdown-toggle my-dropdown-toggle w-100 text-start"
          	type="button"
          	data-bs-toggle="dropdown"
          >
            {filterBy ? filterBy.charAt(0).toUpperCase() + filterBy.slice(1) : 'All'}
          </button>
          <ul className="dropdown-menu dropdown-menu-light w-100 text-start">
            {['All', 'Apps', 'Bundles'].map((value) => (
              <li key={value}>
                <button
                  className={`dropdown-item ${value.toLowerCase() === filterBy ? 'active' : ''}`}
                  onClick={() => setFilterBy(value.toLowerCase())}
                >
                  {String(value)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {['all', 'bundles'].includes(filterBy) && (
        <>
          {choice === undefined && <hr />}
          {choice === undefined && <h3>Bundles</h3>}
          {choice === undefined && <hr />}

          <Choices
            choice={choice}
            choices={products.filter((product) => product.type === 'bundle')}
            onChangeQuantity={handleOnChangeQuantity}
            onChoose={handleOnChoose}
            quantity={quantity}
          />
        </>
      )}

      {['all', 'apps'].includes(filterBy) && (
        <>
          {choice === undefined && <hr />}
          {choice === undefined && <h3>Apps</h3>}
          {choice === undefined && <hr />}

          <Choices
            choice={choice}
            choices={products.filter((product) => product.type === 'widget')}
            onChangeQuantity={handleOnChangeQuantity}
            onChoose={handleOnChoose}
            quantity={quantity}
          />
        </>
      )}

      {choice !== undefined && (
        <div className="row mt-2">
          <div className="col d-flex justify-content-between">
            <button
              disabled={!choice}
              type="button"
              className="btn btn-light me-2"
              onClick={handleOnCancel}
            >
              Change Selection
            </button>
            <button
              disabled={!choice}
              type="button"
              className="btn btn-primary ms-2"
              onClick={handleOnNext}
            >
              Next: Enter email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
