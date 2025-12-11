import React from "react";
import { useState } from "react";
import { createBrand } from "../../http/deviceAPI";

const CreateBrand = ({ show, onHide }) => {
    const [value, setValue] = useState("");
    const addBrand= () => {
      createBrand({ name: value }).then((data) => {
        setValue("");
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
            <h5 className="modal-title">Add new Brand</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onHide}
            ></button>
          </div>

          <div className="modal-body">
          <form>
              <input
                className="form-control"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add name of brand"
              />  
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={addBrand}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
