import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import BarometerHero from '../../images/barometer.jpg';
import CompassHero from '../../images/compass.jpg';
import ElevationHero from '../../images/elevation.jpg';
import HeartRateHero from '../../images/heart.jpg';
import SunTimesHero from '../../images/sun_times.jpg';
import TemperatureHero from '../../images/temperature.jpg';
import { addToCart } from '../../store/garmin/actions';

const Product = ({ product }) => {
	const dispatch = useDispatch();

	const [showMore, toggleShowMore] = useState(false);

	const handleOnAddToCart = (uuid) => {
    dispatch(addToCart({ uuid, quantity: 1 }));
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
			<div className="product-content">
				<h1 className={`product-title ${product.color}`}>{product.name}</h1>
				<div className="product-subtitle">
					{product.snippet}
				</div>
				<hr className={`product-divider ${product.color}`} />
				<div className="product-preview-txt">
					{!showMore && product.description[0].replace(/^(.{300}[^\s]*).*/, "$1").replace(/([.,\/#!$%\^&\*;:{}=\-_`~()\]\[])+$/g, "") + ' . . .'}
					{showMore && product.description.map((text, index) => (
						<p key={index}>{text}</p>
					))}
				</div>
				<ul className="product-tagbox">
					<li className="product-tag-item">{product.type}</li>
					<li className="product-tag-item">${product.cost} (Free for {product.trial} days)</li>
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
	const products = useSelector(state => state.garmin.products);

	if (products === undefined) {
    return null;
  }

	return (
		<>
			{products?.filter((product) => product.type !== 'bundle').map((product) => (
				<Product key={product.uuid} product={product} />
			))}
		</>
	);
}
