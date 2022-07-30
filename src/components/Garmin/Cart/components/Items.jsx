import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import {
	selectCart,
  selectCartCount,
  selectCartHasSaleItems,
  selectProducts
} from '../../../../store/garmin/selectors';

export const Items = ({ onRemove, onQuantityChange }) => {
	const cart = useSelector(selectCart);
	const cartCount = useSelector(selectCartCount);
	const hasSaleItems = useSelector(selectCartHasSaleItems);
	const products = useSelector(selectProducts);

	const hasMultipleFullPriceProducts = products.filter(
		product => product.sale === undefined
	).length > 1;

	const [showBundleDiscountAlert, setShowBundleDiscountAlert] = useState(true);

	return (
    <div className="col-md-8 cart text-dark text-start">
    	<div className="d-flex align-items-center justify-content-between mt-1 pt-4 mt-md-0 pt-md-0">
      	<h3
      		className="fw-bolder mb-0"
      		tabIndex="0"
      	>
      		Cart
      	</h3>
      	<span
      		className="text-muted fw-bold text-small"
      		tabIndex="0"
      	>
      		{cartCount} Item{cartCount > 1 ? 's' : ''}
      	</span>
      </div>
      {cart.map(({ product, quantity, uuid }, index) => {
      	return (
      		<React.Fragment key={index}>
        		<hr />
	        	<div className="row d-flex align-items-center">
		        	<div className="col-12 col-md-5 mb-2 mb-md-0">
		        		<span className="me-2">
		        			{product.name}
		        		</span>
		        		{product.sale !== undefined && (
	        				<span className="badge rounded-pill bg-danger sale-badge-pill">
								    ON SALE!
								  </span>
	        			)}
		        	</div>
		        	<div className="col-4 col-md-2 text-start text-md-center">
		        		<div className="dropdown">
								  <button
								  	className="btn btn-outline-secondary btn-sm dropdown-toggle"
								  	type="button"
								  	data-bs-toggle="dropdown"
								  	aria-label={`${product.name} Quantity: ${quantity}`}
								  >
								    {quantity}
								  </button>
								  <ul className="dropdown-menu dropdown-menu-dark">
									  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
									    <li key={value}>
									    	<button
									    		className="dropdown-item"
									    		onClick={() => onQuantityChange(index, value)}
									    	>
									    		{value}
									    	</button>
									    </li>
								    ))}
								  </ul>
								</div>
		        	</div>
		        	<div
		        		className="col-4 col-md-2 text-center"
		        		tabIndex="0"
		        	>
		        		{product.sale !== undefined ? (
									<>
										<span className="text-decoration-line-through me-1">${String(product.cost)}</span>
										<span className="text-danger position-relative">
				        			${String(product.sale)}
				        		</span>
									</>
								) : (
									<>
										{product.cost !== undefined && (
											<span>${String(product.cost)}</span>
										)}
									</>
								)}
		        		<span className="visually-hidden">each</span>
		        	</div>
		        	<div className="col-4 col-md-3 text-end">
		        		<button
		        			className="btn btn-danger btn-sm"
		        			type="button"
		        			onClick={() => onRemove(index)}
		        			aria-label={`Remove ${product.name} from cart`}
		        		>
		        			Remove
		        		</button>
		        	</div>
		        </div>
	        </React.Fragment>
      	);
      })}
      <hr className="d-none d-md-block" />
      {cart.length === 1 && showBundleDiscountAlert && hasMultipleFullPriceProducts && (
      	<div className="text-center mt-4">
      		<hr className="d-block d-md-none" />
      		<div
      			className="mb-2"
      			tabIndex="0"
      		>
      			Add another item to get a bundled discount?
      			{hasSaleItems && (
      				<div className="form-text">
      					[Bundled discounts only apply to non-sale items]
      				</div>
      			)}
      		</div>
      		<button
        		className="btn btn-secondary btn-sm me-2"
        		type="button"
        		onClick={() => setShowBundleDiscountAlert(false)}
        	>
        		No thanks
        	</button>
      		<button
        		className="btn btn-success btn-sm"
        		type="button"
        		data-bs-dismiss="modal"
        	>
        		Yes, please
        	</button>
      	</div>
      )}
      {cart.length > 1 && (
      	<div className="text-center">
      		<hr className="d-block d-md-none" />
      		<div className="mt-4">
      			Nice, you got a discount!
      		</div>
      	</div>
      )}
  	</div>
	);
}
