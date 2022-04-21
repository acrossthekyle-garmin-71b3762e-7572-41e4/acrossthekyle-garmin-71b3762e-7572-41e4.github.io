import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'bootstrap';

import { addToCart } from '../../../store/garmin/actions';
import { selectProducts } from '../../../store/garmin/selectors';

import { Product } from './components/Product';

export const Browse = () => {
	const dispatch = useDispatch();

	const toastRef = useRef();

	const products = useSelector(selectProducts);

	const [query, setQuery] = useState('');
	const [toastText, setToastText] = useState('');
	const [toastVisible, setToastVisible] = useState(false);

	const handleOnAddToCart = (product) => {
		dispatch(addToCart({
			uuid: product.uuid,
			quantity: 1,
		}));

		if (!toastVisible) {
    	Toast.getOrCreateInstance(toastRef.current, {
	    	autohide: false,
	    }).show();

	    toastRef.current.focus();

	    setToastText(product.name);
	    setToastVisible(true);
    } else {
    	setToastText(product.name);
    }
	};

	const handleToastDismissal = () => {
		Toast.getInstance(toastRef.current).hide();

		setToastVisible(false);
	};

	const handleSearchOnChange = (event) => {
		setQuery(event.target.value.toLowerCase());
	};

	const filterProducts = (product) => {
		if (query === '') {
	    return true;
	  }

	  return product.name.toLowerCase().includes(query);
	};

	return (
		<>
			<div className="toast-container position-fixed top-0 end-0 p-3">
				<div
					className="toast"
					role="alert"
					ref={toastRef}
					tabIndex="0"
					aria-live="assertive"
					aria-atomic="true"
				>
		      <div className="toast-header">
		      	<span className="font-monospace text-dark text-start">
		      		<strong>{toastText}</strong> added to cart!
		      	</span>
		        <button
				    	type="button"
				    	className="btn-close me-0 m-auto"
				    	onClick={handleToastDismissal}
				    	aria-label="Close alert"
				    />
		      </div>
		      <div className="toast-body bg-light text-end rounded">
		      	<button
				    	type="button"
				    	className="btn btn-secondary btn-sm font-monospace mb-2 mb-sm-0"
              onClick={handleToastDismissal}
				    >
				    	Add another item
				    </button>
				    <button
				    	type="button"
				    	className="btn btn-success btn-sm font-monospace ms-2 mb-2 mb-sm-0"
				    	data-bs-toggle="modal"
              data-bs-target="#cart"
              onClick={handleToastDismissal}
				    >
				    	View cart
				    </button>
				  </div>
		    </div>
			</div>

			<form className="mb-4" role="search" aria-label="On this page">
	      <input
	      	className="form-control me-2 bg-dark text-light border-secondary"
	      	type="search"
	      	placeholder="Search for an item"
	      	spellCheck="false"
	      	onChange={handleSearchOnChange}
	      	value={query}
	      />
	    </form>

			{products?.filter(filterProducts).map((product) => (
				<Product
					key={product.uuid}
					onAddToCart={handleOnAddToCart}
					product={product}
				/>
			))}
		</>
	);
}
