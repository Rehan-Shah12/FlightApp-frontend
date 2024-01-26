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
    <div className="FlightItem">
      <div className="name">{planeType}</div>
      <div className="location-wrapper">
        <div className="time-block">
          {formattedDepartureTime} - {formattedArrivalTime}
        </div>
        <div className="location-block">
          {departureCity} - {arrivalCity}
        </div>
      </div>
      <div className="flight-number">{flightNumber}</div>

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
