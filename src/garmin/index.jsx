import React from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { pages } from './store';

const Garmin = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const getPageTitle = () => {
    const results = pages.filter(({ path }) => path === location.pathname);

    return results.length > 0 ? results[0].title : '';
  };

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
		  <header className="mb-auto">
		    <div>
		      <h3 className="float-md-start mb-0 my-logo" onClick={() => navigate('/garmin')}>
            acrossthekyle
          </h3>

		      <nav className="nav nav-masthead justify-content-center float-md-end">
		      	{pages.map(({ key, name, path }) => {
              if (key === 'home') {
                return null;
              }

		      		return (
                <a
                  className={`nav-link ${path === location.pathname ? 'active' : ''}`}
                  href={path}
                  key={key}
                >
                  {name}
                </a>
              );
		      	})}
		      </nav>
		    </div>
		  </header>

		  <main className="px-3">
        <h1 className="pb-4 mt-4">{getPageTitle()}</h1>

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

export default Garmin;
