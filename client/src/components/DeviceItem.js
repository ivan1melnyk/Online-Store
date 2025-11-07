import React from "react";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const navigator = useNavigate();
  console.log(navigator);
  return (
    <div
      className="col-3 mb-3 mt-3"
      onClick={() => navigator(DEVICE_ROUTE + "/" + device.id)}
    >
      <div
        className="card border-light"
        style={{ width: 150, cursor: "pointer" }}
      >
        <img width={150} height={150} src={device.img} />
        <div className="text-black-50 row mt-1 d-flex justify-content-between align-items-center">
          <div className="col">Samsung..</div>
          <div className="col-auto d-flex align-items-center">
            <div>{device.rating}5</div>
            <img width={18} height={18} src={star} alt="star" />
          </div>
        </div>
        <div>{device.name}</div>
      </div>
    </div>
  );
};

export default DeviceItem;
