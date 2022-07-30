import React, { useEffect, useRef, useState } from 'react';

import BarometerHero from '../../../../images/barometer.jpg';
import CompassHero from '../../../../images/compass.jpg';
import ElevationHero from '../../../../images/elevation.jpg';
import HeartRateHero from '../../../../images/heart.jpg';
import SunTimesHero from '../../../../images/sun_times.jpg';
import TemperatureHero from '../../../../images/temperature.jpg';

const getImageBySlug = (slug) => {
	if (slug === 'barometer-widget') {
		return BarometerHero;
	}

	if (slug === 'compass-widget') {
		return CompassHero;
	}

	if (slug === 'elevation-widget') {
		return ElevationHero;
	}

	if (slug === 'heart-rate-widget') {
		return HeartRateHero;
	}

	if (slug === 'sun-times-widget') {
		return SunTimesHero;
	}

	if (slug === 'temperature-widget') {
		return TemperatureHero;
	}

	return undefined;
};

const getTruncatedDescription = (description) => {
	return description
		.replace(/^(.{200}[^\s]*).*/, "$1")
		.replace(/([.,\/#!$%\^&\*;:{}=\-_`~()\]\[])+$/g, "") + '...';
};

export const Product = ({ product, onAddToCart }) => {
	const [showMore, toggleShowMore] = useState(false);

	const descriptionRef = useRef();

	useEffect(() => {
		if (showMore && descriptionRef.current) {
			descriptionRef.current.focus();
		}
	}, [descriptionRef, showMore]);

  return (
		<article className={`product text-start ${product.color}`}>
			<img
				className="product-img"
				src={getImageBySlug(product.slug)}
				alt=""
				aria-hidden="true"
			/>
			<div className="product-content font-monospace">
				<h1
					className={`product-title ${product.color}`}
					tabIndex="0"
				>
					{product.name}
				</h1>
				<div className="product-subtitle">
					{product.sale !== undefined ? (
						<span className="badge badge-sale bg-danger me-2">
							<span className="me-1">ON SALE!</span>
							<span className="text-decoration-line-through me-1">${String(product.cost)}</span>
							${String(product.sale)}
						</span>
					) : (
						<>
							{product.cost !== undefined && (
								<span
									className="badge bg-success me-2"
									tabIndex="0"
								>
									Cost: ${String(product.cost)}
								</span>
							)}
						</>
					)}
					{product.trial !== undefined && (
						<span
							className="badge bg-secondary"
							tabIndex="0"
						>
							Trial period: {product.trial} days
						</span>
					)}
					<div className="mt-2" tabIndex="0">
						{product.snippet}
					</div>
				</div>
				<div className={`product-divider ${product.color} my-3`} />
				<div className="product-preview-txt position-relative" tabIndex="0">
					{showMore && (
						<>
							<div
								className="product-description-arrows d-flex flex-column position-absolute start-0 top-0 fs-4"
								aria-hidden="true"
							>
								<span>{String.fromCharCode(8593)}</span>
								<span>{String.fromCharCode(8595)}</span>
							</div>
							<div className="product-description">
								{product.description.map((text, index) => (
									<p
										key={index}
										ref={index === 0 ? descriptionRef : undefined}
										tabIndex="0"
									>
										{text}
									</p>
								))}
							</div>
						</>
					)}
					{!showMore && (
						<p className="p-0 m-0 product-description-truncated">
							<span className="visually-hidden">Description (truncated):</span>
							{getTruncatedDescription(product.description[0])}
						</p>
					)}
				</div>
				<ul className="product-tagbox">
					<a
						className="product-tag-item text-decoration-none bg-primary"
						href={product.url}
						target="_blank"
						aria-label={`View ${product.name} on Garmin store`}
						rel="noreferrer"
					>
						View on Store
					</a>
					<button
						className="product-tag-item bg-success"
						type="button"
						onClick={() => onAddToCart(product)}
						aria-label={`Add ${product.name} to cart`}
					>
						Add to Cart
					</button>
					<button
						className="product-tag-item"
						type="button"
						onClick={() => toggleShowMore(!showMore)}
						aria-label={showMore ? 'Collapse description' : 'Expand description'}
					>
						{showMore && 'Show Less'}
						{!showMore && 'Show More'}
					</button>
				</ul>
			</div>
		</article>
	);
};
