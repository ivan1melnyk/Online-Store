import React, { useContext, useState } from "react";
import { Context } from "../../index";

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
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
            <h5 className="modal-title">Add new Type</h5>
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
                  Choose the type of device
                </button>
                <ul class="dropdown-menu">
                  {device.types.map((type) => (
                    <li>
                      <a class="dropdown-item" key={type.id} href="#">
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
                  Choose the brand of device
                </button>
                <ul class="dropdown-menu">
                  {device.brands.map((brand) => (
                    <li>
                      <a class="dropdown-item" key={brand.id} href="#">
                        {brand.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <input
                className="form-control mt-3"
                placeholder="Write the name of device"
              />
              <input
                className="form-control mt-3"
                placeholder="Write the price of device"
                type="number"
              />
              <input className="form-control mt-3" type="file" />
            </form>
            <hr />
            <button className="btn btn-outline-dark" onClick={addInfo}>
              Add new character
            </button>
            {info.map((i) => (
              <div className="row mt-3" key={i.number}>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Write name of character"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Write description of character"
                  />
                </div>
                <div className="col-md-4">
                  <button
                    className="btn btn-outline-denger"
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
            <button type="button" className="btn btn-primary" onClick={onHide}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDevice;
