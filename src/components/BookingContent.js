import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/BookingContent.css";
import SeatItem from "./SeatItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getFlightById } from "../store/thunks/flightThunk";

const BookingContent = () => {
  const dispatch = useDispatch();
  const { id: flightId } = useParams();
  const flight = useSelector((state) => state.flight.activeFlight);
  const user = useSelector((state) => state.flight.user);

  useEffect(() => {
    if (!user) {
      const userId = localStorage.getItem("userId");

      if (userId) {
        dispatch(getUserById(userId));
      }
    }

    if (!flight && flightId) {
      dispatch(getFlightById(flightId));
    }
  }, [dispatch, user, flight, flightId]);

  const rendered = flight?.seats?.map((seat, index) => (
    <SeatItem key={`${seat._id}-${index}`} seat={seat} />
  ));

  return <div className="BookingContent">{rendered}</div>;
};

export default BookingContent;
