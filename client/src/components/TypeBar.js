import React, { useContext } from "react";

import { deviceContext } from "../store/DeviceProvider";

const TypeBar = () => {
  const deviceCtx = useContext(deviceContext);

  return (
    <ul className="list-group">
      {deviceCtx.types.map(
        (type) => (
          console.log(type),
          (
            <li
              key={type.id}
              style={{ cursor: "pointer" }}
              onClick={() => deviceCtx.setSelectedType(type)}
              className={`list-group-item ${
                type.id === deviceCtx.selectedType?.id ? "active" : ""
              }`}
            >
              {type.name}
            </li>
          )
        )
      )}
    </ul>
  );
};

export default TypeBar;
