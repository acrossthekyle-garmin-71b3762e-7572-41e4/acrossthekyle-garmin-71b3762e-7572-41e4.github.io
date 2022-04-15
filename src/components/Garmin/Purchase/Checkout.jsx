import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButtons } from '@paypal/react-paypal-js';

import { onPurchased } from '../../../store/garmin/actions';
import { Summary } from './components/Summary';
import * as utils from './utils';

const axios = require('axios').default;

export const Checkout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const choice = useSelector(state => state.garmin.choice);
  const email = useSelector(state => state.garmin.email);
  const products = useSelector(state => state.garmin.products);
  const quantity = useSelector(state => state.garmin.quantity);

  const [processing, setProcessing] = useState(false);

  const name = utils.getName(choice, products);

  const handleCreateOrder = async (data, actions) => {
    const value = await utils.calculateCost(choice, quantity)
                             .then((response) => response.data);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value,
          },
          description: name
        },
      ],
    });
  };

  const handleOnApprove = (data, actions) => {
    setProcessing(true);

    return actions.order.capture().then((orderData) => {
      axios.post('/api/garmin/generate', {
        choice,
        email,
        quantity,
        orderId: orderData.id
      })
        .then((response) => {
          setProcessing(false);

          dispatch(onPurchased());

          navigate('/garmin/purchase/success');
        })
        .catch(() => {
          setProcessing(false);

          dispatch(onPurchased());

          navigate('/garmin/purchase/error');
        });
    });
  };

  const handleOnError = () => {
    setProcessing(false);

    alert('Something went wrong with processing your payment, please confirm your payment details are correct, and try again.');
  };

  const handleOnPrevious = () => {
    navigate('/garmin/purchase/email');
  };

  if (!choice || !email || !products) {
    return null;
  }

  return (
    <div className="my-form mb-sm-4 mt-4">
    	{processing && (
        <div className="my-loader bg-dark bg-opacity-75">
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status" />
          </div>
        </div>
      )}

      <Summary
    		choice={choice}
    		email={email}
    		name={name}
    		quantity={quantity}
    		step={3}
    	/>

    	<div className="list-group-item rounded-1 py-3">
        <p className="text-start no-shadow">
          Ready to checkout? Click, or tap, on the "Pay with PayPal" button below.
        </p>
        <p className="text-start no-shadow">
          Note: you <strong>do not</strong> need to have a PayPal account in
          order to pay. Choose the "Pay with Debit or Credit Card" option,
          and after filling out the form click on "Continue as Guest".
        </p>

        <PayPalButtons
          createOrder={handleCreateOrder}
          forceReRender={[choice, quantity]}
          onApprove={handleOnApprove}
          onError={handleOnError}
          style={{
            layout: 'vertical',
            color:  'blue',
            shape:  'rect',
            label:  'pay'
          }}
        />

        <div className="form-text no-shadow text-start">
          <p>
            When using the "Pay with Debit or Credit Card" option,
            clicking on "Create Account & Continue", or "Continue
            as Guest", will charge your payment method.
          </p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col d-flex justify-content-between">
          <button
            disabled={processing}
            type="button"
            className="btn btn-light me-2"
            onClick={handleOnPrevious}
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}
