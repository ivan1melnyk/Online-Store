import React from "react";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";

const Shop = () => {
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-2">
          <TypeBar />
        </div>
        <div className="col">
          <BrandBar />
          <DeviceList />
        </div>
      </div>
    </div>
  );
};

export default Shop;
