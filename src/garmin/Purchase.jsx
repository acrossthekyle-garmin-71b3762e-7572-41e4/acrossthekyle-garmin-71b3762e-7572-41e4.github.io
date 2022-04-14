import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;

const Summary = ({ choice, email, name, quantity, step }) => {
  const [cost, setCost] = useState(undefined);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.post('/api/garmin/calculate', {
      choice,
      quantity
    })
      .then((response) => {
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

const Choices = ({ choice, choices, onChangeQuantity, onChoose, quantity }) => {
  return (
    <>
      {choices?.map(({ cost, name, sale, uuid }, index) => {
        const chosen = choice === uuid;

        if (choice !== undefined && !chosen) {
          return null;
        }

        return (
          <React.Fragment key={uuid}>
            <div
              className={
                [
                  `list-group-item py-3 no-shadow rounded-1 ${index === choices.length - 1 ? '' : 'mb-2'}`,
                  chosen ? 'bg-primary' : '',
                  chosen ? 'selected' : ''
                ].join(' ')
              }
            >
              <div className="row">
                <div className={['col-7 col-md-8 text-start', chosen ? 'text-light' : ''].join(' ')}>
                  {name}
                  <span className="d-block small">
                    {sale !== undefined ? (
                      <>
                        <span className={`text-decoration-line-through ${chosen ? 'text-light' : 'text-muted'}`}>${String(cost)}</span>
                        <span className="text-danger"> ${String(sale)}</span>
                      </>
                    ) : (
                      <span>${String(cost)}</span>
                    )}
                  </span>
                </div>
                <div className="col-5 col-md-4 d-flex align-items-center justify-content-end">
                  {chosen ? (
                    <div className="dropdown">
                      <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Quantity: {quantity}
                      </button>
                      <ul className="dropdown-menu dropdown-menu-light">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <li key={value}>
                            <button
                              className={`dropdown-item ${value === quantity ? 'active' : ''}`}
                              onClick={() => onChangeQuantity(value)}
                            >
                              {String(value)}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => onChoose(uuid)}
                    >
                      Buy Code
                    </button>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

const Purchase = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [quantity, setQuantity] = useState(1);
	const [choice, setChoice] = useState(params['*'] || undefined);
  const [filterBy, setFilterBy] = useState('all');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [successful, setSuccessful] = useState(undefined);
  const [processing, setProcessing] = useState(false);

  const products = useSelector(state => state.garmin.products);

  const handleOnCancel = useCallback((redirect = true) => {
    setSuccessful(undefined);
    setChoice(undefined);
    setEmail('');
    setQuantity(1);
    setStep(1);

    if (redirect) {
      navigate('/garmin/purchase');
    }
  }, [navigate]);

  useEffect(() => {
    return () => {
      handleOnCancel(false);
    };
  }, [handleOnCancel]);

  const getName = useCallback(() => {
    if (!choice || !products) {
      return '';
    }

    return products.filter(({ uuid }) => choice === uuid)[0].name;
  }, [products, choice]);

  const handleChoice = (uuid) => {
    setChoice(uuid);
    setQuantity(1);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const next = () => {
    setStep(step + 1);
  };

  const previous = () => {
    setSuccessful(undefined);
    setStep(step - 1)
  };

  const calculateCost = async () => {
    if (!choice) {
      return 0.00;
    }

    return axios.post('/api/garmin/calculate', {
      choice,
      quantity
    })
      .then((response) => {
        return response.data.cost;
      });
  };

  const handleOnReset = () => {
    navigate('/');
  };

  const handlePayPalCreateOrder = async (data, actions) => {
    const value = await calculateCost();

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value,
          },
          description: getName()
        },
      ],
    });
  };

  const handlePayPalApproval = (data, actions) => {
    setProcessing(true);

    return actions.order.capture().then((orderData) => {
      axios.post('/api/garmin/generate', {
        choice,
        email,
        quantity,
        orderId: orderData.id
      })
        .then((response) => {
          setProcessing(false);
          setSuccessful(response.data === 'success');
        })
        .catch(() => {
          setProcessing(false);
          setSuccessful(false);
        });
    });
  };

  const handlePayPalError = () => {
    setProcessing(false);
    setSuccessful(undefined);

    alert('Something went wrong with processing your payment, please confirm your payment details are correct, and try again.');
  };

  if (products === undefined) {
    return null;
  }

  if (successful === true) {
    return (
      <div className="alert alert-success alert-dismissible no-shadow text-start" role="alert">
        <h4 className="alert-heading">Thank you so much for your support!</h4>
        <button
          type="button"
          className="btn-close my-alert-btn-close"
          data-bs-dismiss="alert"
          onClick={handleOnReset}
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

  if (successful === false) {
    return (
      <div className="alert alert-danger alert-dismissible no-shadow text-start" role="alert">
        <h4 className="alert-heading">Unlock Code Generation Error</h4>
        <button
          type="button"
          className="btn-close my-alert-btn-close"
          data-bs-dismiss="alert"
          onClick={handleOnReset}
        />
        <p className="mt-4">
          Something went wrong with generating the Unlock Code(s), but
          your payment was still processed. Please reach out via <a href="mailto:acrossthekyle@gmail.com">email</a>,
          or through the "Contact Developer" feature in the ConnectIQ mobile app.
        </p>
      </div>
    );
  }

  return (
    <>
      {processing && (
        <div className="my-loader bg-dark bg-opacity-75">
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status" />
          </div>
        </div>
      )}

      <div className="my-form mb-sm-4">
        {step > 1 && (
          <Summary choice={choice} email={email} name={getName()} quantity={quantity} step={step} />
        )}

        {step === 1 && (
          <>
            {choice === undefined && (
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle my-dropdown-toggle w-100 text-start" type="button" data-bs-toggle="dropdown">
                  {filterBy ? filterBy.charAt(0).toUpperCase() + filterBy.slice(1) : 'All'}
                </button>
                <ul className="dropdown-menu dropdown-menu-light w-100 text-start">
                  {['All', 'Apps', 'Bundles'].map((value) => (
                    <li key={value}>
                      <button
                        className={`dropdown-item ${value.toLowerCase() === filterBy ? 'active' : ''}`}
                        onClick={() => setFilterBy(value.toLowerCase())}
                      >
                        {String(value)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {['all', 'bundles'].includes(filterBy) && (
              <>
                {choice === undefined && <hr />}
                {choice === undefined && <h3>Bundles</h3>}
                {choice === undefined && <hr />}

                <Choices
                  choice={choice}
                  choices={products.filter((product) => product.type === 'bundle')}
                  onChangeQuantity={setQuantity}
                  onChoose={handleChoice}
                  quantity={quantity}
                />
              </>
            )}

            {['all', 'apps'].includes(filterBy) && (
              <>
                {choice === undefined && <hr />}
                {choice === undefined && <h3>Apps</h3>}
                {choice === undefined && <hr />}

                <Choices
                  choice={choice}
                  choices={products.filter((product) => product.type === 'widget')}
                  onChangeQuantity={setQuantity}
                  onChoose={handleChoice}
                  quantity={quantity}
                />
              </>
            )}

            {choice !== undefined && (
              <div className="row mt-4">
                <div className="col d-flex justify-content-between">
                  <button
                    disabled={!choice}
                    type="button"
                    className="btn btn-light me-2"
                    onClick={handleOnCancel}
                  >
                    Change Selection
                  </button>
                  <button
                    disabled={!choice}
                    type="button"
                    className="btn btn-primary ms-2"
                    onClick={next}
                  >
                    Next: Enter email
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <div className="list-group-item py-3 rounded-1">
              <div className="mb-3 text-start">
                <label
                  htmlFor="email"
                  className="form-label no-shadow"
                >
                  Email <span className="text-danger">*</span>
                </label>
                <input type="email" className="form-control" id="email" onChange={handleEmail} value={email} />
                <div className="form-text no-shadow text-start">
                  The Unlock Code(s) will be sent to this email.
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={previous}
                >
                  Previous
                </button>
                <button
                  disabled={!email || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)}
                  type="button"
                  className="btn btn-primary ms-2"
                  onClick={next}
                >
                  Next: Checkout
                </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="list-group-item rounded-1 py-3">
              <p className="text-start no-shadow">
                Ready to checkout? Click, or tap, on the "Pay with PayPal" button below.
              </p>
              <p className="text-start no-shadow">
                Note: you <strong>do not</strong> need to have a PayPal account in order to pay.
                Choose the "Pay with Debit or Credit Card" option, and after
                filling out the form click on "Continue as Guest".
              </p>

              <PayPalButtons
                style={{
                  layout: 'vertical',
                  color:  'blue',
                  shape:  'rect',
                  label:  'pay'
                }}
                createOrder={handlePayPalCreateOrder}
                forceReRender={[choice, quantity]}
                onApprove={handlePayPalApproval}
                onError={handlePayPalError}
              />

              <div className="form-text no-shadow text-start">
                <p>
                  When using the "Pay with Debit or Credit Card" option, clicking on "Create Account & Continue",
                  or "Continue as Guest", will charge your payment method.
                </p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={previous}
                >
                  Previous
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Purchase;
