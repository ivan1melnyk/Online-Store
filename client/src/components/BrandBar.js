import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <div className="row d-flex">
      {device.brands.map((brand) => (
        <div
          key={brand.id}
          style={{ cursor: "pointer" }}
          onClick={() => device.setSelectedBrand(brand)}
          className={`col-6 col-sm-3 border p-2 rounded ${
            brand.id === device.selectedBrand?.id
              ? "border-danger"
              : "border-light"
          }`}
        >
          {brand.name}
        </div>
      ))}
    </div>
  );
});

export default BrandBar;
