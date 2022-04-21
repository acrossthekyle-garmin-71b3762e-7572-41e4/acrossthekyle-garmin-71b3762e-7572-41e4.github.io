import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { onLoaded } from '../../store/garmin/actions';
import {
  selectCartCount,
  selectClientId,
  selectLoaded,
  selectProducts,
} from '../../store/garmin/selectors';

import { Cart } from './Cart/Cart';

const axios = require('axios').default;

const pages = [
  {
    name: 'Browse',
    key: '/garmin',
    path: '/garmin',
    external: false,
    ariaLabel: 'Browse Garmin watch apps'
  },
  {
    name: 'Donate',
    key: 'donate',
    path: 'https://www.buymeacoffee.com/acrossthekyle',
    external: true,
    ariaLabel: 'Donate and support my work'
  },
  {
    name: 'FAQ',
    key: 'help',
    path: '/garmin/help',
    external: false,
    ariaLabel: 'Frequently Asked Questions'
  }
];

export const Container = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const clientId = useSelector(selectClientId);
  const products = useSelector(selectProducts);
  const loaded = useSelector(selectLoaded);
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    if (products === undefined) {
      axios.get('/api/garmin/browse').then((response) => {
        dispatch(onLoaded(response.data));
      });
    }
  }, [products, dispatch]);

  const cartIsEmpty = cartCount === 0;

  const canRenderNavigation = !location.pathname.includes('success') &&
    !location.pathname.includes('error');

  if (loaded === false) {
    return (
      <div className="my-loader bg-dark" aria-hidden="true">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border" role="status" />
        </div>
      </div>
    );
  }

  if (loaded === true && products === undefined) {
    return (
      <div className="alert alert-danger no-shadow text-start" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p className="mt-4">
          Opps! Something went wrong. Please try refreshing.
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <PayPalScriptProvider
        options={{
          'client-id': clientId,
          currency: 'USD',
          'disable-funding': ['card', 'credit', 'paylater']
        }}
      >
        <Cart />
      </PayPalScriptProvider>
    	<header className="pt-4 pb-2 mb-4">
        <div className="row g-0">
          <div className="col-6 col-sm-4 d-flex justify-content-sm-start">
    	      <button
              className="btn btn-transparent me-md-auto text-light text-decoration-none font-monospace ps-0"
              onClick={() => navigate('/')}
              type="button"
              role="link"
              aria-label="Go to home page"
            >
    	        @acrossthekyle
    	      </button>
          </div>
          <div className="col-12 col-sm-8 d-flex justify-content-sm-end">
            {canRenderNavigation && (
              <ul className="nav flex-column flex-sm-row text-start">
                {pages.map(({ ariaLabel, external, key, name, path }, index) => (
                  <li key={key} className="nav-item font-monospace">
                    <a
                      className={`btn btn-transparent ${location.pathname === path ? 'text-secondary' : 'text-light'} ps-0 ${index === (pages.length - 1) ? '' : 'pe-4'}`}
                      href={`${external ? '' : '#'}${path}`}
                      target={external ? '_blank' : '_self'}
                      rel="noreferrer"
                      aria-label={ariaLabel}
                    >
                      <span className="d-inline d-sm-none">{'>'}</span> {name}
                    </a>
                  </li>
                ))}
                <li className="nav-item font-monospace">
                  <button
                    className="btn btn-transparent text-light font-monospace pe-0 ps-3 d-none d-sm-block"
                    type="button"
                    data-bs-toggle={cartIsEmpty ? '' : 'modal'}
                    data-bs-target="#cart"
                    aria-disabled={cartIsEmpty}
                    aria-label="View cart"
                  >
                    Cart
                    <span
                      className={`badge rounded-pill ms-2 text-center ${cartIsEmpty ? 'bg-light text-dark' : 'bg-danger text-light'}`}
                    >
                      {cartCount}
                    </span>
                  </button>
                </li>
              </ul>
            )}
            <button
              className="btn btn-transparent text-light font-monospace d-block d-sm-none position-absolute end-0 top-0 mt-4"
              type="button"
              data-bs-toggle={cartIsEmpty ? '' : 'modal'}
              data-bs-target="#cart"
            >
              Cart
              <span
                className={`badge rounded-pill ms-2 text-center ${cartIsEmpty ? 'bg-light text-dark' : 'bg-danger text-light'}`}
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
	    </header>

		  <Outlet />
		</div>
  );
}
