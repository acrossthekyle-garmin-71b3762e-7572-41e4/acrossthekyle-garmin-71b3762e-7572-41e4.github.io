import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { onLoaded } from '../../store/garmin/actions';

const axios = require('axios').default;

const pages = [
  {
    name: 'Apps',
    title: 'Apps',
    key: 'apps',
    path: '/garmin/apps'
  },
  {
    name: 'Purchase',
    title: 'Purchase a Code',
    key: 'purchase',
    path: '/garmin/purchase'
  },
  {
    name: 'Donate',
    title: 'Support My Work',
    key: 'donate',
    path: '/garmin/donate'
  },
  {
    name: 'Help',
    title: 'Help',
    key: 'help',
    path: '/garmin/help'
  }
];

export const Container = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const products = useSelector(state => state.garmin.products);
  const loaded = useSelector(state => state.garmin.loaded);

  useEffect(() => {
    if (products === undefined) {
      axios.get('/api/garmin/browse').then((response) => {
        dispatch(onLoaded(response.data));
      });
    }
  }, [products, dispatch]);

  const getPageTitle = () => {
    const results = pages.filter(({ path }) => path === location.pathname);

    return results.length > 0 ? results[0].title : '';
  };

  const title = getPageTitle();

  if (loaded === false) {
    return (
      <div className="my-loader bg-dark">
        <div className="d-flex justify-content-center align-items-center">
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
    <div
      className="cover-container d-flex w-100 h-100 p-3 pb-0 mx-auto flex-column"
    >
		  <header className="mb-sm-auto">
		    <div>
		      <h3
            className="float-md-start mb-0 my-logo"
            onClick={() => navigate('/garmin')}
          >
            acrossthekyle
          </h3>

		      <nav className="nav nav-masthead justify-content-center float-md-end">
		      	{pages.map(({ key, name, path }) => {
              return (
                <a
                  className={`nav-link ${location.pathname.includes(path) ? 'active' : ''}`}
                  href={`#${path}`}
                  key={key}
                >
                  {name}
                </a>
              );
		      	})}
		      </nav>
		    </div>
		  </header>

		  <main className="px-sm-3">
        {title !== '' && <h1 className="pb-4 mt-4">{title}</h1>}

        <Outlet />
      </main>

		  <footer className="mt-auto text-white-50">
		    <p className="d-block d-xs-block" />
        <p className="d-none d-sm-block">
          Official store page can be found <a href="https://apps.garmin.com/en-US/developer/f796f8e5-5034-44c2-99a7-21d319c6c728/apps" className="text-white">here</a>.
        </p>
		  </footer>
		</div>
  );
}
