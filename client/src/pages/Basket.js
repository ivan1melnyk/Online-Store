import React, { useContext } from "react";
import { authContext } from "../store/AuthProvider";
import DeviceItem from "../components/DeviceItem";

const Basket = () => {
  const { basket, removeDeviceFromBasket } = useContext(authContext);

  if (!basket || basket.length === 0) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{height: '80vh'}}>
        <h2>Your basket is empty</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mt-3">Your Basket</h2>
      <div className="row d-flex">
        {basket.map(device => (
          <DeviceItem
            key={device.id}
            device={device}
            onRemove={removeDeviceFromBasket}
          />
        ))}
      </div>
    </div>
  );
};

export default Basket;
