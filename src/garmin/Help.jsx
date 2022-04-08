import React from 'react';

const Help = () => {
	return (
    <>
      <p className="lead text-start">
        If you have any issues with entering, or receiving, an Unlock Code, or have any issues/questions with any of my applications,
        then please reach out to me via email at <a href="mailto:acrossthekyle@gmail.com">acrossthekyle@gmail.com</a>,
        or through the "Contact Developer" feature in the ConnectIQ mobile app.
      </p>
      <h2 className="pb-4 mt-4 text-start"># Instructions for Entering an Unlock Code</h2>
      <p className="lead text-start">
        Once you get the Unlock Code, open the Garmin ConnectIQ Mobile app (make sure
          the widget isn't open on the watch). Enter the Unlock Code in the Settings
        screen for this widget, and press Save. Close the Garmin ConnectIQ Mobile app.
        Open the Garmin Connect mobile app, wait for connection to watch then re-open
        the widget on the watch in order to allow for activation.
      </p>
    </>
  );
}

export default Help;
