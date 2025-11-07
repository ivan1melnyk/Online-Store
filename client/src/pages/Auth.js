import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
//import Card from "react-bootstrap/Card";

const Auth = () => {
  const location = useLocation();
  console.log(location);
  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 24 }}
    >
      <div className="Card border p-5" style={{ width: 600 }}>
        <h2 className="ml-50">{isLogin ? "Authorization" : "Registration"}</h2>
        <form className="d-flex flex-column ">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Type your email"
            />
          </div>
          <div class="col-auto">
            <label for="inputPassword6" class="col-form-label">
              Password
            </label>
          </div>
          <div class="col-auto">
            <input
              type="password"
              id="inputPassword6"
              class="form-control"
              aria-describedby="passwordHelpInline"
              placeholder="Type your password ..."
            />
          </div>
          <div className="row d-flex justify-content-between mt-3 pl-1 pr-1">
            {isLogin ? (
              <div class="col">
                No Account?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
              </div>
            ) : (
              <div class="col-sm-8">
                Do you have an Account?{" "}
                <NavLink to={LOGIN_ROUTE}>Login</NavLink>
              </div>
            )}
            {isLogin ? (
              <div class="col col-lg-2">
                <button
                  type="button"
                  className="btn btn-outline-dark align-self-end"
                >
                  Login
                </button>
              </div>
            ) : (
              <div class="col-sm-3">
                <button
                  type="button"
                  className="btn btn-outline-dark align-self-end"
                >
                  Registration
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
