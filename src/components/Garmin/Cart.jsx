import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Modal } from 'bootstrap';

import {
	changeQuantityInCart,
	onPurchased,
	removeFromCart,
	setEmail
} from '../../store/garmin/actions';
import * as utils from './utils';

const axios = require('axios').default;

let modal;

export const Cart = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const cart = useSelector(state => state.garmin.cart);
	const email = useSelector(state => state.garmin.email);
	const products = useSelector(state => state.garmin.products);

	const [showPayPal, setShowPayPal] = useState(false);
	const [processing, setProcessing] = useState(false);

	const cartCount = utils.getCartCount(cart);

	useEffect(() => {
		modal = new Modal(document.getElementById('cart'));
	}, []);

	useEffect(() => {
		if (cartCount === 0) {
    	setShowPayPal(false);

    	dispatch(setEmail(''));

    	modal.hide();
    }
	}, [cartCount]);

	const handleQuantityOnChange = (index, quantity) => {
		dispatch(changeQuantityInCart({ index, quantity }));
	};

	const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleEmailOnChange = (event) => {
  	const value = event.target.value;

  	dispatch(setEmail(value));

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
          description: 'Widget Unlock Code(s)'
        }
      ]
    });
  };

  const handleOnApprove = (data, actions) => {
    setProcessing(true);

    return actions.order.capture().then((orderData) => {
      axios.post('/api/garmin/generate', {
        cart,
        email,
        orderId: orderData.id
      })
        .then((response) => {
          setProcessing(false);
          setShowPayPal(false);

          modal.hide()

          dispatch(onPurchased());

          navigate('success');
        })
        .catch(() => {
          setProcessing(false);
          setShowPayPal(false);

          modal.hide()

          dispatch(onPurchased());

          navigate('error');
        });
    });
  };

  const handleOnError = () => {
    setProcessing(false);

    alert('Something went wrong with processing your payment, please confirm your payment details are correct, and try again.');
  };

  const getCartCost = () => {
  	let total = 0;

	  cart.forEach(({ uuid, quantity }) => {
	    total += Number(utils.getCost(uuid, products) * quantity);
	  });

	  return total;
  };

  const getCartDiscount = () => {
  	let total = 0;

  	if (cart.length > 1) {
  		cart.forEach(({ uuid, quantity }) => {
		    total += quantity;
		  });
  	}

	  return total;
  };

  const cost = getCartCost();
  const discount = getCartDiscount();
  const total = cost - discount;

	return (
		<>
			{processing && (
        <div className="my-loader bg-dark bg-opacity-75">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border" role="status" />
          </div>
        </div>
      )}
			<div
				className="modal fade"
				id="cart"
				tabIndex="-1"
			>
				<div className="modal-dialog modal-dialog-centered modal-fullscreen shopping-cart">
					<div className="modal-content bg-transparent">
				    <div className="row">
				      <div className="col-md-8 cart text-dark text-start">
				      	<div className="d-flex align-items-center justify-content-between">
				        	<h3 className="fw-bolder mb-0">Cart</h3>
				        	<span className="text-muted fw-bold text-small">{cartCount} Items</span>
				        </div>
				        {cart.map(({ uuid, quantity }, index) => (
				        	<React.Fragment key={index}>
				        		<hr />
					        	<div className="row d-flex align-items-center">
						        	<div className="col-12 col-md-5 mb-2 mb-md-0">
						        		{utils.getName(uuid, products)}
						        	</div>
						        	<div className="col-4 col-md-2 text-start text-md-center">
						        		<div className="dropdown">
												  <button
												  	className="btn btn-outline-secondary btn-sm dropdown-toggle"
												  	type="button"
												  	data-bs-toggle="dropdown"
												  >
												    {quantity}
												  </button>
												  <ul className="dropdown-menu dropdown-menu-dark">
													  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
													    <li key={value}>
													    	<button
													    		className="dropdown-item"
													    		onClick={() => handleQuantityOnChange(index, value)}
													    	>
													    		{value}
													    	</button>
													    </li>
												    ))}
												  </ul>
												</div>
						        	</div>
						        	<div className="col-4 col-md-2 text-center">
						        		${String(utils.getCost(uuid, products))}
						        	</div>
						        	<div className="col-4 col-md-3 text-end">
						        		<button
						        			className="btn btn-danger btn-sm"
						        			type="button"
						        			onClick={() => handleRemoveFromCart(index)}
						        		>
						        			Remove
						        		</button>
						        	</div>
						        </div>
					        </React.Fragment>
				        ))}
				        <hr className="d-none d-md-block" />
					  	</div>
					    <div className="col-md-4 summary text-dark text-start">
					      <h3 className="fw-bolder">Summary</h3>
					      <hr />
					      {cart.length > 1 && (
					      	<>
					      		<div className="d-flex align-items-center justify-content-between mb-2">
						        	<div className="fw-bold">Cost:</div>
						        	<span>${String(cost.toFixed(2))}</span>
					        	</div>
					        	<div className="d-flex align-items-center justify-content-between mb-2">
						        	<div className="fw-bold">Bundled Discount:</div>
						        	<span className="text-danger">-${String(discount.toFixed(2))}</span>
						        </div>
						        <hr />
					        </>
				        )}
				        <div className="d-flex align-items-center justify-content-between mb-3">
				        	<div className="fw-bold">Total:</div>
				        	<span className="fw-bold">${String(total.toFixed(2))}</span>
				        </div>
				        <hr />
				        <div className="mb-4">
				          <label
				            htmlFor="email"
				            className="fw-bold mb-1"
				          >
				            Email Address <span className="text-danger">*</span>
				          </label>
				          <input
				          	type="email"
				          	className="form-control"
				          	id="email"
				          	onChange={handleEmailOnChange}
				          	value={email}
				          />
				          <div className="form-text text-start">
				            The Unlock Code(s) will be sent to this email address.
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
				        	  	Continue
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
							        <div className="form-text text-start">
							          <p>
							            When using the "Pay with Debit or Credit Card" option (Guest Checkout),
							            clicking on "Create Account & Continue", or "Continue
							            as Guest", will charge your payment method.
							          </p>
							        </div>
						        </div>
						       )}
				        	<button
				        		className="btn btn-secondary w-100 mt-2"
				        		type="button"
				        		data-bs-dismiss="modal"
				        	>
				        		Close
				        	</button>
				        </div>
					    </div>
					  </div>
					</div>
				</div>
			</div>
		</>
	);
}
