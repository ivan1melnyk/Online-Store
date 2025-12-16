import React, { useEffect, useState, useContext } from "react";
import bigStar from "../assets/bigStar.png";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOneDevice, deleteDevice } from "../http/deviceAPI";
import { authContext } from "../store/AuthProvider";
import { SHOP_ROUTE } from "../utils/consts";
import CreateDevice from "../components/modals/CreateDevice";

const DevicePage = () => {
  const authCtx = useContext(authContext);
  const navigate = useNavigate();
  const [device, setDevice] = useState({ info: [] });
  const [deviceVisible, setDeviceVisible] = useState(false);
  const isInBasket = (id) => {
    return authCtx.basket.some((item) => item.id === id);
  };
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  const adminDeleteDevice = async (id) => {
    try {
      await deleteDevice(id);
      console.log("Device deleted successfully, id:", id);
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

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
            <div className="d-flex flex-column justify-content-center">
              {authCtx.isAuth ? (
                <button
                  className="btn btn-outline-dark m-1"
                  onClick={async () => {
                    authCtx.addDeviceToBasket(device);
                  }}
                >
                  Add to basket
                </button>
              ) : (
                ""
              )}
              {authCtx.isAuth && isInBasket(device.id) ? (
                <button
                  className="btn btn-outline-danger m-1"
                  onClick={async () => {
                    authCtx.removeDeviceFromBasket(device.id);
                  }}
                >
                  Remove from basket
                </button>
              ) : (
                ""
              )}

              {authCtx.isAdmin ? (
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-dark m-1"
                    onClick={() => setDeviceVisible(true)}
                  >
                    Edit Device
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={async () => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this device?"
                      );
                      if (confirmDelete) {
                        await adminDeleteDevice(device.id);
                        navigate(SHOP_ROUTE);
                      }
                    }}
                  >
                    Delete Device
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
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
      {deviceVisible && (
        <CreateDevice
          show={deviceVisible}
          onHide={() => setDeviceVisible(false)}
          isUpdate={true}
          to_edit_id={device.id}
        />
      )}
    </div>
  );
};

export default DevicePage;
