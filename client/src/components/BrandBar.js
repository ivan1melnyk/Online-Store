import { deviceContext } from "../store/DeviceProvider";
import { useContext } from "react";

const BrandBar = () => {
  const deviceCtx = useContext(deviceContext);

  return (
    <div className="row d-flex">
      {deviceCtx.brands.map((brand) => (
        <div
          key={brand.id}
          style={{ cursor: "pointer" }}
          onClick={() => deviceCtx.setSelectedBrand(brand)}
          className={`col-5 col-sm-3 border p-2 rounded ${
            brand.id === deviceCtx.selectedBrand?.id
              ? "border-danger"
              : "border-light"
          }`}
        >
          {brand.name}
        </div>
      ))}
    </div>
  );
};

export default BrandBar;
