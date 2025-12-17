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

const CreateDevice = ({
  show,
  onHide,
  isUpdate = false,
  deviceToEdit = null,
}) => {
  const deviceCtx = useContext(deviceContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => deviceCtx.setTypes(data));
    fetchBrands().then((data) => deviceCtx.setBrands(data));
  }, []);

  useEffect(() => {
    const isCreate = !isUpdate;
    if (isUpdate && deviceToEdit) {
      setName(deviceToEdit.name);
      setPrice(deviceToEdit.price);
      setInfo(deviceToEdit.info.map((i) => ({ ...i, localId: i.id }))); // existing info from DB (must include id)
    } else if (isCreate) {
      setName("");
      setPrice(0);
      setInfo([]);
    }
  }, [isUpdate, deviceToEdit]);

  // localId is as well 1765916205612 - Date.now()
  // as                  1, 4, 6, 24  - id of db object
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", localId: Date.now() }]);
  };

  const removeInfo = (item) => {
    setInfo(info.filter((i) => i.localId !== item.localId));
  };

  const changeInfo = (key, value, localIdArg) => {
    setInfo(
      info.map((i) => (i.localId === localIdArg ? { ...i, [key]: value } : i))
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

    if (name) formData.append("name", name);
    if (price > 0) formData.append("price", price);
    if (file) formData.append("img", file);
    if (deviceCtx.selectedBrand.id)
      formData.append("brandId", deviceCtx.selectedBrand.id);
    if (deviceCtx.selectedType.id)
      formData.append("typeId", deviceCtx.selectedType.id);

    if (info.length > 0) {
      const infoWithoutLocalId = info.map(({ localId: _, ...i }) => i);
      formData.append("info", JSON.stringify(infoWithoutLocalId));
    }

    updateDevice(id, formData).then(() => {
      fetchDevices().then((data) => {
        deviceCtx.setDevices(data);

        console.log("REFRESHED DEVICES AFTER UPDATE: fetchDevices", data);
      });
      onHide();
    });
    window.location.reload();
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
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {deviceCtx.selectedType.name || "Choose the type of device"}
                </button>
                <ul className="dropdown-menu">
                  {(deviceCtx.types || []).map((type) => (
                    <li>
                      <a
                        className="dropdown-item"
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
              <div className="dropdown mt-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {deviceCtx.selectedBrand.name || "Choose the brand of device"}
                </button>
                <ul className="dropdown-menu">
                  {(deviceCtx.brands || []).map((brand) => (
                    <li>
                      <a
                        className="dropdown-item"
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
              <div className="row mt-3" key={i.localId}>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    value={i.title}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, i.localId)
                    }
                    placeholder="Write name of character"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    value={i.description}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, i.localId)
                    }
                    placeholder="Write description of character"
                  />
                </div>
                <div className="col-md-4">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeInfo(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {/* {isUpdate && (
            <>
              <hr />
            <button className="btn btn-outline-danger" onClick={addInfo}>
              Add new character
            </button>

              {delInfo.length === 0 && (
                <div className="text-muted">No deleted characteristics</div>
              )}

              {delInfo.map((id) => (
                <div key={id} className="text-danger">
                  Characteristic ID {id} will be deleted
                </div>
              ))}
            </>
          )} */}
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
                onClick={() => editDevice(deviceToEdit.id)}
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
