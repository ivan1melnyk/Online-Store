import { useState, createContext, useEffect } from "react";

export const deviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [data, setData] = useState({ isAuth: false, user: null });
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedType, setSelectedType] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [selectedType, selectedBrand]);

  const handleSetSelectedType = (type) => {
    setPage(1);
    setSelectedType(type);
  };

  const handleSetSelectedBrand = (brand) => {
    setPage(1);
    setSelectedBrand(brand);
  };

  return (
    <deviceContext.Provider
      value={{
        data,
        setData,

        types,
        setTypes,

        brands,
        setBrands,

        devices,
        setDevices,

        selectedType,
        setSelectedType: handleSetSelectedType, // Use the wrapper function

        selectedBrand,
        setSelectedBrand: handleSetSelectedBrand, // Use the wrapper function

        page,
        setPage,

        limit,
        setLimit,

        totalCount,
        setTotalCount,
      }}
    >
      {children}
    </deviceContext.Provider>
  );
};
