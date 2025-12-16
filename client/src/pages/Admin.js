import React, { useState, useContext } from "react";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import Delete from "../components/modals/Delete"; // Corrected import path
import { deviceContext } from "../store/DeviceProvider";
import {
  deleteType,
  fetchTypes,
  deleteBrand,
  fetchBrands,
} from "../http/deviceAPI";

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
  const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);
  const deviceCtx = useContext(deviceContext);

  console.log("RENDER ADMIN");

  return (
    <div className="container d-flex flex-column mt-5">
      <div className="row">
        <button
          className="btn btn-outline-dark col-8 mx-2 p-2"
          onClick={() => setTypeVisible(true)}
        >
          Add Type
        </button>
        <button
          className="btn btn-outline-danger col-3 "
          onClick={() => setDeleteTypeVisible(true)}
        >
          Delete Type
        </button>
      </div>
      <div className="row mt-4">
        <button
          className="btn btn-outline-dark col-8 mx-2 p-2"
          onClick={() => setBrandVisible(true)}
        >
          Add Brand
        </button>
        <button
          className="btn btn-outline-danger col-3 p-2 ml-3"
          onClick={() => setDeleteBrandVisible(true)}
        >
          Delete Brand
        </button>
      </div>
      <div className="row mt-4">
        <button
          className="btn btn-outline-dark col-8 mx-2 p-2"
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
      <Delete
        show={deleteTypeVisible}
        onHide={() => setDeleteTypeVisible(false)}
        title="Delete Type"
        options={deviceCtx.types}
        onDelete={async (selected) => {
          await deleteType(selected.id);
          const data = await fetchTypes();
          deviceCtx.setTypes(data);
        }}
        validation={(selected) => {
          if (deviceCtx.devices.some((d) => d.typeId === selected.id)) {
            return "Cannot delete type. It may be associated with existing devices.";
          }
          return null;
        }}
      />
      <Delete
        show={deleteBrandVisible}
        onHide={() => setDeleteBrandVisible(false)}
        title="Delete Brand"
        options={deviceCtx.brands}
        onDelete={async (selected) => {
          await deleteBrand(selected.id); // Assuming deleteBrand exists
          const data = await fetchBrands();
          deviceCtx.setBrands(data);
        }}
        validation={(selected) => {
          if (deviceCtx.devices.some((d) => d.brandId === selected.id)) {
            return "Cannot delete brand. It may be associated with existing devices.";
          }
          return null;
        }}
      />
    </div>
  );
};

export default Admin;
