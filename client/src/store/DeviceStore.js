import { makeAutoObservable } from "mobx"; // observable, computed, action, flow

export default class DeviceStore {
  constructor() {
    this._types = [
      { id: 1, name: "Refrigerators" },
      { id: 2, name: "Smartphones" },
      { id: 3, name: "Laptops" },
      { id: 4, name: "TVs" },
    ];
    this._brands = [
      { id: 1, name: "Samsung" },
      { id: 2, name: "Apple" },
      { id: 3, name: "Lenovo" },
      { id: 4, name: "Asus" },
    ];
    this._devices = [
      {
        id: 1,
        name: "12 pro",
        price: 100000,
        img: "c44672a4-2f95-4449-a534-03a72ceecd40.jpg",
      },
      {
        id: 2,
        name: "a51",
        price: 100000,
        img: "bf88daac-ecc5-42b2-b74f-d4a5b4cdaa57.jpg",
      },
      {
        id: 3,
        name: "A151",
        price: 100000,
        img: "b988cbd4-a8e3-4eb2-8b90-e071c0a1003f.jpg",
      },
      {
        id: 4,
        name: "note pro",
        price: 100000,
        img: "e518dafd-ad06-4606-ab3d-4c55475e1e3a.jpg",
      },
      {
        id: 5,
        name: "Atlant",
        price: 100000,
        img: "fffed206-b8e1-40d0-9e24-bc56d18b422d.jpg",
      },
    ];
    this._selectedType = {};
    this._selectedBrand = {};
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._isAuth = types;
  }
  setBrands(brands) {
    this._user = brands;
  }
  setDevices(devices) {
    this._user = devices;
  }
  setSelectedType(type) {
    console.log(type);
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    console.log(brand);
    this._selectedBrand = brand;
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
}
