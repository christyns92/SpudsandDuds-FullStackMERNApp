import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
// import { Button } from '@material-ui/core';


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className=" text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-center-lg justify-center align-center">
        <div className="justify-center-lg justify-center align-center">
       
          <Link className="text-light justify-center align-center text-align-center" to="/">
            <h1 className="m-0">&#129364;  Spuds and Duds &#129364;</h1>
          </Link>
           
          <br></br>
          <h3 className="m-0">Was the movie a Spud or a Dud? Share your review!</h3>
        </div>
       
      </div>
      <div className="container flex-row justify-center-lg justify-center align-center">
      <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/">
                Home
              </Link>
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
