import React, { useCallback, useEffect, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const axios = require('axios').default;

const Summary = ({ cost, email, name, quantity, step }) => {
  const [visible, setVisible] = useState(false);

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
              <div>${cost}.00</div>
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
      {choices.map(({ cost, key, name, sale }) => {
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

const Purchase = ({ apps, bundles, ...props }) => {
	const [choice, setChoice] = useState(props.choice);
  const [choiceType, setChoiceType] = useState('app');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [successful, setSuccessful] = useState(undefined);
  const [groups, setGroups] = useState();
  const [codeCount, setCodeCount] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [processing, setProcessing] = useState(false);

  const [{ isPending }] = usePayPalScriptReducer();

  useEffect(() => {
    return () => {
      setStep(1);
      setChoice(undefined);
      setEmail('');
      setSuccessful(undefined);
    };
  }, []);

  const getCost = useCallback(() => {
    if (!choice) {
      return '';
    }

    var items = choiceType === 'app' ? apps : bundles;
    var result = items.filter(({ key }) => choice === key)[0];

    return (result.sale !== undefined ? result.sale : result.cost) * quantity;
  }, [apps, bundles, choice, choiceType, quantity]);

  const getName = useCallback(() => {
    if (!choice) {
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
    setGroups(null);
    setSuccessful(undefined);

    setStep(step - 1)
  };

  const handleOnCancel = () => {
    setSuccessful(undefined);
    setChoice(undefined);
    setChoiceType('app');
    setEmail('');
    setQuantity(1);
    setStep(1);
    setGroups(null);
    setCodeCount(1);

    props.onCancel();
  };

  const handleOnReset = () => {
    window.location.reload();
  };

  const handlePayPalCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: getCost(),
          },
          description: getName()
        },
      ],
    });
  };

  const handlePayPalApproval = (data, actions) => {
    setProcessing(true);

    return actions.order.capture().then(() => {
      let items = [];

      if (choice === 'all') {
        items = apps.map(({ key, name }) => {
          return {
            choice: key,
            name
          };
        });
      } else {
        items = [{
          choice,
          name: getName()
        }];
      }

      // prod: https://api.acrossthekyle.com/api/garmin/generate
      // local: http://localhost/api/garmin/generate
      axios.post('https://api.acrossthekyle.com/api/garmin/generate', {
        choice: getName(),
        items,
        email,
        quantity
      })
        .then((response) => {
          setProcessing(false);
          setGroups(response.data.groups);
          setCodeCount(response.data.count);
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

  if (successful === true && groups !== undefined) {
    return (
      <div className="alert alert-success alert-dismissible no-shadow text-start" role="alert">
        <h4 className="alert-heading">Thank You!</h4>
        <button
          type="button"
          className="btn-close my-alert-btn-close"
          data-bs-dismiss="alert"
          onClick={handleOnReset}
        />
        <p>Thank you so much for your payment!</p>

        {groups.length === 1 && (
          <>
            {codeCount === 1 && (
              <p>Here is your Unlock Code:</p>
            )}
            {codeCount > 1 && (
              <p>Here are your Unlock Codes:</p>
            )}
            {groups[0].codes.map((code) => (
              <p key={code}><strong>{code}</strong></p>
            ))}
          </>
        )}

        {groups.length > 1 && (
          <>
            <p>Here are your Unlock Codes:</p>

            {groups.map((group, index) => (
              <React.Fragment key={index}>
                <p>{group.name}</p>

                {group.codes.map((code) => (
                  <p key={code}><strong>{code}</strong></p>
                ))}
              </React.Fragment>
            ))}
          </>
        )}

        <p>
          Please copy and insert Unlock Codes without any space symbols at the beginning or end.
        </p>

        <p>
          The Unlock Code(s), along with some extra tips, are also on their way to your email inbox
          right now. Please keep the Unlock Code(s) around for your own personal records.
        </p>
        <p>
          Thanks again!
        </p>
        <hr />
        <p className="mb-0">
          PS. If you encounter any issues when entering an Unlock Code please reach out
          via the "Contact Developer" feature in the ConnectIQ mobile app.
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
        <p>
          Something went wrong with generating the Unlock Code(s), but
          your payment was still processed. Please reach out via the
          "Contact Developer" feature in the ConnectIQ mobile app.
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
        <h1 className="pb-4 mt-4">Purchase an Unlock Code</h1>

        {step > 1 && (
          <Summary cost={getCost()} email={email} name={getName()} quantity={quantity} step={step} />
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
                forceReRender={[getCost()]}
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
