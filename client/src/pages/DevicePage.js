import React from "react";
import bigStar from "../assets/bigStar.png";

const DevicePage = () => {
  const device = {
    id: 1,
    name: "12 pro",
    price: 100000,
    img: "c44672a4-2f95-4449-a534-03a72ceecd40.jpg",
  };
  const description = [
    { id: 1, title: "RAM", description: "5 Gbs" },
    { id: 2, title: "Camera", description: "12 MP" },
    { id: 3, title: "Processor", description: "Pentium 3" },
    { id: 4, title: "Number of cores", description: "2" },
    { id: 5, title: "Battery", description: "4000" },
  ];
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3 border">
          <img src={device.img} width={300} height={300} />
        </div>
        <div className="col-md-4">
          <div className="row d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}5
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card d-flex flex-column align-items-center justify-content-around p-3"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>{device.price}</h3>
            <button className="btn btn-outline-dark">Add to basket</button>
          </div>
        </div>
      </div>
      <h1>Characteristics</h1>
      <div className="row d-flex flex-column mt-3">
        {description.map((info, index) => (
          <div
            classnmae="row"
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            <div className="row">
              <div className="col-6 col-sm-2">{info.title}:</div>{" "}
              <div className="col-6 col-sm-2">{info.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicePage;
