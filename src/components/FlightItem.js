import React from "react";
import "../styles/FlightItem.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFlight } from "../store/slices/flightSlice";

const formatTime = (dateString) => {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return new Date(dateString).toLocaleTimeString("en-US", options);
};

const FlightItem = ({
  departureCity,
  arrivalCity,
  flightNumber,
  arrivalTime,
  departureTime,
  planeType,
  flight,
  viewMode,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formattedDepartureTime = formatTime(departureTime);
  const formattedArrivalTime = formatTime(arrivalTime);

  const handleBookButton = () => {
    dispatch(setActiveFlight(flight));
    navigate(`/booking/${flight._id}`);
  };

  return (
    <div className={`FlightItem ${viewMode === 'grid' ? 'grid' : ''}`}>
      <div className={`name ${viewMode === 'grid' ? 'name-grid' : ''}`}>{planeType}</div>
      <div className={`location-wrapper ${viewMode === 'grid' ? 'location-wrapper-grid' : ''}`}>
        <div className={`time-block ${viewMode === 'grid' ? 'time-block-grid' : ''}`}>
          {formattedDepartureTime} - {formattedArrivalTime}
        </div>
        <div className={`location-block ${viewMode === 'grid' ? 'location-block-grid' : ''}`}>
          {departureCity} - {arrivalCity}
        </div>
      </div>
      {
  viewMode === 'list' && (
    <div className={`flight-number ${viewMode === 'grid' ? 'flight-number-grid' : ''}`}>
      {flightNumber}
    </div>
  )
}
      

      <div className="book-block">
        <Button
          type="primary"
          shape="round"
          size={"large"}
          onClick={handleBookButton}
        >
          Book Now!
        </Button>
      </div>
    </div>
  );
};

export default FlightItem;
