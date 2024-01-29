
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import "../styles/SeatItem.css";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../store/thunks/flightThunk";

const SeatItem = ({ seat, onBookingConfirmed }) => {
  const [open, setOpen] = useState(false);
  const [seatStatus, setSeatStatus] = useState(seat.status);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.flight.user);
  const flight = useSelector((state) => state.flight.activeFlight);

  useEffect(() => {
    setSeatStatus(seat.status);
  }, [seat.status]);

  const showModal = () => {
    if (seat.status !== "booked") {
      setOpen(true);
    }
  };

  const handleOk = (event) => {
    event.stopPropagation();
    dispatch(
      createBooking(
        user._id,
        flight._id,
        seat.classes,
        seat.seatNumber,
        seat.price
      )
    );
    setOpen(false);

    // Call the callback function when booking is confirmed
    onBookingConfirmed();
  };

  const handleCancel = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  return (
    <div className={`SeatItem ${seatStatus === "booked" ? "booked" : ""} ${seat.classes}`}>
      <div className={`seat-box ${seatStatus === "booked" ? "booked" : ""} ${seat.classes}`} onClick={showModal}>
        {seat?.seatNumber}
      </div>

      <Modal
        open={open}
        title="Confirm Booking"
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={() => setSeatStatus(seat.status)}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          
          </>
          
        )}
      >
          <p>Price : {seat?.price}</p>
      </Modal>
    </div>
  );
};

export default SeatItem;

