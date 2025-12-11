import { useContext } from "react";
import DeviceItem from "./DeviceItem";
import { authContext } from "../store/AuthProvider";

const DeviceList = () => {
  const authCtx = useContext(authContext);
  console.log(authCtx.basket);


  return (
    <div className="row d-flex">
      {(authCtx.basket || []).map((deviceItem) => (
        <DeviceItem key={deviceItem.id} device={deviceItem} />
      ))}
    </div>
  );
};

export default DeviceList;