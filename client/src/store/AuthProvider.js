import { useState, createContext, useEffect } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState(() => {
    try {
      const storedBasket = localStorage.getItem("basket");
      return storedBasket ? JSON.parse(storedBasket) : [];
    } catch (e) {
      console.error("Failed to parse basket from localStorage", e);
      return [];
    }
  });
 
  useEffect(() => {
    // Persist basket to localStorage whenever it changes
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);
 
  const logOut = () => {
    setUser(null);       // use null instead of {}
    setIsAuth(false);
  };

  const addDeviceToBasket = (device) => {
    console.log("addDeviceToBasket", device);
    setBasket(prev => {
      const inBasket = prev.find(item => item.id === device.id);
      if (inBasket) {
          // To prevent duplicates, just return the previous state.
          // If you want to handle quantity, you could map and update the item here.
          return prev;
      }
      return [...prev, device];
    });
  };

  const removeDeviceFromBasket = (deviceId) => {
    setBasket((prev) => prev.filter((item) => item.id !== deviceId));
  };
 
  return (
    <authContext.Provider
      value={{
        isAuth,
        setIsAuth,

        user,
        setUser,
        logOut, // expose logout from context
        
        basket,
        setBasket,
        addDeviceToBasket,
        removeDeviceFromBasket,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
