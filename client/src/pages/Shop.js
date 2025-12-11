import React, { useContext, useEffect } from "react";
import { deviceContext } from "../store/DeviceProvider";

import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import TypeBar from "../components/TypeBar";
import Pages from "../components/Pages";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

const Shop = () => {
  const deviceCtx = useContext(deviceContext);

  useEffect(() => {
    fetchTypes().then((data) => deviceCtx.setTypes(data));
    fetchBrands().then((data) => deviceCtx.setBrands(data));
    fetchDevices(null, null, 1, 8).then((data) => {
      deviceCtx.setDevices(data.rows);
      deviceCtx.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      deviceCtx.selectedType.id,
      deviceCtx.selectedBrand.id,
      deviceCtx.page,
      8
    ).then((data) => {
      deviceCtx.setDevices(data.rows);
      deviceCtx.setTotalCount(data.count);
    });
  }, [deviceCtx.page, deviceCtx.selectedType.id, deviceCtx.selectedBrand.id]);

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-2">
          <TypeBar />
        </div>
        <div className="col">
          <BrandBar />
          <DeviceList />
          <Pages />
        </div>
      </div>
    </div>
  );
};

export default Shop;
