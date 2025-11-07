import React, { useContext } from "react";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const navigator = useNavigate();
  const { user } = useContext(Context);
  return (
    <nav
      className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href={SHOP_ROUTE}>
          Motion
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">
              Home
            </a>
            <a className="nav-link" href="#">
              Features
            </a>
            <a className="nav-link" href="#">
              Pricing
            </a>
          </div>
        </div>
        <div className="container">
          {user.isAuth ? (
            <ul className="nav justify-content-end">
              <button
                type="button"
                className="btn btn-outline-light mx-2"
                onClick={() => navigator(ADMIN_ROUTE)}
              >
                Admin panel
              </button>
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => navigator(LOGIN_ROUTE)}
              >
                Login{" "}
              </button>
            </ul>
          ) : (
            <ul class="nav justify-content-end">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => user.setIsAuth(true)}
              >
                Registration
              </button>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
});

export default NavBar;
