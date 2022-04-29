import React from 'react';
import { useNavigate } from "react-router-dom";

import ExternalLinkIcon from '../../images/link.svg';
import Me from '../../images/me.jpg';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center font-monospace h-100 flex-column">
      <img src={Me} className="rounded-circle mb-4 me" alt="" />
      <h1 aria-hidden="true">@acrossthekyle</h1>
      <p className="mt-4 w-75">
        Hello! My name is Kyle. I'm an avid <a href="https://instagram.com/acrossthekyle" className="link-light text-decoration-none" target="_blank" rel="noreferrer"><span className="text-decoration-underline">hiker</span> <img src={ExternalLinkIcon} className="external-link-icon" alt="" /></a>,
        and developer, who has thru-hiked the Camino de Santiago, Alta Via, and Annapurna Circuit, to name a few. When I'm not hiking or
        developing React applications I am probably creating <button type="button" className="btn btn-transparent text-light p-0 text-decoration-underline" role="link" onClick={() => navigate('garmin')}>Garmin</button> watch
        apps.
      </p>
		</div>
  );
}
