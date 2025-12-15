import React, { useState } from "react";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import DeleteType from "../components/modals/DeleteType";

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);

  console.log("RENDER ADMIN");

  return (
    <div className="container d-flex flex-column mt-5">
      <div className="row">
        <button
          className="btn btn-outline-dark col-8 p-2"
          onClick={() => setTypeVisible(true)}
        >
          Add Type
        </button>
        <button
          className="btn btn-outline-danger col-4 p-2"
          onClick={() => setDeleteTypeVisible(true)}
        >
          Delete Type
        </button>
      </div>

      <div className="row mt-4">
        <button
          className="btn btn-outline-dark col-8 p-2"
          onClick={() => setBrandVisible(true)}
        >
          Add Brand
        </button>
        <button
          className="btn btn-outline-danger col-4 p-2"
          //onClick={() => setBrandVisible(true)}
        >
          Delete Brand
        </button>
      </div>
      <div className="row mt-4">
        <button
          className="btn btn-outline-dark col-8 p-2"
          onClick={() => setDeviceVisible(true)}
        >
          Add Device
        </button>
      </div>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      {deviceVisible && (
        <CreateDevice
          show={deviceVisible}
          onHide={() => setDeviceVisible(false)}
        />
      )}
      <DeleteType
        show={deleteTypeVisible}
        onHide={() => setDeleteTypeVisible(false)}
      />
    </div>
  );
};

export default Admin;
