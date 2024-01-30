import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/BookingContent.css";
import SeatItem from "./SeatItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  getFlightById,
  createBooking,
} from "../store/thunks/flightThunk";

const formatTime = (dateString) => {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return new Date(dateString).toLocaleTimeString("en-US", options);
};

const BookingContent = () => {
  const dispatch = useDispatch();
  const { id: flightId } = useParams();
  const flight = useSelector((state) => state?.flight?.activeFlight);
  const user = useSelector((state) => state?.flight?.user);
  const formattedDepartureTime = formatTime(flight?.departureTime);
  const formattedArrivalTime = formatTime(flight?.arrivalTime);

  const allEconomyFlights = [];
  const allBusinessFlights = [];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        const userId = localStorage.getItem("userId");
        if (userId) {
          await dispatch(getUserById(userId));
        }
      }

      if (!flight && flightId) {
        await dispatch(getFlightById(flightId));
      }
    };

    fetchData();
  }, [dispatch, user, flight, flightId]);

  const handleBookingConfirmed = async (seat) => {
    await dispatch(
      createBooking(
        user._id,
        flight._id,
        seat.classes,
        seat.seatNumber,
        seat.price
      )
    );
    await dispatch(getFlightById(flightId));
  };

  console.log("Flights  Check:", flight?.seats);

  flight?.seats.map((seat) => {
    if (seat?.classes === "economy") {
      allEconomyFlights.push(seat);
    }
    if (seat?.classes === "business") {
      allBusinessFlights.push(seat);
    }
  });

  const renderedEconomicFlights = allEconomyFlights?.map((seat, index) => (
    <SeatItem
      key={`${seat._id}-${index}`}
      seat={seat}
      onBookingConfirmed={() => handleBookingConfirmed(seat)}
    />
  ));
  const renderedBusinessFlights = allBusinessFlights?.map((seat, index) => (
    <SeatItem
      key={`${seat._id}-${index}`}
      seat={seat}
      onBookingConfirmed={() => handleBookingConfirmed(seat)}
    />
  ));

  // const sortedSeats = flight?.seats ? [...flight.seats] : [];
  // console.log("Sort Test", sortedSeats);

  // sortedSeats.sort((a, b) => a.classes.localeCompare(b.classes));

  // const rendered = sortedSeats?.map((seat, index) => (
  //   <SeatItem
  //     key={`${seat._id}-${index}`}
  //     seat={seat}
  //     onBookingConfirmed={() => handleBookingConfirmed(seat)}
  //   />
  // ));

  return (
    <div className="Top">
      <div className="flight-info">
        <div className="first">
          <div>
            <h2>{flight?.planeType}</h2>
          </div>
          <div>
            <i>{flight?.flightNumber}</i>
          </div>
        </div>
        <div className="second">
          <div>
            <h3>
              {flight?.departureCity} - {flight?.arrivalCity}
            </h3>
          </div>
          <div>
            {formattedDepartureTime} - {formattedArrivalTime}{" "}
          </div>
        </div>
      </div>

      {/* <div className="BookingContent">{rendered}</div> */}
      <div>
        <div>
          <div style={{ marginLeft: "50px", marginTop: "50px" }}>
            Business Seats
          </div>
          <div className="BookingContent">{renderedBusinessFlights}</div>
        </div>
        <div>
          <div style={{ marginLeft: "50px" }}>Economy Seats</div>
          <div className="BookingContent">{renderedEconomicFlights}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingContent;
