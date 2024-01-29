

import React, { useEffect, useState } from "react";
import "../styles/FlightList.css";
import { useDispatch, useSelector } from "react-redux";
import FlightItem from "./FlightItem";
import { getAllFlights } from "../store/thunks/flightThunk";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { FaListAlt, FaRegListAlt  } from "react-icons/fa";
import { BsFillGridFill, BsGrid  } from "react-icons/bs";
import { setPageSize, setPageNo } from "../store/slices/flightSlice";

const FlightList = () => {
  const dispatch = useDispatch();
  const allflights = useSelector((state) => state.flight.allflights);
  const filteredFlights = useSelector((state) => state.flight.filteredFlight);
  const [rendered, setRendered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [viewMode, setViewMode] = useState("list");
  const pageSize = 3;

  useEffect(() => {
    dispatch(getAllFlights(currentPage, pageSize)).then((response) => {
      setTotalPages(response?.totalPages);
    });
    dispatch(setPageSize(pageSize));
    dispatch(setPageNo(currentPage));
  }, [dispatch, currentPage, pageSize]);

  const flightsToRender =
    filteredFlights?.length > 0 ? filteredFlights : allflights;

  useEffect(() => {
    const renderedFlights = flightsToRender?.map((flight) => (
      <FlightItem
        key={flight._id}
        departureCity={flight?.departureCity}
        arrivalCity={flight?.arrivalCity}
        flightNumber={flight?.flightNumber}
        arrivalTime={flight?.arrivalTime}
        departureTime={flight?.departureTime}
        planeType={flight?.planeType}
        flight={flight}
        viewMode={viewMode}
      />
    ));

    setRendered(renderedFlights);
  }, [allflights, viewMode, flightsToRender]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleViewMode = (mode) => {
    setViewMode(mode);
    console.log("Mode: ", mode);
  };

  return (
    <div>
      <div className="top">
        <div className="toggle-view">
            {viewMode === 'list' ? (
              <div><FaListAlt size={25} color={'white'} onClick={() => handleViewMode("list")} />
              <BsGrid size={25} onClick={() => handleViewMode("grid")} /></div>
              
            ) : (
              <div><FaRegListAlt size={25}  onClick={() => handleViewMode("list")} />
              <BsFillGridFill size={25}  color={'white'} onClick={() => handleViewMode("grid")} /></div>
              
            )}
        </div>
        <div className="icons">
          <LeftCircleOutlined
            onClick={() => handlePageChange(currentPage - 1)}
          />
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <RightCircleOutlined
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </div>
      </div>

      {rendered?.length > 0 ? (
        <div>
          <h2 className="headings">Select your departure flight</h2>
          <div className={`rendered-wrapper ${viewMode === 'grid' ? 'grid-mode' : ''}`}>{rendered}</div>
        </div>
      ) : (
        <h2 className="headings">No Upcoming Flights Scheduled :(</h2>
      )}
    </div>
  );
};

export default FlightList;

