import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { authRoutes, publicRoutes } from "../routes";
import { authContext } from "../store/AuthProvider";
import { SHOP_ROUTE } from "../utils/consts";

const AppRouter = () => {
  const authCtx = useContext(authContext);

  return (
    <Routes>
      {authCtx.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
