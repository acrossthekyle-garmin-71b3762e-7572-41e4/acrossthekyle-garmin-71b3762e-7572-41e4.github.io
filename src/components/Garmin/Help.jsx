import React from 'react';

export const Help = () => {
	return (
		<>
			<article className={`product text-start green`}>
				<img className="product-img" src="https://picsum.photos/id/1073/1000/1000" alt="" />
				<div className="product-content">
					<h1 className={`product-title`}>What do I do with the Unlock Code?</h1>
					<hr className="product-divider blue" />
					<div className="product-preview-txt">
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
			</article>
			<article className={`product text-start blue`}>
				<img className="product-img" src="https://picsum.photos/id/0/1000/1000" alt="" />
				<div className="product-content">
					<h1 className={`product-title`}>Where is the email?</h1>
					<hr className="product-divider green" />
					<div className="product-preview-txt">
						Emails can sometimes take up to 12+ hours to arrive. If the email has not
		        arrived in a timely manner first check your spam folder (sometimes they can end up in there),
		        and if they still have not arrived then please reach out via <a href="mailto:acrossthekyle@gmail.com">email</a>,
		        or through the "Contact Developer" feature in the ConnectIQ mobile app.
					</div>
				</div>
			</article>
		</>
	);
}
