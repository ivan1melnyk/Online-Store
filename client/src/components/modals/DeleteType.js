import React, { useState, useContext, useEffect } from "react";
import { deleteType, fetchTypes } from "../../http/deviceAPI";
import { deviceContext } from "../../store/DeviceProvider";

const DeleteType = ({ show, onHide }) => {
  const deviceCtx = useContext(deviceContext);
  const [value, setValue] = useState("");
  const [type, setType] = useState(null);

  const removeType = (type) => {
    deleteType(type.id).then(() => {
      fetchTypes().then((data) => deviceCtx.setTypes(data));
      setValue("");
      setType(null);
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
            <h5 className="modal-title">Delete a Type</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onHide}
            ></button>
          </div>

          <div className="modal-body">
            <div className="btn-group">
              <div className="dropdown">
                <button
                  className="btn btn-danger dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {value || "Choose type to delete"}
                </button>
                <ul class="dropdown-menu">
                  {(deviceCtx.types || []).map((type) => (
                    <li key={type.id}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setValue(type.name);
                          setType(type); // 👈 store selected type
                        }}
                      >
                        {type.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={!type}
              onClick={() => type && removeType(type)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteType;
