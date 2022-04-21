import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'bootstrap';

import {
	changeQuantityInCart,
	onPurchased,
	removeFromCart,
} from '../../../store/garmin/actions';
import { selectCartCount } from '../../../store/garmin/selectors';

import { Items } from './components/Items';
import { Summary } from './components/Summary';

let modal;

export const Cart = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const cartCount = useSelector(selectCartCount);

	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		modal = new Modal(document.getElementById('cart'));
	}, []);

	useEffect(() => {
		if (cartCount === 0) {
    	modal.hide();
    }
	}, [cartCount]);

	const handleOnQuantityChange = (index, quantity) => {
		dispatch(changeQuantityInCart({ index, quantity }));
	};

	const handleOnRemove = (index) => {
    dispatch(removeFromCart(index));
  };

  const onComplete = (type) => {
  	setProcessing(false);

    modal.hide();

    dispatch(onPurchased());

    if (type === 'success') {
    	navigate('success');
    } else {
    	navigate('error');
    }
  };

  const onSubmit = () => {
  	setProcessing(true);
  };

	return (
		<>
			{processing && (
        <div className="my-loader bg-dark bg-opacity-75">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div
            	className="spinner-border"
            	role="status"
            />
          </div>
        </div>
      )}
			<div
				className="modal fade"
				id="cart"
				tabIndex="-1"
			>
				<div className="modal-dialog modal-dialog-centered modal-fullscreen shopping-cart font-monospace">
					<div className="modal-content bg-transparent">
						<button
	        		className="btn-close position-absolute mt-4 me-3 me-sm-2 end-0"
	        		type="button"
	        		data-bs-dismiss="modal"
	        	/>
						<div className="row">
				      <Items
				      	onRemove={handleOnRemove}
				      	onQuantityChange={handleOnQuantityChange}
				      />
					    <Summary
					    	onComplete={onComplete}
					    	onSubmit={onSubmit}
					    />
					  </div>
					</div>
				</div>
			</div>
		</>
	);
}
