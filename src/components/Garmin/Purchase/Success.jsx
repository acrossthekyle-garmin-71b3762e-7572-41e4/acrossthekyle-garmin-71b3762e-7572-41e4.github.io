import React from 'react';

export const Success = () => {
  return (
    <div
      className="alert alert-success no-shadow text-start mt-4 mt-sm-0"
      role="alert"
    >
      <h4 className="alert-heading">Thank you so much for your support!</h4>

      <p className="my-4">
        The Unlock Code(s) are on their way to your email inbox right now!
        Please keep them around for your own personal records.
      </p>

      <p className="mb-0">
        Thanks again!
      </p>
    </div>
  );
}
