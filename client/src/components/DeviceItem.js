import React from "react";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device, onRemove }) => {
  const navigator = useNavigate();

  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent navigation to device page
    onRemove(device.id);
  };

  return (
    <div
      className="col-3 mb-3 mt-3"
      onClick={() => navigator(DEVICE_ROUTE + "/" + device.id)}
    >
      <div
        className="card border-light p-2"
        style={{ width: 150, cursor: "pointer" }}
      >
        <img
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className="text-black-50 row mt-1 d-flex justify-content-between align-items-center">
          <div className="col">Samsung..</div>
          <div className="col-auto d-flex align-items-center">
            <div>{device.rating}</div>
            <img width={18} height={18} src={star} alt="star" />
          </div>
        </div>
        <div>{device.name}</div>
        {onRemove && (
          <button
            className="btn btn-outline-danger btn-sm mt-2"
            onClick={handleRemove}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default DeviceItem;
