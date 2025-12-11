import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check } from "./http/userAPI";
import { authContext } from "./store/AuthProvider";

const App = () => {
  const authCtx = useContext(authContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Additional check
  useEffect(() => {
    check()
      .then((data) => {
        authCtx.setUser((prev) => ({ ...prev, ...data }));
        authCtx.setIsAuth(true);
      })
      .catch((error) => {
        console.error("Auth check failed:", error);
        setError(error.message);
        // User is not authenticated, continue without setting auth
      })
      .finally(() => setLoading(false));
  }, [authCtx.user, authCtx.isAuth]);

  if (loading) {
    return <div className="spinner-border">Loading...</div>;
  }

  if (error) {
    console.log("Auth error, but continuing:", error);
    console.log("UUUUUUUUUUUUUUUUUUU");
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
