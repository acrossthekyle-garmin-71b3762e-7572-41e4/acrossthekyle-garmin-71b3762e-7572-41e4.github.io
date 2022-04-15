import React from 'react';
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate('/');
  };

  return (
    <div
      className="alert alert-success alert-dismissible no-shadow text-start"
      role="alert"
    >
      <h4 className="alert-heading">Thank you so much for your support!</h4>
      <button
        type="button"
        className="btn-close my-alert-btn-close"
        data-bs-dismiss="alert"
        onClick={handleOnClose}
      />

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
