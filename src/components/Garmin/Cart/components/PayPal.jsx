import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { PayPalButtons } from '@paypal/react-paypal-js';

import {
	selectCart,
  selectCartCount,
} from '../../../../store/garmin/selectors';

const axios = require('axios').default;

export const PayPal = ({ onComplete, onSubmit }) => {
	const cart = useSelector(selectCart);
	const cartCount = useSelector(selectCartCount);

	const [email, setEmail] = useState('');
	const [showPayPal, setShowPayPal] = useState(false);

  const handleOnEmailChange = (event) => {
  	const value = event.target.value.trim();

  	setEmail(value);

  	if (!/(.+)@(.+){2,}\.(.+){2,}/.test(value) && showPayPal) {
			setShowPayPal(false);
		}
  };

  const handleCreateOrder = async (data, actions) => {
    const value = await axios.post('/api/garmin/calculate', { cart })
      .then((response) => response.data);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value,
          },
          description: `Unlock Code${cartCount > 1 ? 's' : ''}`
        }
      ]
    });
  };

  const handleOnApprove = (data, actions) => {
  	onSubmit();

    return actions.order.capture().then((orderData) => {
      axios.post('/api/garmin/generate', {
        cart,
        email,
        orderId: orderData.id
      })
        .then((response) => {
        	onComplete('success');
        })
        .catch(() => {
          onComplete('error');
        });
    });
  };

  const handleOnError = () => {
    alert(
    	'Something went wrong with processing your payment, please ' +
    	'confirm your payment details are correct, and try again.'
    );
  };

	return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="fw-bold mb-1"
        >
          Email Address <span aria-hidden="true" className="text-danger">*</span>
        </label>
        <input
        	type="email"
        	className="form-control"
        	id="email"
        	onChange={handleOnEmailChange}
        	value={email}
        	required
        	aria-placeholder={`(The Unlock Code${cartCount > 1 ? 's' : ''} will be sent to this email address.)`}
        	aria-required="true"
        	style={{ fontFamily: 'system-ui' }}
        />
      	<div
      		aria-hidden="true"
      		className="form-text text-start"
      	>
          The Unlock Code{cartCount > 1 ? 's' : ''} will be sent to this email address.
        </div>
      </div>
      <div className="mb-2">
      	{!showPayPal && (
	    		<button
	    	  	disabled={cart.length === 0 || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)}
	    	  	className="btn btn-primary w-100"
	    	  	type="button"
	    	  	onClick={() => setShowPayPal(true)}
	    	  >
	    	  	Proceed to Payment
	    	  </button>
    	  )}
    	  {showPayPal && (
	    		<div>
	    			<PayPalButtons
		          createOrder={handleCreateOrder}
		          onApprove={handleOnApprove}
		          forceReRender={[cartCount]}
		          onError={handleOnError}
		          style={{
		            layout: 'vertical',
		            color:  'blue',
		            shape:  'rect',
		            label:  'pay'
		          }}
		        />
		        <div
		        	className="form-text text-start"
		        	tabIndex="0"
		        >
		          <p>
		            When using the "Pay with Debit or Credit Card" option (Guest
		            Checkout), clicking on "Create Account & Continue", or
		            "Continue as Guest", will charge your payment method.
		          </p>
		        </div>
	        </div>
        )}
      </div>
    </div>
	);
}
