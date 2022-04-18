import React from 'react';

export const Help = () => {
	return (
		<div className="accordion font-monospace">
		  <div className="accordion-item mb-4 rounded bg-dark border-dark text-light">
		    <h2 className="accordion-header">
		      <button
		      	className="accordion-button rounded collapsed"
		      	type="button"
		      	data-bs-toggle="collapse"
		      	data-bs-target="#CannotUsePayPal"
		      >
		        > What if I can't use PayPal?
		      </button>
		    </h2>
		    <div id="CannotUsePayPal" className="accordion-collapse collapse">
		      <div className="accordion-body text-start">
		      	<p>
			      	If you are unable to pay with PayPal then please click
			      	on "Donate" at the top of the screen. This will take you to
			      	buymeacoffee.com where you can purchase one (1) coffee.
		      	</p>
		      	<p>
		      		Please <strong>do not</strong> forget to indicate which item you wish to purchase
		      		an Unlock Code for in the comments when paying.
		      	</p>
		      	<p>
		      		Once the payment has been received I will send you the Unlock Code.
		      	</p>
		      	<p>
		      		Thanks!
		      	</p>
		      </div>
		    </div>
		  </div>

		  <div className="accordion-item mb-4 rounded bg-dark border-dark text-light">
		    <h2 className="accordion-header">
		      <button
		      	className="accordion-button rounded collapsed"
		      	type="button"
		      	data-bs-toggle="collapse"
		      	data-bs-target="#HowToEnterUnlockCode"
		      >
		        > What do I do with the Unlock Code?
		      </button>
		    </h2>
		    <div id="HowToEnterUnlockCode" className="accordion-collapse collapse">
		      <div className="accordion-body text-start">
		      	<ul className="text-start">
			        <li>
			          Once you get the Unlock Code, open the Garmin ConnectIQ Mobile app (make sure the widget isn't open on the watch).
			        </li>
			        <li>
			          Enter the Unlock Code in the Settings screen for this widget, without any space symbols at the beginning or end, and press Save.
			        </li>
			        <li>
			          Close the Garmin ConnectIQ Mobile app.
			        </li>
			        <li>
			          Open the Garmin Connect mobile app (<strong>important:</strong> do not use the watch WiFi or LTE, it will not work), wait for a connection to the watch and then re-open the widget on the watch in order to allow for activation.
			        </li>
			        <li>
			          Leave the widget open on the watch for several seconds.
			        </li>
			        <li>
			          You can then check the Unlock Status from the settings menu on the watch (open the menu on the main widget screen), or from the Settings screen in the Garmin ConnectIQ Mobile app.
			        </li>
			      </ul>
		      </div>
		    </div>
		  </div>

		  <div className="accordion-item mb-4 rounded bg-dark border-dark text-light">
		    <h2 className="accordion-header">
		      <button
		      	className="accordion-button rounded collapsed"
		      	type="button"
		      	data-bs-toggle="collapse"
		      	data-bs-target="#WhereIsEmail"
		      >
		        > Where is the email?
		      </button>
		    </h2>
		    <div id="WhereIsEmail" className="accordion-collapse collapse">
		      <div className="accordion-body text-start">
		      	<p>
			      	Emails can sometimes take up to 12+ hours to arrive. If the email has not
			        arrived in a timely manner first check your spam folder (sometimes they can end up in there),
			        and if they still have not arrived then please reach out via <a href="mailto:acrossthekyle@gmail.com">email</a>,
			        or through the "Contact Developer" feature in the ConnectIQ mobile app.
		        </p>
		      </div>
		    </div>
		  </div>
		</div>
	);
}
