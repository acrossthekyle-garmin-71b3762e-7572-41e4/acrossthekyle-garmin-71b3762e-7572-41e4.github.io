import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { onLoaded } from '../../store/garmin/actions';
import { Cart } from './Cart';
import * as utils from './utils';

const axios = require('axios').default;

const pages = [
  {
    name: 'Browse',
    key: '/garmin',
    path: '/garmin',
    external: false
  },
  {
    name: 'Donate',
    key: 'donate',
    path: 'https://www.buymeacoffee.com/acrossthekyle',
    external: true
  },
  {
    name: 'Help',
    key: 'help',
    path: '/garmin/help',
    external: false
  }
];

export const Container = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const products = useSelector(state => state.garmin.products);
  const loaded = useSelector(state => state.garmin.loaded);
  const cart = useSelector(state => state.garmin.cart);

  useEffect(() => {
    if (products === undefined) {
      axios.get('/api/garmin/browse').then((response) => {
        dispatch(onLoaded(response.data));
      });
    }
  }, [products, dispatch]);

  const cartCount = utils.getCartCount(cart);

  const clientId = (process.env.NODE_ENV === 'development' ? 'Abny9Qva83EbxXxthpqaTYHifJGptx73dZX6uWh-z8UDaF-xK8g5sPkSz59_YR4Bwy696QjpQ5-r5meb' : 'AfukE7xeOHI3Qh5RGage7d9BYnxG0NHw_WEq0H_aoTRfEDMjOdRVAj7EpoyVQfSaoDDDGBuqqV02jEUu');

  if (loaded === false) {
    return (
      <div className="my-loader bg-dark">
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
          <div className="col-12 col-sm-4 d-flex justify-content-sm-start">
    	      <button
              className="btn btn-transparent mb-3 mt-0 pt-0 mb-md-0 me-md-auto text-light text-decoration-none mt-1 fs-4 font-monospace"
              onClick={() => navigate('/garmin')}
              type="button"
            >
    	        acrossthekyle
    	      </button>
          </div>
          <div className="col-12 col-sm-8 d-flex justify-content-center justify-content-sm-end">
            {(!location.pathname.includes('success') && !location.pathname.includes('error')) && (
              <ul className="nav">
                {pages.map(({ external, key, name, path }) => (
                  <li key={key} className="nav-item font-monospace">
                    <a
                      className={`btn btn-transparent ${location.pathname === path ? 'text-secondary' : 'text-light'}`}
                      href={`${external ? '' : '#'}${path}`}
                      target={external ? '_blank' : '_self'}
                      rel="noreferrer"
                    >
                      {name}
                    </a>
                  </li>
                ))}
                <li className="nav-item font-monospace">
                  <button
                    className="btn btn-transparent text-light"
                    type="button"
                    data-bs-toggle={cartCount === 0 ? '' : 'modal'}
                    data-bs-target="#cart"
                  >
                    Cart
                    <span
                      className={`badge rounded-pill ms-2 text-center ${cartCount > 0 ? 'bg-danger text-light' : 'bg-light text-dark'}`}
                    >
                      {cartCount}
                    </span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
	    </header>

		  <Outlet />
		</div>
  );
}
