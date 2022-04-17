import React from 'react';

export const Error = () => {
  return (
    <div
      className="alert alert-danger no-shadow text-start mt-4 mt-sm-0"
      role="alert"
    >
      <h4 className="alert-heading">Unlock Code Generation Error</h4>
      <p className="mt-4">
        Something went wrong with generating the Unlock Code(s), but
        your payment was still processed. Please reach out via <a href="mailto:acrossthekyle@gmail.com">email</a>,
        or through the "Contact Developer" feature in the ConnectIQ mobile app.
      </p>
      <hr />
      <p className="mb-0">You can safely close this window.</p>
    </div>
  );
}
