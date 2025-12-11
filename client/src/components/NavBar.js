import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { logout } from "../http/userAPI";
import { authContext } from "../store/AuthProvider";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";

const NavBar = () => {
  const navigator = useNavigate();
  const authCtx = useContext(authContext);

  const logOut = async () => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAA");
    authCtx.setUser({});
    console.log("BBBBBBBBBBBBBBBBBBBBBBB", authCtx.user);
    authCtx.setIsAuth(false);
    await logout();
    console.log("CCCCCCCCCCCCCCCCCCCCCCC", authCtx.isAuth);
  };

  return (
    <nav
      className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href={SHOP_ROUTE}>
          Home
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">
              Payment
            </a>
            <a className="nav-link" href="#">
              Delivery
            </a>
            <a className="nav-link" href="#">
              Contacts
            </a>
            <div className="text-nowrap">
              <a className="nav-link" href="#">
                About Us
              </a>
            </div>
          </div>
        </div>
        <div className="container">
          ()
          {authCtx.isAuth ? (
              <ul className="nav justify-content-end">
              <button
                className="btn btn-light mx-2"
                onClick={async () => {
                  navigator(BASKET_ROUTE);
                }}
              >
                Basket
              </button>
              <button
                // type="button"
                className="btn btn-outline-light mx-2"
                onClick={async () => {
                  navigator(ADMIN_ROUTE);
                }}
              >
                Admin panel
              </button>
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={async () => await logOut()}
              >
                Logout
              </button>
            </ul>
          ) : (
            <ul className="nav justify-content-end">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => navigator(LOGIN_ROUTE)}
              >
                Authorization
              </button>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
