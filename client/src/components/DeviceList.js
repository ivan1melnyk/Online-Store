import React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <div className="row d-flex">
      {device.devices.map((deviceItem) => (
        <DeviceItem key={deviceItem.id} device={deviceItem} />
      ))}
    </div>
  );
});

export default DeviceList;
