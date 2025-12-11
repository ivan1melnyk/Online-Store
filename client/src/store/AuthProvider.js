import { useState, createContext } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const logOut = () => {
    setUser(null);       // use null instead of {}
    setIsAuth(false);
  };

  return (
    <authContext.Provider
      value={{
        isAuth,
        user,
        setUser,
        setIsAuth,
        logOut, // expose logout from context
      }}
    >
      {children}
    </authContext.Provider>
  );
};

