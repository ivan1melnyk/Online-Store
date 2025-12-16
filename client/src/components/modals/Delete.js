import React, { useState, useContext } from "react";
import { deviceContext } from "../../store/DeviceProvider";

const Delete = ({ show, onHide, title, options, onDelete, validation }) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(null);
  const deviceCtx = useContext(deviceContext);

  const remove = () => {
    if (!selected) {
      alert("Please select an item to delete.");
      return;
    }

    if (validation) {
      const error = validation(selected);
      if (error) {
        alert(error);
        return;
      }
    }
    if (
      title === "Delete Type" &&
      deviceCtx.devices.some((d) => d.typeId === selected.id)
    ) {
      alert("Cannot delete type. There are devices associated with this type.");
      return;
    }
    if (
      title === "Delete Brand" &&
      deviceCtx.devices.some((d) => d.brandId === selected.id)
    ) {
      alert(
        "Cannot delete brand. There are devices associated with this brand."
      );
      return;
    }
    onDelete(selected).then(() => {
      setValue("");
      setSelected(null);
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
            <h5 className="modal-title">{title}</h5>
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
                  {value || "Choose item to delete"}
                </button>
                <ul className="dropdown-menu">
                  {(options || []).map((item) => (
                    <li key={item.id}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setValue(item.name);
                          setSelected(item);
                        }}
                      >
                        {item.name}
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
              disabled={!selected}
              onClick={remove}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
