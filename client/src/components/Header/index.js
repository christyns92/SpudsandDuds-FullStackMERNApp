import React from 'react';
import { Link } from 'react-router-dom';
import Col from "../Col";
import Card from "../Card";
import Auth from '../../utils/auth';
import { Button } from '@material-ui/core';
import SearchBar from '../SearchBar'




const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-center-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Spuds & Duds</h1>
          </Link>
          <p className="m-0">What's a potato's favorite horror movie?  The Silence of the Yams</p>
        </div>
       
      </div>
      <div className="container flex-row justify-center-lg justify-center align-center">
      <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
        </div>
    </header>
  );
};

export default Header;
