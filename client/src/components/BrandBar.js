import { deviceContext } from "../store/DeviceProvider";
import { useContext, useState } from "react";

const BrandBar = () => {
  const deviceCtx = useContext(deviceContext);
  const [selected, setSelected] = useState(false);

  const handleBrandClick = (brand) => {
    if (selected && deviceCtx.selectedBrand?.id === brand.id) {
      deviceCtx.setSelectedBrand({});
      setSelected(false);
      return;
    } else {
      deviceCtx.setSelectedBrand(brand);
      setSelected(true);
    }
  };

  return (
    <div className="row d-flex">
      {deviceCtx.brands.map((brand) => (
        <div
          key={brand.id}
          style={{ cursor: "pointer" }}
          onClick={() => handleBrandClick(brand)}
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
