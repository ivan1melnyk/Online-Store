import { useState, createContext, useEffect } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false); // Initial authentication state
  const [user, setUser] = useState(null); // User object, null if not authenticated
  const [isAdmin, setIsAdmin] = useState(false); // Admin status, derived from user role
  const [quantity_of_goods, setQuantityOfGoods] = useState(() => {
    try {
      const storedBasket = localStorage.getItem("quantity_of_goods");
      return storedBasket ? JSON.parse(storedBasket) : [];
    } catch (e) {
      console.error("Failed to parse quantity_of_goods from localStorage", e);
      return [];
    }
  });
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
  useEffect(() => {
    setIsAdmin(user && user.role === "ADMIN");
  }, [user]);

  useEffect(() => {
    const quantityOfGoods = JSON.parse(
      localStorage.getItem("quantity_of_goods")
    );
    if (quantityOfGoods && quantityOfGoods.length > 0) {
      setQuantityOfGoods(quantityOfGoods);
    } else {
      setQuantityOfGoods(new Array(basket.length).fill(1));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "quantity_of_goods",
      JSON.stringify(quantity_of_goods)
    );
  }, [quantity_of_goods]);

  const logOut = () => {
    setUser(null); // use null instead of {}
    setIsAuth(false);
  };

  const oneGoodMore = (index) => {
    setQuantityOfGoods((prev) => {
      const newQuantity = [...prev];
      newQuantity[index]++;
      return newQuantity;
    });
  };

  const oneGoodLess = (index) => {
    setQuantityOfGoods((prev) => {
      const newQuantity = [...prev];
      if (newQuantity[index] === 1) {
        return newQuantity;
      }
      newQuantity[index]--;
      return newQuantity;
    });
  };

  const addDeviceToBasket = (device) => {
    console.log("addDeviceToBasket", device);
    setBasket((prev) => {
      const inBasket = prev.find((item) => item.id === device.id);
      if (inBasket) {
        // To prevent duplicates, just return the previous state.
        // If you want to handle quantity, you could map and update the item here.
        return prev;
      }
      setQuantityOfGoods((prev) => [...prev, 1]);
      return [...prev, device];
    });
  };

  const removeDeviceFromBasket = (deviceId) => {
    const to_remove_elem_index = basket.findIndex(
      (item) => item.id === deviceId
    );
    setBasket((prev) => prev.filter((item) => item.id !== deviceId));
    console.log(to_remove_elem_index);
    setQuantityOfGoods((prev) =>
      prev.filter((_, index) => index !== to_remove_elem_index)
    );
    localStorage.setItem(
      "quantity_of_goods",
      JSON.stringify(quantity_of_goods)
    );
  };

  return (
    <authContext.Provider
      value={{
        isAuth,
        setIsAuth,

        user,
        setUser,
        isAdmin, // Expose isAdmin
        logOut, // expose logout from context

        quantity_of_goods,
        setQuantityOfGoods,
        oneGoodMore,
        oneGoodLess,

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
