import React from 'react';

const Modal = ({ cost, description, features, id, name, onPurchase, settings, trial, type, url }) => {
	return (
		<div className="modal" id={`${id}_modal`} tabIndex="-1">
		  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		    <div className="modal-content">
		      <div className="modal-header">
		        <h2 className="modal-title text-dark no-shadow">{name}</h2>
		        <button type="button" className="btn-close" data-bs-dismiss="modal" />
		      </div>
		      <div className="modal-body text-dark text-start no-shadow">
		      	<h3>Description</h3>
		        {description.map((paragraph, index) => (
		        	<p key={index}>{paragraph}</p>
		        ))}

		        <h3>Features</h3>
		        <ul>
			        {features.map((paragraph, index) => (
			        	<li key={index}>{paragraph}</li>
			        ))}
		        </ul>

		        <h3>Settings</h3>
		        <ul>
		        {settings.map((paragraph, index) => (
		        	<li key={index}>{paragraph}</li>
		        ))}
		        </ul>

		        <h3>Trial Period</h3>
		      	<p>{trial} Days</p>
		      </div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		        <a className="btn btn-primary" href={url} target="_blank" rel="noreferrer">View on Store</a>
		        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={onPurchase}>
		        	Buy Code: ${String(cost)}
		        </button>
		      </div>
		    </div>
		  </div>
		</div>
	);
};

const Apps = ({ apps, onPurchase }) => {
	return (
		<div className="container mb-4 mt-4">
		  <div className="row row-cols-1 row-cols-md-2">
		  	{apps.map((app, index) => (
		  		<div key={app.key}>
		  			<Modal
		  				id={app.key}
		  				onPurchase={() => onPurchase(app)}
		  				{...app}
		  			/>

			  		<div className="col">
				  		<div className="card mb-4 rounded-1">
							  <div className="card-body h-100 bg-light">
							    <h5 className="card-title text-dark no-shadow">{app.name}</h5>
							    <p className="card-text text-secondary no-shadow">{app.snippet}</p>
							    <button
							    	type="button"
							    	className="btn btn-success"
							    	data-bs-toggle="modal"
							    	data-bs-target={`#${app.key}_modal`}
							    >
									  Learn More
									</button>
							  </div>
							</div>
						</div>
					</div>
		  	))}
		  </div>
		</div>
  );
}

export default Apps;
