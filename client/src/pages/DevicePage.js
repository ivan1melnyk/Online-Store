import React, { useEffect, useState, useContext } from "react";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { authContext } from "../store/AuthProvider";


const DevicePage = () => {
  const authCtx = useContext(authContext);
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3 border">
          <img
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </div>
        <div className="col-md-4">
          <div className="row d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card d-flex flex-column align-items-center justify-content-around p-3"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>{device.price}</h3>
            <button className="btn btn-outline-dark"
            onClick={async () => {
              authCtx.addDeviceToBasket(device)
            }}
            >Add to basket</button>
          </div>
        </div>
      </div>
      <h1>Characteristics</h1>
      <div className="row d-flex flex-column mt-3">
        {device.info.map((info, index) => (
          <div
            classnmae="row"
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            <div className="row">
              <div className="col-6 col-sm-2">{info.title}:</div>{" "}
              <div className="col-6 col-sm-2">{info.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicePage;
