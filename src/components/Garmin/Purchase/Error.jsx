import React from 'react';
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate('/');
  };

  return (
    <div
      className="alert alert-danger alert-dismissible no-shadow text-start"
      role="alert"
    >
      <h4 className="alert-heading">Unlock Code Generation Error</h4>
      <button
        type="button"
        className="btn-close my-alert-btn-close"
        data-bs-dismiss="alert"
        onClick={handleOnClose}
      />
      <p className="mt-4">
        Something went wrong with generating the Unlock Code(s), but
        your payment was still processed. Please reach out via <a href="mailto:acrossthekyle@gmail.com">email</a>,
        or through the "Contact Developer" feature in the ConnectIQ mobile app.
      </p>
    </div>
  );
}
