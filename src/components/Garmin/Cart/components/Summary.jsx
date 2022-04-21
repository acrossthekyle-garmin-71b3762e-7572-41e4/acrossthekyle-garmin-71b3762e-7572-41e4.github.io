import React from 'react';
import { useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux'

import {
	selectCart,
	selectCartAmountDue,
} from '../../../../store/garmin/selectors';

import { Manual } from './Manual';
import { PayPal } from './PayPal';

export const Summary = ({ onComplete, onSubmit }) => {
	const [searchParams] = useSearchParams();

	const cart = useSelector(selectCart);
	const cartAmountDue = useSelector(selectCartAmountDue);

  const isManual = searchParams.has('manual');

	return (
    <div className="col-md-4 summary text-dark text-start">
      <h3
      	className="fw-bolder"
      	tabIndex="0"
      >
      	Summary
      </h3>
      <hr />
      {cart.length > 1 && (
      	<>
      		<div className="d-flex align-items-center justify-content-between mb-2">
	        	<div className="fw-bold">
	        		Cost:
	        	</div>
	        	<span>
	        		${String(cartAmountDue.total.toFixed(2))}
	        	</span>
        	</div>
        	<div className="d-flex align-items-center justify-content-between mb-2">
	        	<div className="fw-bold">
	        		Bundled Discount:
	        	</div>
	        	<span className="text-danger">
	        		-${String(cartAmountDue.discount.toFixed(2))}
	        	</span>
	        </div>
	        <hr />
        </>
      )}
      <div
      	className="d-flex align-items-center justify-content-between mb-3"
      	tabIndex="0"
      >
      	<div className="fw-bold">
      		Total:
      	</div>
      	<span className="fw-bold">
      		${String((cartAmountDue.total - cartAmountDue.discount).toFixed(2))}
      	</span>
      </div>

      <hr />

      {isManual && <Manual onComplete={onComplete} onSubmit={onSubmit} />}
      {!isManual && <PayPal onComplete={onComplete} onSubmit={onSubmit} />}
    </div>
	);
}
