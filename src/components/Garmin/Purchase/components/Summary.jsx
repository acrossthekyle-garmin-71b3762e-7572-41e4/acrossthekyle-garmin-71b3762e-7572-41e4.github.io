import React, { useEffect, useState } from 'react';

import * as utils from '../utils';

export const Summary = ({ choice, email, name, quantity, step }) => {
  const [cost, setCost] = useState(undefined);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    utils.calculateCost(choice, quantity).then((response) => {
      setCost(response.data.cost);
    });
  }, [choice, quantity]);

  return (
    <div className="bg-dark position-relative mb-3">
      <div className="toast show no-shadow shadow-none my-toast">
        <div className="toast-header">
          <strong className="me-auto text-dark ps-2">Summary</strong>
          <button
            type="button"
            className="btn btn-muted bg-transparent text-decoration-underline"
            onClick={() => setVisible(!visible)}
          >
            <small>{visible ? 'Hide' : 'Show'}</small>
          </button>
        </div>
        {visible && (
          <div className="toast-body text-dark text-start">
            <div className="d-flex justify-content-between align-items-center p-2">
              <div className="fw-bold d-flex">Item</div>
              <div className="text-end ps-4">Unlock Code for {name}</div>
            </div>

            <div className="d-flex justify-content-between align-items-center p-2">
              <div className="fw-bold">Quantity</div>
              <div>{quantity}</div>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center p-2">
              <div className="fw-bold">Total</div>
              <div>{cost !== undefined ? '$' + cost : 'Calculating...'}</div>
            </div>

            {email && step === 3 && (
              <>
                <hr />

                <div className="d-flex justify-content-between align-items-center p-2">
                  <div>Unlock Code(s) will be sent to: <span className="fw-bold">{email}</span></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
