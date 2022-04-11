import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux'

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

const Choices = ({ choice, choices, onChangeQuantity, onChoose, quantity, type }) => {
  return (
    <>
      {choices?.map(({ cost, key, name, sale }) => {
        const chosen = choice === key;

        if (choice !== undefined && !chosen) {
          return null;
        }

        return (
          <React.Fragment key={key}>
            <div
              className={
                [
                  'list-group-item',
                  'py-3',
                  'no-shadow',
                  'rounded-1',
                  chosen ? 'bg-primary' : '',
                  chosen ? 'selected' : ''
                ].join(' ')
              }
            >
              <div className="row">
                <div className={['col', 'text-start', chosen ? 'text-light' : ''].join(' ')}>
                  {name}
                  <span className="d-block small">
                    {sale !== undefined ? (
                      <>
                        <span className="text-decoration-line-through text-muted">${String(cost)}.00</span>
                        <span> ${String(sale)}.00</span>
                      </>
                    ) : (
                      <span>${String(cost)}.00</span>
                    )}
                  </span>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
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
                      onClick={() => onChoose(key, type)}
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
  let [searchParams, setSearchParams] = useSearchParams();

  const [groups, setGroups] = useState();
  const [quantity, setQuantity] = useState(1);
	const [choice, setChoice] = useState(searchParams.has('app') ? searchParams.get('app') : undefined);
  const [choiceType, setChoiceType] = useState('app');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [successful, setSuccessful] = useState(undefined);
  const [processing, setProcessing] = useState(false);

  const [{ isPending }] = usePayPalScriptReducer();

  const apps = useSelector(state => state.garmin.apps);
  const bundles = useSelector(state => state.garmin.bundles);

  const handleOnCancel = useCallback((removeSearchParams = true) => {
    setSuccessful(undefined);
    setChoice(undefined);
    setChoiceType('app');
    setEmail('');
    setQuantity(1);
    setStep(1);
    setGroups(undefined);

    if (removeSearchParams) {
      setSearchParams({});
    }
  }, [setSearchParams]);

  useEffect(() => {
    return () => {
      handleOnCancel(false);
    };
  }, [handleOnCancel]);

  const getName = useCallback(() => {
    if (!choice) {
      return '';
    }

    if (!apps || !bundles) {
      return '';
    }

    var items = choiceType === 'app' ? apps : bundles;

    return items.filter(({ key }) => choice === key)[0].name;
  }, [apps, bundles, choice, choiceType]);

  const handleChoice = (selection, type) => {
    setChoice(selection);
    setChoiceType(type);
    setQuantity(1);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const next = () => {
    setStep(step + 1);
  };

  const previous = () => {
    setGroups(undefined);
    setSuccessful(undefined);
    setStep(step - 1)
  };

  const calculateCost = async () => {
    return axios.post('/api/garmin/calculate', {
      choice,
      quantity
    })
      .then((response) => {
        return response.data.cost;
      });
  };

  const handleOnReset = () => {
    window.location.reload();
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
          setGroups(response.data.groups);
          setSuccessful(true);
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

  if (apps === undefined || bundles === undefined) {
    return null;
  }

  if (successful === true && groups?.length > 0) {
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

  if (successful === false || (successful === true && groups?.length === 0)) {
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

      <div className="my-form mb-4">
        {step > 1 && (
          <Summary choice={choice} email={email} name={getName()} quantity={quantity} step={step} />
        )}

        {step === 1 && (
          <>
            <Choices
              choice={choice}
              choices={bundles}
              onChangeQuantity={setQuantity}
              onChoose={handleChoice}
              quantity={quantity}
              type="bundle"
            />

            {choice === undefined && <hr />}

            <Choices
              choice={choice}
              choices={apps}
              onChangeQuantity={setQuantity}
              onChoose={handleChoice}
              quantity={quantity}
              type="app"
            />

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
                  Email address <span className="text-danger">*</span>
                </label>
                <input type="email" className="form-control" id="email" onChange={handleEmail} value={email} />
                <div className="form-text no-shadow text-start">
                  The Unlock Code will be sent to this email address.
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
              {isPending && (
                <div className="spinner-border" role="status" />
              )}

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
