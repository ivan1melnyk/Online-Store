import React, { useContext } from "react";
import { authContext } from "../store/AuthProvider";
import DeviceItem from "../components/DeviceItem";

const Basket = () => {
  const {
    basket,
    removeDeviceFromBasket,
    quantity_of_goods,
    oneGoodMore,
    oneGoodLess,
  } = useContext(authContext);

  if (!basket || basket.length === 0) {
    return (
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <h2>Your basket is empty</h2>
      </div>
    );
  }

  const total_sum = basket.reduce(
    (sum, device) =>
      sum + device.price * quantity_of_goods[basket.indexOf(device)],
    0
  );

  return (
    <div className="container">
      <div class="row justify-content-md-center">
        <div className="col-8">
          <h2 className="mt-3">Your Basket</h2>
          <div className="row d-flex">
            {basket.map((device) => (
              <DeviceItem
                key={device.id}
                device={device}
                onRemove={removeDeviceFromBasket}
              />
            ))}
          </div>
        </div>
        <div className="col-4 text-dark">
          <div className="border border-dark rounded-3 p-3">
            {basket.map((device) => (
              <div key={device.id} className="row mb-2 align-items-center">
                <div className="col-1 text-start p-0">
                  <button
                    className="btn btn-sm btn-outline-secondary py-0 px-2"
                    onClick={() => oneGoodMore(basket.indexOf(device))}
                  >
                    +
                  </button>
                </div>
                <div className="col-1 text-start p-0">
                  <button
                    className="btn btn-sm btn-outline-secondary py-0 px-2"
                    onClick={() => oneGoodLess(basket.indexOf(device))}
                  >
                    -
                  </button>
                </div>
                <div className="col-6 text-start">
                  {quantity_of_goods[basket.indexOf(device)]} x {device.name}
                </div>
                <div className="col-4 text-end">
                  {quantity_of_goods[basket.indexOf(device)] * device.price}
                </div>
              </div>
            ))}
            <hr />
            <div className="row">
              <div className="col-8 text-start fw-bold">Total sum</div>
              <div className="col-4 text-end fw-bold">{total_sum}$</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
