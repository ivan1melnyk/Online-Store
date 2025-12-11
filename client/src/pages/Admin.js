import React, { useState } from "react";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  console.log("RENDER ADMIN");

  return (
    <div className="container d-flex flex-column mt-5">
      <button
        className="btn btn-outline-dark mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Add Type
      </button>
      <button
        className="btn btn-outline-dark mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Add Brand
      </button>
      <button
        className="btn btn-outline-dark mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Add Device
      </button>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      {deviceVisible && (
        <CreateDevice
          show={deviceVisible}
          onHide={() => setDeviceVisible(false)}
        />
      )}
    </div>
  );
};

export default Admin;
