import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlightItem from "./FlightItem";
import { getAllFlights, searchFlights } from "../store/thunks/flightThunk";

const FlightList = () => {
  const dispatch = useDispatch();
  const filteredFlights = useSelector((state) => state.flight.filteredFlight);
  const allflights = useSelector((state) => state.flight.allflights);
  const [rendered, setRendered] = useState([]);

  useEffect(() => {
    dispatch(getAllFlights());
  }, [dispatch]);

  useEffect(() => {
    const flightsToRender =
      filteredFlights?.length > 0 ? filteredFlights : allflights;

    const renderedFlights = flightsToRender?.map((flight) => (
      <FlightItem
        key={flight._id}
        departureCity={flight?.departureCity}
        arrivalCity={flight?.arrivalCity}
        flightNumber={flight?.flightNumber}
        arrivalTime={flight?.arrivalTime}
        departureTime={flight?.departureTime}
        planeType={flight?.planeType}
      />
    ));

    setRendered(renderedFlights);
  }, [filteredFlights, allflights]);

  return (
    <div>
      <h2>Select your departure flight</h2>
      {rendered}
    </div>
  );
};

export default FlightList;
