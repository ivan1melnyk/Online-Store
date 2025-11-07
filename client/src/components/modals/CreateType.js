import React from "react";

const CreateType = ({ show, onHide }) => {
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
              <input className="form-control" placeholder="Add name of type" />
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
            <button type="button" className="btn btn-primary" onClick={onHide}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateType;
