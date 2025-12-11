import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { registration, login } from "../http/userAPI";
import { authContext } from "../store/AuthProvider";

const Auth = () => {
  const authCtx = useContext(authContext);

  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // ✅ store error message

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      authCtx.setUser((prev) => ({ ...prev, ...data }));
      authCtx.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      const message = e.response?.data?.message || e.message || "Unknown error";
      setError(message); // ✅ trigger modal
      console.error("Error:", message);
    }
  };

  const closeModal = () => setError(null);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 24 }}
    >
      <div className="card border p-5" style={{ width: 600 }}>
        <h2 className="mb-4">{isLogin ? "Authorization" : "Registration"}</h2>

        <form className="d-flex flex-column">
          <div className="mb-4">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control mt-2"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Type your password ..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="row d-flex justify-content-between mt-3">
            {isLogin ? (
              <div className="col">
                No Account?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
              </div>
            ) : (
              <div className="col">
                Do you have an Account?{" "}
                <NavLink to={LOGIN_ROUTE}>Login</NavLink>
              </div>
            )}

            <div className="col-auto">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={click}
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ✅ Conditional modal */}
      {error && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Error</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
