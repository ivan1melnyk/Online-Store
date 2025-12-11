import { useContext } from "react";
import DeviceItem from "./DeviceItem";
import { deviceContext } from "../store/DeviceProvider";

const DeviceList = () => {
  const deviceCtx = useContext(deviceContext);

  return (
    <div className="row d-flex">
      {(deviceCtx.devices || []).map((deviceItem) => (
        <DeviceItem key={deviceItem.id} device={deviceItem} />
      ))}
    </div>
  );
};

export default DeviceList;
