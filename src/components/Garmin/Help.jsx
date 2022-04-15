import React from 'react';

export const Help = () => {
	return (
    <>
      <p className="lead text-start">
        If you have any issues with entering, or receiving, an Unlock Code, or have any issues/questions with any of my applications,
        then please reach out to me via email at <a href="mailto:acrossthekyle@gmail.com">acrossthekyle@gmail.com</a>,
        or through the "Contact Developer" feature in the ConnectIQ mobile app.
      </p>
      <h2 className="pb-4 mt-4 text-start"># Instructions for Entering an Unlock Code</h2>
      <ul className="lead text-start">
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
      <h2 className="pb-4 mt-4 text-start"># Issues With Email</h2>
      <p className="lead text-start">
        Emails can sometimes take up to 12+ hours to arrive. If the email has not
        arrived in a timely manner first check your spam folder (sometimes they can end up in there),
        and if they still have not arrived then please reach out via <a href="mailto:acrossthekyle@gmail.com">email</a>,
        or through the "Contact Developer" feature in the ConnectIQ mobile app.
      </p>
    </>
  );
}