import React, { useContext } from "react";
import { deviceContext } from "../store/DeviceProvider";

const Pages = () => {
  const deviceCtx = useContext(deviceContext);
  const pageCount = Math.ceil(deviceCtx.totalCount / deviceCtx.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  const handlePageClick = (page) => {
    if (page < 1) {
      console.log("Page cannot be less than 1", page);
      return deviceCtx.setPage(1);
    } else if (page > pageCount) {
      console.log("Page cannot exceed total pages", page);
      return deviceCtx.setPage(pageCount);
    } else {
      return deviceCtx.setPage(page);
    }
  };

  const handlePrevious = () => {
    if (deviceCtx.page > 1) {
      handlePageClick(deviceCtx.page - 1);
    }
  };

  const handleNext = () => {
    if (deviceCtx.page < pageCount) {
      handlePageClick(deviceCtx.page + 1);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          className={`page-item ${deviceCtx.page === 1 ? "disabled" : ""}`}
          onClick={handlePrevious}
          style={{ cursor: deviceCtx.page === 1 ? "not-allowed" : "pointer" }}
        >
          <span className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>

        {pages.map((page) => (
          <li
            className={`page-item ${deviceCtx.page === page ? "active" : ""}`}
            key={page}
            onClick={() => handlePageClick(page)}
            style={{ cursor: "pointer" }}
          >
            <span className="page-link">{page}</span>
          </li>
        ))}

        <li
          className={`page-item ${
            deviceCtx.page === pageCount ? "disabled" : ""
          }`}
          onClick={handleNext}
          style={{
            cursor: deviceCtx.page === pageCount ? "not-allowed" : "pointer",
          }}
        >
          <span className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pages;
