import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'bootstrap';

import BarometerHero from '../../images/barometer.jpg';
import CompassHero from '../../images/compass.jpg';
import ElevationHero from '../../images/elevation.jpg';
import HeartRateHero from '../../images/heart.jpg';
import SunTimesHero from '../../images/sun_times.jpg';
import TemperatureHero from '../../images/temperature.jpg';
import { addToCart } from '../../store/garmin/actions';

const Product = ({ product, onAddToCart }) => {
	const dispatch = useDispatch();

	const [showMore, toggleShowMore] = useState(false);

	const handleOnAddToCart = (uuid) => {
    dispatch(addToCart({ uuid, quantity: 1 }));

    onAddToCart(product.name);
  };

  const getHero = (name) => {
  	if (name === 'Barometer Widget') {
  		return BarometerHero;
  	}

  	if (name === 'Compass (ABC) Widget') {
  		return CompassHero;
  	}

  	if (name === 'Elevation Widget') {
  		return ElevationHero;
  	}

  	if (name === 'Heart Rate Widget') {
  		return HeartRateHero;
  	}

  	if (name === 'Sun Times Widget') {
  		return SunTimesHero;
  	}

  	if (name === 'Temperature Widget') {
  		return TemperatureHero;
  	}

  	return undefined;
  };

  return (
		<article key={product.uuid} className={`product text-start ${product.color}`}>
			<img className="product-img" src={getHero(product.name)} alt="" />
			<div className="product-content font-monospace">
				<h1 className={`product-title ${product.color}`}>{product.name}</h1>
				<div className="product-subtitle">
					<span className="badge bg-success me-2">Cost: ${product.cost}</span>
					<span className="badge bg-secondary">Trial period: {product.trial} days</span>
					<div className="mt-2">
						{product.snippet}
					</div>
				</div>
				<hr className={`product-divider ${product.color}`} />
				<div className="product-preview-txt position-relative">
					{showMore && (
						<div className="product-preview-txt-arrows d-flex flex-column position-absolute start-0 top-0 fs-4">
							<span>{String.fromCharCode(8593)}</span>
							<span>{String.fromCharCode(8595)}</span>
						</div>
					)}
					{!showMore && product.description[0].replace(/^(.{200}[^\s]*).*/, "$1").replace(/([.,\/#!$%\^&\*;:{}=\-_`~()\]\[])+$/g, "") + '...'}
					{showMore && (
						<div className="product-preview-txt-content">
							{product.description.map((text, index) => (
								<p key={index}>{text}</p>
							))}
						</div>
					)}
				</div>
				<ul className="product-tagbox">
					<button
						className={`product-tag-item add-to-cart ${product.color}`}
						type="button"
						onClick={() => handleOnAddToCart(product.uuid)}
					>
						Add to Cart
					</button>
					<button
						className={`product-tag-item show-more`}
						type="button"
						onClick={() => toggleShowMore(!showMore)}
					>
						{showMore && 'Show Less'}
						{!showMore && 'Show More'}
					</button>
				</ul>
			</div>
		</article>
	);
};

export const Browse = () => {
	const toastRef = useRef();

	const products = useSelector(state => state.garmin.products);

	const [toastName, setToastName] = useState('');
	const [toastVisible, setToastVisible] = useState(false);

	const handleOnAddToCart = (name) => {
		if (!toastVisible) {
    	const toast = Toast.getOrCreateInstance(toastRef.current, {
	    	autohide: false
	    });
	    toast.show();

	    setToastName(name);
	    setToastVisible(true);
    }
	};

	const handleToastDismissal = () => {
		const toast = Toast.getInstance(toastRef.current);
		toast.hide();

		setToastVisible(false);
	};

	if (products === undefined) {
    return null;
  }

	return (
		<>
			<div className="toast-container position-fixed top-0 end-0 p-3">
				<div className="toast" role="alert" ref={toastRef}>
		      <div className="toast-header">
		      	<span className="font-monospace text-dark text-start">
		      		<strong>{toastName}</strong> added to cart!
		      	</span>
		        <button
				    	type="button"
				    	className="btn-close me-0 m-auto"
				    	onClick={handleToastDismissal}
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

			{products?.filter((product) => product.type !== 'bundle').map((product) => (
				<Product
					key={product.uuid}
					onAddToCart={handleOnAddToCart}
					product={product}
				/>
			))}
		</>
	);
}
