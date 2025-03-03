import React from 'react';
import { Link, useLocation  } from "react-router-dom";
import { useSelector } from 'react-redux'
import { GlobalStore } from '../store';
import User from '../models/User';
import Logo from '../img/logo-stay-a-while.png';

export default (): JSX.Element => {

  const user = useSelector<GlobalStore, User | null>(store => store.user);

  function hideNavBar() {
    ($('#navbarText') as any).collapse('hide');
  }

  function toggleNavBar() {
    ($('#navbarText') as any).collapse('toggle');
  }

  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark blue">
      <span onClick={hideNavBar}>
        <Link className="navbar-brand" to="/"><img src={Logo} width="160" /></Link>
      </span>
      <button className="navbar-toggler" type="button"onClick={toggleNavBar} aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className={'nav-item' + (location.pathname === '/' ? ' active' : '')} onClick={hideNavBar}>
            <Link className="nav-link" to="/">
              Home
              {location.pathname === '/' ? <span className="sr-only">(current)</span> : null}
            </Link>
          </li>
          <li className={'nav-item' + (location.pathname === '/About' ? ' active' : '')} onClick={hideNavBar}>
            <Link className="nav-link" to="/About">
              About
              {location.pathname === '/About' ? <span className="sr-only">(current)</span> : null}
            </Link>
          </li>
          <li className={'nav-item' + (location.pathname === '/Help' ? ' active' : '')} onClick={hideNavBar}>
            <Link className="nav-link" to="/Help">
              Help
              {location.pathname === '/Help' ? <span className="sr-only">(current)</span> : null}
            </Link>
          </li>
          {user === null || (!user.isAdministrator && !user.isTeacher())
            ? null
            : <li className={'nav-item' + (location.pathname === '/Administration' ? ' active' : '')} onClick={hideNavBar}>
                <Link className="nav-link" to="/Administration">
                  Administration
                  {location.pathname === '/Administration' ? <span className="sr-only">(current)</span> : null}
                </Link>
              </li>}
          {user === null || (!user.isAdministrator && !user.isTeacher())
            ? null
            : <li className={'nav-item' + (location.pathname === '/Statistics' ? ' active' : '')} onClick={hideNavBar}>
                <Link className="nav-link" to="/Statistics">
                  Statistics
                  {location.pathname === '/Statistics' ? <span className="sr-only">(current)</span> : null}
                </Link>
              </li>}
        </ul>
        <hr className="d-lg-none" />
        <ul className="navbar-nav ml-auto">
          {user === null
            ? <li
                className={'nav-item' + (location.pathname === '/MockLogin' ? ' active' : '')}
                onClick={() => localStorage.setItem('LastVisitedUrl', window.location.pathname)}>
                <a className="nav-link" href={`https://queue.csc.kth.se/login`}>
                  Login
                  {location.pathname === '/MockLogin' ? <span className="sr-only">(current)</span> : null}
                </a>
              </li>
            : <>
                <span className="navbar-text">
                  {user.name}
                </span>
                <li className={'nav-item' + (location.pathname === '/Logout' ? ' active' : '')} onClick={hideNavBar}>
                  <Link className="nav-link yellow-text" to="/Logout">
                    Logout
                    {location.pathname === '/Logout' ? <span className="sr-only">(current)</span> : null}
                  </Link>
                </li>
              </>}
        </ul>
      </div>
    </nav>
  );
};
