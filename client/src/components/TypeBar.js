import React, { useState, useContext } from "react";

import { deviceContext } from "../store/DeviceProvider";

const TypeBar = () => {
  const deviceCtx = useContext(deviceContext);
  const [selected, setSelected] = useState(false);

  const handleTypeClick = (type) => {
    if (selected && deviceCtx.selectedType.id === type.id) {
      deviceCtx.setSelectedType({});
      setSelected(false);
      return;
    } else {
      deviceCtx.setSelectedType(type);
      setSelected(true);
    }
  };

  return (
    <ul className="list-group">
      {deviceCtx.types.map((type) => (
        <li
          key={type.id}
          style={{ cursor: "pointer" }}
          onClick={() => handleTypeClick(type)}
          className={`list-group-item ${
            type.id === deviceCtx.selectedType?.id ? "active" : ""
          }`}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
};

export default TypeBar;
