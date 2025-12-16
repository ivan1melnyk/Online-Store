import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../index";
import { deviceContext } from "../../store/DeviceProvider";
import {
  createDevice,
  fetchDevices,
  fetchTypes,
  fetchBrands,
  updateDevice,
} from "../../http/deviceAPI";
import e from "cors";

const CreateDevice = ({ show, onHide, isUpdate = false, to_edit_id = 0 }) => {
  const deviceCtx = useContext(deviceContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => deviceCtx.setTypes(data));
    fetchBrands().then((data) => deviceCtx.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    if (
      !name ||
      !price ||
      !file ||
      !deviceCtx.selectedBrand.id ||
      !deviceCtx.selectedType.id
    ) {
      alert(
        "Please fill in all required fields: Name, Price, Image, Type, and Brand."
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("img", file);
    formData.append("brandId", deviceCtx.selectedBrand.id);
    formData.append("typeId", deviceCtx.selectedType.id);
    if (info.length > 0) {
      formData.append("info", JSON.stringify(info));
    }

    createDevice(formData).then((data) => {
      fetchDevices().then((data) => deviceCtx.setDevices(data));
      onHide();
    });
  };

  const editDevice = (id) => {
    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    }
    if (price > 0) {
      const priceString = JSON.stringify(price);
      formData.append("price", priceString);
    }
    if (file) {
      formData.append("img", file);
    }
    if (deviceCtx.selectedBrand.id) {
      formData.append("brandId", deviceCtx.selectedBrand.id);
    }
    if (deviceCtx.selectedType.id) {
      formData.append("typeId", deviceCtx.selectedType.id);
    }
    if (info.length > 0) {
      formData.append("info", JSON.stringify(info));
    }
    updateDevice(id, formData).then((data) => {
      fetchDevices().then((data) => deviceCtx.setDevices(data));
      onHide();
    });
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      tabIndex="-1"
      style={{
        display: show ? "block" : "none",
        backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent",
      }}
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {isUpdate ? (
              <h5 className="modal-title">Edit Device</h5>
            ) : (
              <h5 className="modal-title">Add new Device</h5>
            )}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onHide}
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {deviceCtx.selectedType.name || "Choose the type of device"}
                </button>
                <ul class="dropdown-menu">
                  {(deviceCtx.types || []).map((type) => (
                    <li>
                      <a
                        class="dropdown-item"
                        onClick={() => deviceCtx.setSelectedType(type)}
                        key={type.id}
                        href="#"
                      >
                        {type.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div class="dropdown mt-3">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {deviceCtx.selectedBrand.name || "Choose the brand of device"}
                </button>
                <ul class="dropdown-menu">
                  {(deviceCtx.brands || []).map((brand) => (
                    <li>
                      <a
                        class="dropdown-item"
                        onClick={() => deviceCtx.setSelectedBrand(brand)}
                        key={brand.id}
                        href="#"
                      >
                        {brand.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mt-3"
                placeholder="Write the name of device"
              />
              <input
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="form-control mt-3"
                placeholder="Write the price of device"
                type="number"
              />
              <input
                className="form-control mt-3"
                type="file"
                onChange={selectFile}
              />
            </form>
            <hr />
            <button className="btn btn-outline-dark" onClick={addInfo}>
              Add new character
            </button>
            {(info || []).map((i) => (
              <div className="row mt-3" key={i.number}>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    value={i.title}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, i.number)
                    }
                    placeholder="Write name of character"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    value={i.description}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, i.number)
                    }
                    placeholder="Write description of character"
                  />
                </div>
                <div className="col-md-4">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeInfo(i.number)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Close
            </button>
            {isUpdate ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => editDevice(to_edit_id)}
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={addDevice}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDevice;
